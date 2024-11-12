import { Router } from 'express';
import * as UsersController from './users.controller';

const router = Router();
router.
    route('/users').
    get(UsersController.readUsers);

    router.
    route('/users').
    post(UsersController.createUser);

    router.
    route('/users').
    put(UsersController.updateUser);

    router.
    route('/users/:id').
    delete(UsersController.deleteUser);

    router
    .route('/login')
    .post(UsersController.loginUser)
    
    export default router;