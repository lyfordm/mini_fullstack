const express = require("express")
const { CreateService, getAllServices, getServiceById, updateServiceById, deleteServiceById } = require("../controllers/serviceControllers")
const router = express.Router()

//create service
router.post("/create", CreateService)
// get all services
router.get("/view-all", getAllServices)
// get service by id
router.get("/view/:id", getServiceById)
// update service
router.patch("/update/:id", updateServiceById)
// delete service
router.delete("/delete/:id", deleteServiceById)


module.exports = router