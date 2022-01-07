import { format, transports } from "winston";
const { timestamp, combine, errors, printf } = format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level},${timestamp},${stack || message}`;
});

export default {
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [ 
        new transports.Console(),
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.File({ filename: "logs/combined.log" }),
    ],
};