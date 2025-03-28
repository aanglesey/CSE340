// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController = require("../controllers/accountController.js")
const regValidate = require('../utilities/account-validation')

// Login Account View Route
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// Register Account View Route
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// process resgister account
router.post(
    "/register", 
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;