import mongoose from "mongoose";

import { Logs_palette } from "../palette/index.js";


async function connectDatabase(connectionURI) {

    try {

        await mongoose.connect(connectionURI);

        console.log(`${ Logs_palette.caption("[_server]") } Connected to mongodb database at ${ Logs_palette.link(connectionURI) }.`);

    } catch (error) {

        console.log(`${ Logs_palette.caption("[_server]") } Connection to mongodb database failed | ${ Logs_palette.error(error) }`);
    }
};

export default connectDatabase;