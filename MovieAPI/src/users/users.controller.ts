import { Request, RequestHandler, Response } from "express";
import { User } from './users.model';
import * as UserDao from './users.dao';
import { OkPacket } from 'mysql';

export const readUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        let users;
        req.url
        let UserId = parseInt(req.query.UserId as string);

        console.log('UserId', UserId);
        if (Number.isNaN(UserId)) {
            users = await UserDao.readUsers();
        } else {
            users = await UserDao.readUsersByUserId(UserId);
        }


        res.status(200).json(
            users
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error]', error);
        res.status(500).json({
            message: 'There was an error when fetching users'
        });
    }
};


export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await UserDao.createUser(req.body);

        console.log('req.body', req.body);

        console.log('user', okPacket);


        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error]', error);
        res.status(500).json({
            message: 'There was an error when writing users'
        });
    }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log('Controller start')
        const okPacket: OkPacket = await UserDao.updateUser(req.body);

        console.log('req.body', req.body);

        console.log('user', okPacket);

        res.status(200).json(
            okPacket
        );
    } catch (error) {
        console.error('[users.controller][readUsers][Error]', error);
        res.status(500).json({
            message: 'There was an error when updating users'
        });
    }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        let userId = parseInt(req.params.id as string);

        console.log('userId', userId);
        if (!Number.isNaN(userId)) {
            const response = await UserDao.deleteUser(userId);

            res.status(200).json(response);
        } else {
            throw new Error("Integer expected for UserId");
        }
    } catch (error) {
        console.error('[users.controller][deleteUser][Error]', error);
        res.status(500).json({
            message: 'There was an error when deleting the user'
        });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
  
      // Check if username and password are provided
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      // Fetch user by username from the database
      const users = await UserDao.readUsersByUsername(username);
      console.log('Users fetched:', users);  // Log the users to see what you're getting back
  
      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const user = users[0];
  
      // If the password is correct (this assumes plain-text comparison)
      if (user.Password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Success, login is successful
      // Send the full user object (or a subset of it) in the response
      res.status(200).json({
        message: 'Login successful',
        user: {
          userId: user.UserId,
          username: user.UserName,
          email: user.Email,  // You can include other fields as needed
        }
      });
    } catch (error) {
      console.error('[loginUser][Error]', error);
      res.status(500).json({ message: 'Error during login' });
    }
};
