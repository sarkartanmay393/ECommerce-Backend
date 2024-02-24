import { Op } from "sequelize";
import { ReqType, ResType } from "../../utils/types";
import Order from "../../models/Order";
import Product from "../../models/Product";
import CartItem from "../../models/CartItem";
import Cart from "../../models/Cart";

/**
 * @swagger
 * /orders/history:
 *   get:
 *     summary: Retrieves the order history for a user
 *     description: Fetches all past orders placed by the user based on the user's ID passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the order history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
export async function GetOrderHistory(req: ReqType, res: ResType) {
  const { userId } = req.headers;

  try {
    const orders = await Order.findAll({ where: { userId: userId } });
    return res.status(200).json({
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Retrieves details of a specific order
 *     description: Fetches details of a specific order based on the order ID passed as a path parameter and the user's ID passed through headers.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */
export async function GetOrderDetailsById(req: ReqType, res: ResType) {
  const { orderId } = req.params;
  const { userId } = req.headers;

  try {
    const order = await Order.findOne({
      where: { userId: userId, id: orderId },
    });
    return res.status(200).json({
      order: order,
    });
  } catch (error) {
    return res.status(500).send();
  }
}

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Places a new order for the user
 *     description: Creates a new order with the items in the user's cart, calculates the total amount, clears the cart, and returns the new order details. The user's ID is passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: New order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: No cart items found to place an order
 *       500:
 *         description: Server error
 */
export async function PlaceNewOrder(req: ReqType, res: ResType) {
  const { userId } = req.headers;

  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    const cartItems = await CartItem.findAll({
      where: { cartId: cart?.dataValues.id },
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "No cart item found!" });
    }

    const productIds = cartItems.map((c) => c.dataValues.productId);
    const productWithQuantity = cartItems.map((c) => ({
      productId: c.dataValues.productId,
      quantity: c.dataValues.quantity,
      price: 0,
    }));
    const cartItemIds = cartItems.map((c) => c.dataValues.id);

    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
    });

    let totalAmount = 0;

    products.forEach((p) => {
      const pq = productWithQuantity.find(
        (pq) => pq.productId === p.dataValues.id
      );
      totalAmount += Number(p.dataValues.price) * pq?.quantity;
    });

    const newOrder = await Order.create({
      status: "placed",
      totalAmount: Number(totalAmount),
      userId: userId,
      details: JSON.stringify(products),
    });

    await CartItem.destroy({ where: { id: { [Op.in]: cartItemIds } } });
    return res.status(200).json({
      message: "New order created!",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).send();
  }
}
