const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

module.exports = {
    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    },
    async store(req, res) {
        const currentUser = req.body;
        const userExists = await User.findOne({ email: currentUser.email });

        if (userExists) {
            return res.status(400).send({ error: "Usuário já existente!" })
        }

        try {
            const createdUser = await User.create({
                name: currentUser.name,
                email: currentUser.email,
                cpf: currentUser.cpf,
                phoneNumber: currentUser.phoneNumber,
                birthDay: currentUser.birthDay,
                avatar: currentUser.avatar,
                password: currentUser.password
            });

            createdUser.password = undefined;

            const token = jwt.sign({ id: createdUser._id }, authConfig.secret, {
                expiresIn: 86400,
            });

            return res.json({
                status: true,
                message: "Usuário cadastrado com sucesso",
                user: createdUser,
                token
            });
        } catch{
            return res.status(400).send({ error: "Ops! Houve um erro no cadastro!" })
        }
    },
    async update(req, res) {
        const dataToUp = req.body;

        const currentUserToUp = await User.findOne({ email: dataToUp.email });

        if (!currentUserToUp) {
            return res.status(400).send({ error: "Usuário não encontrado!" })
        }

        try {
            await User.updateOne({ _id: currentUserToUp._id }, dataToUp);

            const userUpdated = await User.findOne({ _id: dataToUp._id });

            userUpdated.password = undefined;

            return res.json({
                status: true,
                message: "Usuário alterado com sucesso",
                user: userUpdated
            });
        } catch{
            return res.status(400).send({ error: "Ops! Houve um erro na alteração!" })
        }
    }
}