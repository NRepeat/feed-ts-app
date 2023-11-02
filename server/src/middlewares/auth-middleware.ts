import { TokenService } from "../service/tokenService";

const ApiErrors = require('../error/api-error');

module.exports = async function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiErrors.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
    
        if (!accessToken ) {
            return next(ApiErrors.UnauthorizedError());
        }

        const userData = await TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiErrors.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiErrors.UnauthorizedError());
    }
};