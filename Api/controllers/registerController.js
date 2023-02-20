"use strict";
const Users = require('../models/users.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { email, pwd , username } = req.body;
    if (!email || !pwd || !username) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db mongoose middleware
    const duplicate = await Users.countDocuments({ email: email });  
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const user = new Users({
            email: email,
            username: username,
            pwd: hashedPwd
        });
        await user.save();
        res.status(201).json({ 'success': `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };