import express, { NextFunction, Request, Response } from 'express';
import fs from "fs";
import fsAsync from "fs/promises";
const app = express();

app.get("/", (req, res) => {
  res.send("home");
})

app.get("/file1", (req: Request, res: Response) => {  
  try {
    const data = fs.readFileSync("/file1.txt");
    res.send(data);
  } catch(error) {
    res.status(404).send("not found");
  }
})

app.get("/file2", (req,res) => {
  fsAsync.readFile("./file2.txt")
  .then((data) => {
    res.send(data)
  })
  .catch((error) => {
    res.status(404);
  })
})

app.get("file3",async (req, res) => {
  try {
    const data = await fsAsync.readFile("/file2.txt");
  res.send(data)
  } catch(error) {
    res.status(404);
  }
})

app.use((error: Error,req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({message: "서버 에러"})
})

app.listen(3000, () => {
    console.log('http server listen on :3000');
});