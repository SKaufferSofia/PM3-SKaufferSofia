import express from "express";
import router from "./router/indexRouter";
import multer from "multer";
import path from "path";
const server = express();
const cors = require("cors");
const morgan = require("morgan");

// Configurar Multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());

server.use("/uploads", express.static(path.join(__dirname, "../uploads")));

server.use(router);

export default server;
