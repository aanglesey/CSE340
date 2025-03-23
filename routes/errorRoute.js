const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/errorController")

// Route to build error
router.get("/trigger-error", errorController.triggerError);

module.exports = router;