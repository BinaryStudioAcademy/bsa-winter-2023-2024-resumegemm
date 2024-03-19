import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(10); // Generate a salt for password hashing

const usersSeed = [
    {
        email: 'demo@demo.com',
        password_hash: hashSync('demo', salt),
        password_salt: salt,
        stripe_id: 'cus_J 2 3 4 5 6 7 8 9 0',
    },
    {
        email: 'gbottoms1@arizona.edu',
        password_hash: hashSync('pxlxvUyyUjE', salt),
        password_salt: salt,
        stripe_id: 'cus_F 2 3 4 5 6 7 8 9 0',
    },
    {
        email: 'lateno@aconutu.edu',
        password_hash: hashSync('msixvUyyUjE', salt),
        password_salt: salt,
        stripe_id: 'cus_H 2 3 4 5 6 7 8 9 0',
    },
    {
        email: 'uedottu@gmail.com',
        password_hash: hashSync('oxiqvUyyUjE', salt),
        password_salt: salt,
        stripe_id: 'cus_D 2 3 4 5 6 7 8 9 0',
    },
];

export { usersSeed };
