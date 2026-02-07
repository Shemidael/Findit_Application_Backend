import dotenv from "dotenv";
import Server from "./models/server.js";

dotenv.config();

const server = new Server( process.env.PORT || 5000, process.env.DATABASE_URI );

server.start();