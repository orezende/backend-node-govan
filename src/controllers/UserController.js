const axios = require('axios');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        const currentUser = User.findById(user);

        const users = await User.find();

        return res.json(users);
    },

    async store(req, res) {
        const { currentUser } = req.body;

        const userExists = await User.findOne({ user: currentUser });

        if(userExists){
            return res.json({
                error: "Usuário ja cadastrado"
            });
        }

        const createdUser = await User.create({
            name: currentUser.name,
            email: currentUser.email,
            cpf: currentUser.cpf, 
            phoneNumber: currentUser.phoneNumber,
            birthDay: currentUser.birthDay,
            avatar : currentUser.avatar,
        });

        return res.json({
            message: "Usuario Criado com sucesso!",
            user: createdUser            
        });
    }
}