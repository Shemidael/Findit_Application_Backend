import express from "express";

import { Logs_palette } from "../palette/index.js";

import connectDatabase from "../configurations/database.js";

import { ConfigureCloudinary } from "../configurations/cloudinary.js"

// Importing inbuilt middlewares :

import cors         from "cors";
import helmet       from "helmet";
import bodyParser   from "body-parser";
import cookieParser from "cookie-parser";

// Importing custom middlewares:

import gwLogger from "../middlewares/@gwLogger/index.js";

// Importing custom endpoints :

import FEEDS_ROUTES from "../routes/feeds.route.js";
import AUTHETICATION_ROUTES from "../routes/authentication.route.js";

// Definition of the server class :

class Server {

    constructor (port, databaseURI) {

        this.Port   = port;
        this.DB_URI = databaseURI;

        this.Application = express();
        this.MiddleWares = [ AUTHETICATION_ROUTES, FEEDS_ROUTES ]; 
    }

    start () {

        this.Application.use(cors());
        this.Application.use(helmet());
        this.Application.use(cookieParser());
        this.Application.use(bodyParser.json());

        /* 
            - This is a Logger middleware by Gw technologies.
            - Uncomment it for debuging purposes
            - It provides preliminary information about an incomming request.
        */

        this.Application.use(gwLogger); 

        this.MiddleWares.forEach((middleware) => { 
            
            this.Application.use("/api", middleware); 
        });

        this.Application.listen(this.Port, () => {

            console.log(`\n${ Logs_palette.caption("[_server]") } Server started at port ${ Logs_palette.warning(this.Port).toString() }, live at ${ Logs_palette.link(`http://localhost:${ this.Port }`) }.`);

            connectDatabase(this.DB_URI);
            
            ConfigureCloudinary();
        });
    }
};

export default Server;