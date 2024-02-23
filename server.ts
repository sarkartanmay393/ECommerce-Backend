import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./utils/database";
import { UserLogin, UserLogout, UserRegister } from "./routes/Auth";
import {
  GetAllCatergories,
  GetAllProductByCategory,
  GetProductById,
  PublicPing,
} from "./routes/Public";
import {
  AddCartItem,
  GetOrderDetailsById,
  GetOrderHistory,
  PlaceNewOrder,
  RemoveCartItem,
  UpdateCartItemQuantities,
  ViewChart,
} from "./routes/Private";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Public Routes
app.get("/", PublicPing);
// (Authentication)
app.post("/login", UserLogin);
app.get("/logout", UserLogout);
app.post("/register", UserRegister);
// (Categories)
app.get("/categories", GetAllCatergories);
app.get("/categories/:categoryId", GetAllProductByCategory);
// (Products)
app.get("/products/:productId", GetProductById);

// Private Routes
import AuthMiddleware from "./middlewares/auth";
app.use(AuthMiddleware);
// (Orders)
app.post("/orders", PlaceNewOrder);
app.get("/orders", GetOrderHistory);
app.get("/orders/:orderId", GetOrderDetailsById);
// (User Cart (Each user got one cart only))
app.get("/cart", ViewChart);
app.post("/cart", AddCartItem); // one at a time product
app.delete("/cart", RemoveCartItem); // body got cartItem id
app.put("/cart", UpdateCartItemQuantities); //body

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  console.log(`Server is running on port ${PORT}`);
});
