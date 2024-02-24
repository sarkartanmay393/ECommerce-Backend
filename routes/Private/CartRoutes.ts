import { ReqType, ResType } from "../../utils/types";
import Cart from "../../models/Cart";
import CartItem from "../../models/CartItem";

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: View the user's cart
 *     description: Retrieves the current user's cart and all items within it based on the user's ID passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart is being viewed
 *     responses:
 *       200:
 *         description: A successful response containing the cart and its items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 cartItems:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Server error
 */
export async function ViewChart(req: ReqType, res: ResType) {
  const { userId } = req.headers;
  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    const cartItems = await CartItem.findAll({
      where: { cartId: cart?.dataValues.id },
    });
    return res.status(200).json({ cart: cart, cartItems: cartItems });
  } catch (error) {
    return res.status(500).send();
  }
}

/**
 * @swagger
 * /cart/item:
 *   post:
 *     summary: Adds a new item to the user's cart
 *     description: Adds a new cart item for the user based on the product ID and quantity provided in the request body, and the user's ID passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: The ID of the product to add to the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add
 *     responses:
 *       200:
 *         description: New cart item successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cartItem:
 *                   $ref: '#/components/schemas/CartItem'
 *       500:
 *         description: Server error
 */
export async function AddCartItem(req: ReqType, res: ResType) {
  const { userId } = req.headers;
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    const newCartItem = await CartItem.create({
      cartId: cart?.dataValues.id,
      productId: productId,
      quantity: quantity,
    });
    return res
      .status(200)
      .json({ message: "New cartitem created!", cartItem: newCartItem });
  } catch (error) {
    return res.status(500).send();
  }
}

/**
 * @swagger
 * /cart/item:
 *   delete:
 *     summary: Removes an item from the user's cart
 *     description: Deletes a specific cart item based on the cart item ID provided in the request body and the user's ID passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItemId:
 *                 type: integer
 *                 description: The ID of the cart item to remove
 *     responses:
 *       200:
 *         description: Cart item successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
export async function RemoveCartItem(req: ReqType, res: ResType) {
  const { userId } = req.headers;
  const { cartItemId } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    await CartItem.destroy({
      where: { cartId: cart?.dataValues.id, id: cartItemId },
    });
    return res
      .status(200)
      .json({ message: `Cart item ${cartItemId} deleted!` });
  } catch (error) {
    return res.status(500).send();
  }
}

/**
 * @swagger
 * /cart/item/quantity:
 *   put:
 *     summary: Updates the quantity of a cart item
 *     description: Updates the quantity of a specific cart item for the user based on the cart item ID and new quantity provided in the request body, and the user's ID passed through headers.
 *     parameters:
 *       - in: header
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItemId:
 *                 type: integer
 *                 description: The ID of the cart item to update
 *               quantity:
 *                 type: integer
 *                 description: The new quantity for the cart item
 *     responses:
 *       200:
 *         description: Cart item quantity successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: No cart item found with the provided ID
 *       500:
 *         description: Server error
 */
export async function UpdateCartItemQuantities(req: ReqType, res: ResType) {
  const { userId } = req.headers;
  const { quantity, cartItemId } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId: userId } });
    const a = await CartItem.update(
      { quantity: quantity },
      { where: { cartId: cart?.dataValues.id, id: cartItemId } }
    );
    if (a[0] === 0) {
      return res.status(400).json({ message: "No cartitem found" });
    }
    return res
      .status(200)
      .json({ message: `Cart item ${cartItemId} is now ${quantity} pieces.` });
  } catch (error) {
    return res.status(500).send();
  }
}
