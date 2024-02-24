import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import User from "../models/User";
import Cart from "../models/Cart";
import { ReqType, ResType } from "../utils/types";

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user with a name, email, and password. Returns user data and a 201 status code on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 format: email
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid request (missing parameters or user already exists)
 *       500:
 *         description: Server error
 */
export async function UserRegister(req: ReqType, res: ResType) {
  const { name, email, password } = req.body as any;
  if (!name) {
    return res.status(400).json({ message: "No name found" });
  }

  if (!email) {
    return res.status(400).json({ message: "No email found" });
  }

  if (!password) {
    return res.status(400).json({ message: "No password found" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!created) {
      return res.status(400).json({ message: "User already exists" });
    }

    await Cart.create({ userId: user.dataValues.id });
    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user
 *     description: Logs in a user by email and password. Returns a token and user data on success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 format: email
 *               password:
 *                 type: string
 *                 description: Password for the user account
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid login credentials
 *       500:
 *         description: Server error
 */
export async function UserLogin(req: ReqType, res: ResType) {
  const { email, password } = req.body as any;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (passwordMatched) {
      const ourUser = {
        id: user.dataValues.id,
        name: user.dataValues.name,
        email: user.dataValues.email,
      };
      const token = jwt.sign(ourUser.id, process.env.JWT_SECRET || "");
      res.cookie("token", token);
      res.setHeader("token", token);

      return res.status(200).json({
        message: "Login successful",
        user: ourUser,
      });
    }

    return res.status(400).json({ message: "Password mismatched" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logs out the current user
 *     description: Clears the user's session cookie, effectively logging them out.
 *     responses:
 *       200:
 *         description: Logout successful
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
export async function UserLogout(req: ReqType, res: ResType) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
