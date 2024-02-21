import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(10); // Generate a salt for password hashing

const usersSeed = [
    {
        username: 'demo',
        email: 'demo@demo.com',
        password_hash: hashSync('demo', salt),
        password_salt: salt,
    },
    {
        username: 'john',
        email: 'gbottoms1@arizona.edu',
        password_hash: hashSync('pxlxvUyyUjE', salt),
        password_salt: salt,
    },
    {
        username: 'dean',
        email: 'lateno@aconutu.edu',
        password_hash: hashSync('msixvUyyUjE', salt),
        password_salt: salt,
    },
    {
        username: 'greg',
        email: 'uedottu@gmail.com',
        password_hash: hashSync('oxiqvUyyUjE', salt),
        password_salt: salt,
    },
];

export { usersSeed };
