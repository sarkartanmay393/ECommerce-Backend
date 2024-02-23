import { ReqType, ResType } from "../utils/types";
import Category from "../models/Category";
import Product from "../models/Product";

export async function GetAllCatergories(_: ReqType, res: ResType) {
  try {
    const categories = await Category.findAndCountAll();
    return res.status(200).json({
      count: categories.count,
      categories: categories.rows,
    });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function GetAllProductByCategory(req: ReqType, res: ResType) {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ message: "Must be a valid category id" });
  }

  try {
    const products = await Product.findAndCountAll({
      where: { categoryId: categoryId },
    });

    return res.status(200).json({
      count: products.count,
      products: products.rows,
    });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function GetProductById(req: ReqType, res: ResType) {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Must be a valid product id" });
  }

  try {
    const product = await Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      return res.status(400).json({
        message: "No product found",
      });
    }

    return res.status(200).json({
      message: "Product found!",
      product: product,
    });
  } catch (error) {
    return res.status(500).send();
  }
}

export async function PublicPing(_: ReqType, res: ResType) {
  return res.json("Server is running fine");
}
