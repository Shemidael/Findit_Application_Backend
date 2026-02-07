import { Logs_palette } from "../../palette/index.js";

export default function gwLogger(request, response, next) {

    console.log('\n');

    console.log(`${ Logs_palette.caption('[_server]') } Incoming request from : ${ Logs_palette.link(request?.url) }.`);
    console.log(`${ Logs_palette.caption('[_server]') } Incoming request time : ${ Logs_palette.link(new Date().toLocaleTimeString()) }.`);
    console.log(`${ Logs_palette.caption('[_server]') } Incoming request body : ${ Logs_palette.link(request?.body? JSON.stringify(request.body) : 'None') }.`);

    next();
};
