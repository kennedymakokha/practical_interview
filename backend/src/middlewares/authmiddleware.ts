import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler';
import { User } from './../Models/user'

const protect = expressAsyncHandler(async (req: any, res: any, next) => {
    let token;
    token = req.cookies.jwt;
    console.log("Token from web", token)
    if (token) {
        try {
            const decoded: any = jwt.verify(token, "secret")

            req.user = await User.findById(decoded.uid).select('-password')

            next()
        } catch (error) {
            return res.status(401)
            throw new Error("Unauthorized access- INVALID TOKEN")

        }
    } else {
        return res.status(401);
        throw new Error("Unauthorized access- NO TOKEN")
    }
})
const isAuth = (req: any, res: any, next: any) => {
    const authorization = req.headers["authorization"];

    if (authorization) {
        const token = authorization.split(" ")[1]
      
        jwt.verify(
            token,
            'secret',
            (err: any, decode: any) => {
                if (err) {
                    return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
                } else {
                    req.uid = decode.uid;
                    next();
                }
            }
        );
    } else {
        return res.status(401).send({ message: 'NOT AUTHORIZED !!!' });
    }
};

export { protect, isAuth }


