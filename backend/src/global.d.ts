import { type User } from '~/packages/user/user.js';

declare module 'fastify' {
    interface FastifyRequest {
        user?: User;
    }
}

declare module 'pug';
declare module 'dotenv';
declare module 'guid-typescript';
declare module 'nodemailer';
