import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(10); // Generate a salt for password hashing

const usersSeed = [
    {
        email: 'demo@demo.com',
        password_hash: hashSync('demo', salt),
        password_salt: salt,
    },
    {
        email: 'gbottoms1@arizona.edu',
        password_hash: hashSync('pxlxvUyyUjE', salt),
        password_salt: salt,
    },
    {
        email: 'lateno@aconutu.edu',
        password_hash: hashSync('msixvUyyUjE', salt),
        password_salt: salt,
    },
    {
        email: 'uedottu@gmail.com',
        password_hash: hashSync('oxiqvUyyUjE', salt),
        password_salt: salt,
    },
];

export { usersSeed };
