const axios = require('axios');
const Driver = require('../models/Driver');

module.exports = {
    async index(req, res) {
        const { driver } = req.headers;

        const currentDriver = Driver.findById(driver);

        const drivers = await Driver.find();

        return res.json(drivers);
    },

    async store(req, res) {
        const { currentDriver } = req.body;

        const driverExists = await Driver.findOne({ driver: currentDriver });

        if (driverExists) {
            return res.json({
                error: "Motorista ja cadastrado"
            });
        }

        const createdDriver = await Driver.create({
            name: currentDriver.name,
            email: currentDriver.email,
            cpf: currentDriver.cpf,
            phoneNumber: currentDriver.phoneNumber,
            birthDay: currentDriver.birthDay,
            avatar: currentDriver.avatar,
        });

        return res.json({
            message: "Motorista criado com sucesso!",
            driver: createdDriver
        });
    },
    async update(req, res) {
        const { driverUpdated } = req.body;

        const driverToUpdate = await Driver.findById(driverUpdated._id);

        const driverUpdated = await Driver.updateOne(driverToUpdate, driverUpdated);

        if (!driverUpdated) {
            return res.json({
                error: "Motorista não encontrado"
            });
        }

        return res.json({
            message: "Motorista atualizado com sucesso!",
            driver: driverUpdated
        });
    }
}