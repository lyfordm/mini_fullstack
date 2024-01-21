const express = require("express")
const { CreateFAQ, getAllFAQs, getFAQById, updateFAQById, deleteFAQById } = require("../controllers/faqsControllers")
const router = express.Router()


// create a new FAQ
router.post("/create", CreateFAQ)

// Get all the FAQs 
router.get("/view-all", getAllFAQs)
// get a faq by id
router.get("/view/:id", getFAQById)
//update faq
router.patch("/update/:id", updateFAQById)
// delete faq
router.delete("/delete/:id", deleteFAQById)

module.exports = router