const FAQ = require("../models/faqs");

// create a new faq
const CreateFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Check for an existing FAQ with the same question
    const existingFAQ = await FAQ.findOne({ question: question });
    if (existingFAQ) {
      return res
        .status(400)
        .json({ error: "An FAQ with the same question exists." });
    }

    // if no duplicate, proceed to create one
    const faq = new FAQ({ question, answer });
    await faq.save();
    res
      .status(201)
      .json({ success: true, message: " FAQ create successfully", data: faq });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error creating FAQ" });
  }
};

// get all the faqs
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching FAQs" });
  }
};

// get faq by Id
const getFAQById = async (req, res) => {
  try {
    const faqId = req.params.id;
    const faq = await FAQ.findById(faqId);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ error: "Error Fetching FAQ" });
  }
};

// Update faq by id
const updateFAQById = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    // check faq by id
    const faq = await FAQ.findById(id);
    if (!faq) {
      res.status(404).json({ error: "FAQ not found" });
      return;
    }
    // updating faq
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );
    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ error: "Error Updating FAQ" });
  }
};

// delete faq by id
const deleteFAQById = async (req, res) => {
    try {
        const { id } = req.params;
          // check faq by id
    const faq = await FAQ.findById(id);
    if (!faq) {
      res.status(404).json({ error: "FAQ not found" });
      return;
    }
    // delete faq
    const deleteFAQ = await FAQ.findOneAndDelete(id)
    if (!deleteFAQ) {
        return res.status(404).json({ error: "Faq not deleted"})
    }
    res.status(200).json({ message: " FAQ deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: "Error Deleting FAQ" });  
    }
};
module.exports = {
  CreateFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQById,
  deleteFAQById
};
