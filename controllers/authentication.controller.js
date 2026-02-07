import User, {requiredFeilds} from "../models/users.model.js";

import bcryptjs from "bcryptjs";

import isValidEmail from "../utilities/validateEmail.js";

import validateRequestBody from "../utilities/validateRequestBody.js";

import { generateAccessToken, verifyAccessToken } from "../jwt/index.js";

const AUTHENTICATION_ENDPOINTS = {

    SIGNUP: async function (request, response) {

        if (!request.body) {

            response.status(400).json({ message: 'Invalid authentication.' });
        }
        else {

            let requestValidation = validateRequestBody(request.body, requiredFeilds);

            if (!requestValidation.valid) {

                response.status(400).json({ message: requestValidation.message });
            }
            else {

                if (!isValidEmail(request.body.email)) {

                    response.status(400).json({ message: 'Invalid email provided !' });
                }
                else if (request.body.password.length < 6 || request.body.confirm_password.length < 6) {

                    response.status(400).json({ message: 'Passwords must be atleast 6 characters long !' });
                }
                else if (request.body.password !== request.body.confirm_password) {

                    response.status(400).json({ message: 'Password and confirm password must be equal !' });
                }
                else {

                    let existing_user = await User.findOne({ email: request.body.email });

                    if (existing_user) {

                        response.status(400).json({ message: `User '${existing_user.email}' already exist !` });
                    }
                    else {

                        try {
                        
                            let hashed_password = await bcryptjs.hash(request.body.password, 12);

                            
                            let new_user = new User({
                                
                                email: request.body.email,
                                lastname: request.body.lastname,
                                firstname: request.body.firstname,
                                password: hashed_password
                            });
                            
                            let token = generateAccessToken({ id: new_user._id });

                            await new_user.save();

                            response.status(200).json({ message: "You've been signed up successfully !", user: new_user, token: token});

                        } catch (error) {
                            
                            response.status(500).json({ message: "Unchaught Exception !", error: error });
                        }

                    }
                }
            }
        }
    },
    LOGIN: async function (request, response) {

        if (!request.body) {

            response.status(400).json({ message: "Invalid authentication." });
        }
        else if (!(request.body.email && request.body.password)) {

            response.status(400).json({ message: "The email and password are required !" });
        }
        else {

            let existing_user = await User.findOne({ email: request.body.email });

            if (!existing_user) {

                response.status(400).json({ message: `User '${request.body.email}' does not exist !` });
            }
            else {

                let password_match = await bcryptjs.compare(request.body.password, existing_user.password)

                if (!password_match) {

                    response.status(400).json({ message: "Incorrect password" });
                }
                else {

                    try {
                        
                        let token = generateAccessToken({ id: existing_user._id });

                        response.status(200).json({ message: 'You logged in successfully !', user: existing_user, token: token });

                    } catch (error) {

                         response.status(500).json({ message: 'Unchaught Exception !', error: error });
                    }
                }
            }
        }
    },
    REFRESH_TOKEN: async function (request, response) {

        if (!request.body || !request.body?.token) {

            response.status(400).json({ message: "Invalid authentication." });
        }
        else {

            try {

                let payload = verifyAccessToken(request.body.token);

                if (!payload.id) {

                    response.status(400).json({ message: 'Invalid Authentication.' });
                }
                else {

                    let existing_user = await User.findById(payload.id);

                    response.status(200).json({ message: 'You logged in sucessfully!', user: existing_user });
                }
                
            } catch (error) {
                
                response.status(500).json({ message: 'Unchaught Exception !', error, error });
            }
        }
    },
};

export default AUTHENTICATION_ENDPOINTS;