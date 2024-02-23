import { ReqType, ResType } from "../../utils/types";
import Cart from "../../models/Cart";
import CartItem from "../../models/CartItem";

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
