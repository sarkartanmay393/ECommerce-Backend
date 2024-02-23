import { Op } from "sequelize";
import { ReqType, ResType } from "../../utils/types";
import Order from "../../models/Order";
import Product from "../../models/Product";
import CartItem from "../../models/CartItem";
import Cart from "../../models/Cart";

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
