import { ReqType, ResType } from "../utils/types";
import Category from "../models/Category";
import Product from "../models/Product";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieves all categories
 *     description: Fetches a list of all categories along with a count of how many categories there are.
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of categories returned
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Retrieves all products for a specific category
 *     description: Fetches a list of products and the count of products within a specified category ID.
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category to retrieve products for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of products for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of products returned
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid category ID provided
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Retrieves a product by its ID
 *     description: Fetches detailed information about a product using its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detailed information about the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID provided or no product found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Server heartbeat endpoint
 *     description: Simple endpoint to check if the server is running.
 *     responses:
 *       200:
 *         description: Server is running message
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
export async function PublicPing(_: ReqType, res: ResType) {
  return res.json("Server is running fine");
}
