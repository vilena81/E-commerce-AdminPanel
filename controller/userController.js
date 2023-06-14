const { User } = require('../models');
require("dotenv").config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { regSchema, logSchema } = require('../validate/validation')
const SECRET = process.env.SECRET
const { send_mail } = require('../mailer/mailer')
const { generateAccessToken } = require('../JWT/JWT_AccessToken')


const verified = async (req, res) => {
    try {
        const token = req.query.token
        const decoded = jwt.verify(token, SECRET)
        const user = await User.findOne({ where: { email: decoded.email } });
        await user.update({ is_verified: 1 });
        // await User.update({ is_verified: 1 }, { where: { email: decoded.email } })
        res.status(200).json({ message: "Verified" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}


const user_register = async (req, res) => {
    const { userName, email, password } = req.body;

    const { error } = regSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        console.log(user, "user")
        if (user) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });
        console.log(newUser, "newUser")

        let token = generateAccessToken(email, newUser.role)
        send_mail(email, token)
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during user registration' });
    }
};


const user_login = async (req, res) => {
    try {
        const { error } = logSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })
        // console.log(user)
        if (!user) {
            return res.status(400).json({ error: "User not found" })
        }
        if (user.email === email && await bcrypt.compare(password, user.password) && user.is_verified === 1) {
            const token = generateAccessToken(email, user.role);
            console.log(token)
            return res.send(JSON.stringify({ message: "Logged in!", jwt: token, role: user.role }))
        } else {
            return res.status(400).json({ error: "Invalid password" });
        }
    }
    catch (err) {
        res.status(403).json({ error: "Login credentials are incorrect!" })
    }
}



const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll()
        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getUsersById = async (req, res) => {
    try {
        const id = req.params;
        const data = await User.findOne({ where: id, })
        res.status(201).json(data)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, email, password } = req.body;
        await User.update({ userName, email, password }, { where: { id } })
        res.status(200).json({ message: "User updated" })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        await User.update({ role }, { where: { id } })
        res.status(200).json({ message: "User role updated" })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.destroy({ where: { id } })
        res.status(200).json({ message: "User deleted" })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

module.exports = {
    verified,
    user_register,
    user_login,
    updateUser,
    updateRole,
    deleteUser,
    getAllUsers,
    getUsersById
};
