import express, { } from "express";
import proxy from "express-http-proxy";
import { rateLimitAndTimeout } from "./src/middleware/rateLimitedAndTimeout";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// @ts-ignore
app.use(rateLimitAndTimeout);



const auth = proxy("http://localhost:8081");
const notifications = proxy("http://localhost:8085");
const messages = proxy("http://localhost:8083", {
    proxyErrorHandler: (_err, res, _next) => {
        return res.status(503).json({ messages: 'Service aren´t available' })
    }
});

const words = proxy("http://localhost:8090");

app.use("/api/auth", auth);
app.use("/api/messages", messages);
app.use("/api/notifications", notifications);
app.use("/api/word", words)


app.disable("x-powered-by")
const server = app.listen(8080, () => {
    console.log("Gateway is Listening to Port 8080");
});




const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.info("Server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
