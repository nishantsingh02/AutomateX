import jwt, { type JwtHeader } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const authMiddleware = (req:Request, res: Response , next: NextFunction) => {
    try {
        // const authHeader = req.headers.authorization;
        const authHeader = req.headers["authorization"] as string

        if(!authHeader) {
            return res.status(401).json({
                message : "Authorization header missing"
            })
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
           return res.status(401).json({
                message : "Token Missing"
            })
        }

        // this return us the userId
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECERTE as string
        ) as { userId: string }

        console.log(decoded)


        // set the user to request
        req.userId = decoded.userId

        next();
        
    } catch (err) {
        return res.status(402).json({
            message: "Invalid or expired token"
        })
    }
}



// import jwt, { type JwtHeader } from "jsonwebtoken";
// import type { NextFunction, Request, Response } from "express";

// const JWT_SECERTE= process.env.JWT_SECERTE

// export function authMiddleware(req: Request, res: Response, next: NextFunction) {
//     const header = req.headers["authorization"] as string
    
//     try {
//         const response = jwt.verify(header, JWT_SECERTE!) as string
//         response.id
//     } catch (err) {
//         res.status(404).json({
//             message: "You are not loggedin"
//         })
//     }
// }
