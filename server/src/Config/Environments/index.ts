require("dotenv").config();
const { NODE_ENV } = process.env;

export const Environments = {
    __ISPROD__: NODE_ENV === "production",
    PORT: +(process.env.PORT as string) || 4000
};

