import { Request, Response } from "express";


const getMe = (_: Request, res: Response) => {
    res.send("Holas");
};

const meController = {
    getMe,
};

export {
    meController
};



