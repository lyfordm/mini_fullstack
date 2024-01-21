const Service = require("../models/services");

// create new service
const CreateService = async (req, res) => {
  try {
    const { title, desc } = req.body;

    // check duplicate using service title
    const existingService = await Service.findOne({ title: title });
    if (existingService) {
      return res
        .status(400)
        .json({ error: "A service with that title already exists" });
    }

    // If no duplicate proceed to create
    const service = new Service({ title, desc });
    await service.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Service created succefully",
        data: service,
      });
  } catch (error) {
    res.status(500).json({ error: error.message || "Errror creating service" });
  }
};

// get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Errror fetching services" });
  }
};

// get service by id
const getServiceById = async (req,res) => {
    try {
        const { id } = req.params
    const service = await Service.findById(id)
    if (!service) {
        res.status(404).json({ error: "Service not found"})
    }
    res.status(200).json(service)
    } catch (error) {
        res
        .status(500)
        .json({ error: error.message || "Errror fetching service" });  
    }
    
}
// update service by id
const updateServiceById = async (req, res) => {
    const { id } = req.params
    const { title, desc } = req.body
    try {
        // check if service exists
        const service = await Service.findById(id)
        if (!service) {
            res.status(404).json({ error: "Service not found"})
        }

        // update service
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { title, desc},
            {new: true}
        )
        res.status(200).json(updatedService)
    } catch (error) {
        res
        .status(500)
        .json({ error: error.message || "Errror Updating service" }); 
    }
}

// delete service by id
const deleteServiceById = async (req,res) => {
    const serviceId = req.params.id
    try {
        const deletedService = await Service.findByIdAndDelete(serviceId)
        if (!deletedService) {
            return res.status(404).json({ error: "Service not found"})
        }
        res.status(200).json({ message: "Service deleted successfully"})
    } catch (error) {
        res
        .status(500)
        .json({ error: error.message || "Errror deleting service" });
    }
}
module.exports = {
  CreateService,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById
};
