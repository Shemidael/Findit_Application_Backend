import { Router } from "express";

import AUTHENTICATION_ENDPOINTS from "../controllers/authentication.controller.js";

const AUTHETICATION_ROUTES = Router();

AUTHETICATION_ROUTES

    .post ('/signup', AUTHENTICATION_ENDPOINTS.SIGNUP)
    .post ('/login' , AUTHENTICATION_ENDPOINTS.LOGIN)
    .post ('/refreshToken', AUTHENTICATION_ENDPOINTS.REFRESH_TOKEN);

export default AUTHETICATION_ROUTES;