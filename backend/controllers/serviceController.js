const { get } = require("mongoose");
const { Service: ServiceModel } = require("../models/Service");

const serviceController = {
  create: async (req, res) => {
    try {
      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service);

      res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.error(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const services = await ServiceModel.findById(id);

      if (!services) {
        res.status(404).json({ msg: "Serviço não encontrado!" });
        return;
      }

      res.json(services);
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const services = await ServiceModel.findById(id);
      if (!services) {
        res.status(404).json({ msg: "Serviço não encontrado!" });
        return;
      }

      const deletedeService = await ServiceModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedeService, msg: "Serviço removido com sucesso!" });
    } catch (error) {
      console.error(error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      console.log("BODY RECEBIDO: ", req.body);
      console.log("HEADERS:", req.headers);

      const service = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updatedService = await ServiceModel.findByIdAndUpdate(id, service);

      if (!updatedService) {
        res.status(404).json({ msg: "Serviço não encontrado!" });
        return;
      }

      res.status(200).json({ service, msg: "Serviço atualizado com sucesso!" });
    } catch (error) {
      console.error("deu esse erro aqui:", error);
    }
  },
};

module.exports = serviceController;
