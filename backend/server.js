import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { database } from "./utils/database.js";
import AuthRoute from "./routes/authRoute.js";
import UserRoute from "./routes/userRoute.js";
import ProductRoute from "./routes/productRoute.js";
import CartRoute from "./routes/cartRoute.js";
import favRoute from "./routes/favRoute.js";
import addressRoute from "./routes/userAddressRoute.js";
import profileRoute from "./routes/userProfileRoute.js";
import { tokenDecode } from "./utils/tokenDecode.js";

const app = express();

app.use(express.json());
app.use(cors());

// Attach io to the app so routes can use it

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.use("/cart", CartRoute);
app.use("/fav", favRoute);
app.use("/address", addressRoute);
app.use("/profile", profileRoute);

const start = async () => {
  try {
    await database();
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server is listening...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
