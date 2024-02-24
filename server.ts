import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJSDoc, { Options, type SwaggerDefinition } from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
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

// Swagger JSDoc
const definations: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-Commerce Express API",
    version: "1.0.0",
    contact: {
      name: "Tanmay Sarkar",
      url: "https://tanmaysarkar.vercel.app",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};
const options: Options = {
  apis: ["./routes/*.ts", "./routes/**/*.ts"],
  swaggerDefinition: definations,
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/docs", serve, setup(swaggerSpec));

// Public Routes
app.get("/ping", PublicPing);
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
// (Orders)
app.post("/orders", AuthMiddleware, PlaceNewOrder);
app.get("/orders", AuthMiddleware, GetOrderHistory);
app.get("/orders/:orderId", AuthMiddleware, GetOrderDetailsById);
// (User Cart (Each user got one cart only))
app.get("/cart", AuthMiddleware, ViewChart);
app.post("/cart", AuthMiddleware, AddCartItem); // one at a time product
app.delete("/cart", AuthMiddleware, RemoveCartItem); // body got cartItem id
app.put("/cart", AuthMiddleware, UpdateCartItemQuantities); //body

app.listen(PORT, async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  console.log(`Server is running on port ${PORT}`);
});
