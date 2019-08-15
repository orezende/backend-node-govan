const Driver = require('../models/Driver');

module.exports = {
    async index(req, res) {
        const drivers = await driver.find();

        return res.json(drivers);
    },
    async store(req, res) {
        const currentdriver = req.body;
        const driverExists = await Driver.findOne({ _id: currentdriver._id });

        if (driverExists) {
            return res.status(400).send({error: "Mototrista ja cadastrado!"})
        }

        try {
            const createddriver = await Driver.create({
                name: currentdriver.name,
                email: currentdriver.email,
                cpf: currentdriver.cpf,
                phoneNumber: currentdriver.phoneNumber,
                birthDay: currentdriver.birthDay,
                avatar: currentdriver.avatar,
            });

            return res.json({
                status: true,
                message: "Motorista cadastrado com sucesso",
                driver: createddriver
            });
        } catch{
            return res.status(400).send({error: "Ops! Houve um erro no cadastro!"})
        }
    },
    async update(req, res) {
        const dataToUp = req.body;

        const currentdriverToUp = await Driver.findOne({ _id: dataToUp._id });

        if (!currentdriverToUp) {
            return res.status(400).send({error: "Mototrista não encontrado!"})
        }

        try {
            await driver.updateOne({ _id: currentdriverToUp._id }, dataToUp);

            const driverUpdated = await Driver.findOne({ _id: dataToUp._id });

            return res.json({
                status: true,
                message: "Motorista alterado com sucesso",
                driver: driverUpdated
            });
        } catch{
            return res.status(400).send({error: "Ops! Houve um erro na alteração!"})
        }
    }
}