import jwt from "jsonwebtoken";

import { config } from "dotenv";

config();

export function generateAccessToken (payload) {
    
    let token = jwt.sign(payload, process.env.FINDIT_JWT_TOKEN_SECRET, {
        
        expiresIn: 1000*60*60*24*30
    });

    return token;
};

export function verifyAccessToken (token) {
    
    
    return jwt.verify(token, process.env.FINDIT_JWT_TOKEN_SECRET); 
};