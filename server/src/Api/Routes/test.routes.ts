import express from "express";
import { meController } from "../Controllers";

const router = express.Router();

router.get("/", meController.getMe);

export default router;