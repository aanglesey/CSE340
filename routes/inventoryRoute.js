// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const invController = require("../controllers/invController")
const classValidate = require('../utilities/account-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build specific inventory view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByIndividualView))

// route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// route to add new classification
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// process new classification
router.post(
    "/add-classification", 
    classValidate.newClassificationRules(),
    classValidate.checkClassificationData,
    utilities.handleErrors(invController.createNewClassification)
) 

// route to add new inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// process new inventory
// router.post(
//     "/add-inventory", 
//     classValidate.newClassificationRules(),
//     classValidate.checkClassificationData,
//     utilities.handleErrors(invController.createNewClassification)
// ) 

module.exports = router;