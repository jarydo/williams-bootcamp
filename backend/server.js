/**
 * server.js is the entrypoint to our Node.js application - a backend web server
 * Node.js is a JavaScript runtime allowing JavaScript to be used server-side
 */

/** 
 * Express.js is a framework, it provides useful methods for building a web backend
 * body-parser is an NPM package used to expose HTTP request bodies to the application
 * note: we're able to use ES6 style imports because we're running the application with the esm module
 *       without esm, we'd need to use require statements, e.g.
 *       const express = require("express");
 */
import express from "express";
import bodyParser from "body-parser";

import { connectDb } from "./persistence/initDb";
import restaurantRouter from "./routes/restaurant";
import reviewerRouter from "./routes/reviewers";    

/* connect to our database via our helper function */
connectDb();

/* create our Express.js application */
const app = express();

/**
 * configure middlewares, which are functions applied to every request received by the app
 * line 31 ensures that the JSON body of any request can be accessed by through req.body
 * line 32 configures requests to the /api/restaurants path to be handled by the restaurantRouter
 */
app.use(bodyParser.json());
app.use("/api/restaurants", restaurantRouter);
app.use("/api/reviewers", reviewerRouter);


/* start the server and have it listen for requests on port 5000 */
app.listen(5000, () => {
    console.info("Server is listening on port 5000");
});
