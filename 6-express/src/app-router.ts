import express, { NextFunction, Request, Response } from 'express';
import postRouter from "./router/post";
import userRouter from "./router/user";
const app = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);


app.listen(3000, () => {
    console.log('http server listen on :3000');
});