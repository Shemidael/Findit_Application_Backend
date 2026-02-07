import { Router } from "express";

import Upload from "../configurations/multer.js";

import FEED_ENDPOINTS from "../controllers/feeds.controller.js";

const FEEDS_ROUTES = Router();

FEEDS_ROUTES

    .get('/feed', FEED_ENDPOINTS.GET_FEEDS)

    .post('/userfeed', FEED_ENDPOINTS.GET_USER_FEEDS)

    .post("/feed/search/{:query}", FEED_ENDPOINTS.SEARCH_FEED)

    .post('/feed/create', Upload.single('image'), FEED_ENDPOINTS.CREATE_FEED);

export default FEEDS_ROUTES;