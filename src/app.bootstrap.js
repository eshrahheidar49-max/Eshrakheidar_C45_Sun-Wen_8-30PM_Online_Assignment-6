import { NODE_ENV, port } from "../config/config.service.js";
import sequelize, {
  checkDBconnection,
  syncDBconnection,
} from "./DB/connection.db.js";
import { userModel } from "./DB/model/user.model.js";
import postRouter from "./modules/post/post.controller.js";
import { authRouter, userRouter } from "./modules/index.js";
import express from "express";
import commentRouter from "./modules/comment/comment.controller.js";
async function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());
  //DB Connection
  await checkDBconnection();
  //DB sync
  await syncDBconnection();
  //Drop DB
  //  await sequelize.drop();

  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use("/posts", postRouter);

  app.use("/comments", commentRouter);

  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error,
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
