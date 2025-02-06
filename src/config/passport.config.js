import passport from "passport";
import jwt from "passport-jwt";
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// install and import strategy (local, google,github,etc)
// import userModel from "../models/user.model.js";

const initializePassport = () => {
    //Strategies
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: "secretinsecreton", 
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);//user o false
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["tokenCookie"];//el nombre de la cookie
    }
    return token;
};
export default initializePassport;
