import Feed from "../models/feeds.model.js";

import User from "../models/users.model.js";

import { UploadToCloudinary } from "../configurations/cloudinary.js";

const FEED_ENDPOINTS = {

    CREATE_FEED: async function (request, response) {

        if (!request.body) {
            
            response.status(400).json({ message: 'Invalid request !' });
        }
        else if (!request.body?.title || !request.body?.description) {

            response.status(400).json({ message: 'The feed must include a title and a description !' });
        }
        else if (!request.file) {

            response.status(400).json({ message: 'Please, provide an image !' });
        }
        else if (!request.body?.user_id) {

            response.status(400).json({ message: 'Unauthorized request !' });
        }
        else {

            let existing_user = await User.findById(request.body.user_id);

            if (!existing_user) {

                response.status(400).json({ message: 'Unauthorized request !' });
            }
            else {

                try {
                    
                    let image_url = await UploadToCloudinary(request.file?.path);
    
                    let new_feed = new Feed({
    
                        title: request.body.title,
                        image: image_url.secure_url,
                        description: request.body.description,

                        username: `${existing_user.firstname} ${existing_user.lastname}`,
                        useremail: existing_user.email,
                    });

                    await User.findOneAndUpdate({ _id: existing_user._id }, { feeds: [...existing_user.feeds, new_feed._id ] });
    
                    await new_feed.save();
    
                    response.status(200).json({ message: 'Feed created sucessfully !' });
    
                } catch (error) {
                    
                    response.status(500).json({ message: 'Unchaught Exception !', error: error });
                }
            }
        }
    },
    GET_FEEDS: async function (request, response) {

        await Feed.find()

            .then((results) => {

                response.status(200).json({ message: 'Feeds fetched sucessfully !', feeds: results });
            })
            .catch((error) => {

                response.status(500).json({ message: 'Unchaught Exception !', error: error });
            });
    },
    GET_USER_FEEDS: async function (request, response) {

        if (!request.body || !request.body.id) {

            response.status(400).json({ message: 'Unauthorized request !' });
        }
        else {
            
            let existing_user = await User.findById(request.body.id);

            if (!existing_user) {

                response.status(400).json({ message: 'Unauthorized request !' });
            }
            else {

                await Feed.find({ useremail: existing_user.email })

                    .then((results) => {

                        response.status(200).json({ message: 'Feeds fetched sucessfully !', feeds: results });
                    })
                    .catch((error) => {

                        response.status(500).json({ message: 'Unchaught Exception !', error: error });
                    });
            }
        }
    },
    SEARCH_FEED: async function (request, response) {
        
        if (!request.params || !request.params.query) {

            response.status(200).json({ messsage: "No query identified !", result: []});
        }
        else {

            try {

                let search_results = [];
    
                let feeds = await Feed.find();
    
                feeds.forEach(feed => {
    
                    let title = feed.title.toLowerCase();
    
                    if (title.startsWith(request.params.query.toLowerCase())) {
    
                        search_results.push(feed);
    
                    } else {
    
                        title.split(' ').forEach(token => {
    
                            if (token.startsWith(request.params.query.toLowerCase()) && !search_results.includes(feed)) {
    
                                search_results.push(feed);
                            }
                        })
                    }
                });
    
                response.status(200).json({ message: "Feeds fetched sucessfully !", result: [...search_results] });
            } 
            catch (error) {

                response.status(500).json({ message: "Unchaught Exception !", error: error });
            }
        }
    }
};

export default FEED_ENDPOINTS;