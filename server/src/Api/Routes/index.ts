
import meRoutes from "./test.routes";
import { Express } from "express";



export const configRoutes = (handler: Express) => {
    handler.use("/test", meRoutes);
    handler.use("/otraRaiz", meRoutes);
};
