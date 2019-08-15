const axios = require('axios');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    },
    async store(req, res) {
        const currentUser = req.body;
        const userExists = await User.findOne({ _id: currentUser._id });

        if (userExists) {
            return res.json({
                status: false,
                message: "Usuário já cadastrado"
            });
        }

        try {
            const createdUser = await User.create({
                name: currentUser.name,
                email: currentUser.email,
                cpf: currentUser.cpf,
                phoneNumber: currentUser.phoneNumber,
                birthDay: currentUser.birthDay,
                avatar: currentUser.avatar,
            });

            return res.json({
                status: true,
                message: "Usuário cadastrado com sucesso",
                user: createdUser
            });
        } catch{
            return res.json({
                status: false,
                message: "Ops! Houve um erro no cadastro"
            })
        }
    },
    async update(req, res) {
        const dataToUp = req.body;

        const currentUserToUp = await User.findOne({ _id: dataToUp._id });

        if (!currentUserToUp) {
            return res.json({
                status: false,
                message: "Usuário não encontrado"
            })
        }

        try {
            await User.updateOne({ _id: currentUserToUp._id }, dataToUp);

            const userUpdated = await User.findOne({ _id: dataToUp._id });

            return res.json({
                status: true,
                message: "Usuário alterado com sucesso",
                user: userUpdated
            });
        } catch{
            return res.json({
                status: false,
                message: "Ops! Houve um erro na alteração"
            })
        }
    }
}