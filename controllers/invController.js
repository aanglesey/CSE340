const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by individual view
 * ************************** */
invCont.buildByIndividualView = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  const individualGrid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const make = data.inv_make
  const model = data.inv_model
  const year = data.inv_year
  res.render("./inventory/individual", {
    title: year + ' ' + make + ' ' + model,
    nav,
    individualGrid,
  })
}

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null
  })
}

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

/* ****************************************
*  Process classification
* *************************************** */
invCont.createNewClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  
  const regResult = await invModel.createNewClassification(
    classification_name
  ) 

// need to get message working and refresh page so nav bar works 
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re classification ${classification_name} has been created.`
    )
    res.status(201).render("../views/inventory/management", {
      title: "Add New Classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("../views/inventory/management", {
      title: "Registration",
      nav, 
    })
  }
}

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    errors: null
  })
}

module.exports = invCont