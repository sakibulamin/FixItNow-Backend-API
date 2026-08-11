import bcrypt from "bcrypt";

import { IRegisterUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { TJwtPayload } from "../../interfaces/jwtPayload";
import { JwtPayload, SignOptions } from "jsonwebtoken";

const registerUser = async (payload: IRegisterUser) => {

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },

  });

  if (isUserExist) {
    throw new Error("User already exists");
  }


  const hashedPassword = await bcrypt.hash(payload.password, 10);


  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
    omit: {
      password: true
    }
  });

  return result;
};


const loginUser = async (payload: { email: string; password: string; }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
   
  });



  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Password doesn't match!");
  }

  const accessToken = jwtUtils.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions
  );


  const refreshToken = jwtUtils.createToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions
  );



  return {
    accessToken,
    refreshToken,
    user


  };
};



const getMe = async (user: TJwtPayload) => {
  const result = await prisma.user.findUnique({
    where: {
      id: user.id,

    },
    omit: {
      password: true
    }
  });

  return result;
};

const refreshToken = async (refreshToken : string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);

    if(!verifiedRefreshToken.success){
        throw new Error(verifiedRefreshToken.error)
    }

    const {id} = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where : {
            id
        }
    })

   

    const jwtPayload = {
        id,
        name : user.name,
        email : user.email,
        role : user.role
    }


    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    );

    return {accessToken}
}


export const AuthService = {
  registerUser,
  loginUser,
  getMe,
  refreshToken
};

