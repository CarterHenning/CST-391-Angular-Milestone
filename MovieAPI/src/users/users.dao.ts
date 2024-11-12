import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { User } from "./users.model";
import {userQueries } from './users.queries';
import bcrypt from 'bcrypt';

export const readUsers = async () => {
    return execute<User[]>(userQueries.readUsers, []);
};

export const readUsersByUserId = async (UserId: number) => {
    return execute<User[]>(userQueries.readUsersByUserId, [UserId]);
};

export const createUser = async (user: User) => {
    return execute<OkPacket>(userQueries.createUser,
        [user.UserName, user.Password, user.Email, user.FirstName, user.LastName, user.IsAdmin]);
};

export const updateUser = async (user: User) => {
    return execute<OkPacket>(userQueries.updateUser,
        [user.UserName, user.Password, user.Email, user.FirstName, user.LastName, user.IsAdmin, user.UserId,]);
};

export const deleteUser = async (UserId: number) => {
    return execute<OkPacket>(userQueries.deleteUser, [UserId]);
};

export const readUsersByUsername = async (username: string) => {
    return execute<User[]>(userQueries.readUsersByUserName, [username]);
  };