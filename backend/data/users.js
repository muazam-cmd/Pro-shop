import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Abdullah mjd',
        email: 'abdullah@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Tooba sh',
        email: 'tooba@example.com',
        password: bcrypt.hashSync('123456', 10),

    },
]

export default users