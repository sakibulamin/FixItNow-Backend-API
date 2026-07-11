import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

import config from "../config";
import AppError from "../errors/apperror";
import { TJwtPayload } from "../interfaces/jwtPayload";



declare global {
  namespace Express {
    interface Request {
      user: TJwtPayload;
    }
  }
}


const auth = (...requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized!"
      );
    }

    const token = authorizationHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret
    ) as TJwtPayload;

    req.user = decoded;

    if (
      requiredRoles.length &&
      !requiredRoles.includes(decoded.role)
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;