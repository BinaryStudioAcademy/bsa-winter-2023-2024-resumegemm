import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(10); // Generate a salt for password hashing

const usersSeed = [
    {
        username: 'demo',
        email: 'demo@demo.com',
        password_hash: hashSync('demo', salt),
        password_salt: salt,
        recovery_code: 'RECOVERY_CODE_1',
    },
    {
        username: 'jhon',
        email: 'gbottoms1@arizona.edu',
        password_hash: hashSync('pxlxvUyyUjE', salt),
        password_salt: salt,
        recovery_code: 'RECOVERY_CODE_2',
    },
    {
        username: 'lateno',
        email: 'lateno@aconutu.edu',
        password_hash: hashSync('msixvUyyUjE', salt),
        password_salt: salt,
        recovery_code: 'RECOVERY_CODE_3',
    },
    {
        username: 'uedottu',
        email: 'uedottu@gmail.com',
        password_hash: hashSync('oxiqvUyyUjE', salt),
        password_salt: salt,
        recovery_code: 'RECOVERY_CODE_4',
    },
];

// Do not add more images than the number of users.
const userImagesSeed = [
    {
        image_source: 'https://i.imgur.com/RS2wGch.png',
    },
    {
        image_source: 'https://i.imgur.com/7V9tqy6.png',
    },
    {
        image_source: 'https://i.imgur.com/PhlZpUd.png',
    },
    {
        image_source: 'https://i.imgur.com/3KHckHc.png',
    },
];

export { userImagesSeed, usersSeed };
