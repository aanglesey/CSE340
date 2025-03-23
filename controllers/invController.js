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
  console.log('THE INVENTORY ID IS', inventory_id)
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  const individualGrid = await utilities.buildInventoryGrid(data)
  console.log(individualGrid)
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

module.exports = invCont