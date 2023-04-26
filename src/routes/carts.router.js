import express from "express";
import * as UsersController from "../controllers/usersController.js"

const ROUTER = express.Router();

ROUTER.post("/", UsersController.createUser);

export default ROUTER;