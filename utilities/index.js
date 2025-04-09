const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the individual view HTML
* ************************************ */
Util.buildInventoryGrid = async function(data) {
  let individualGrid
  if(data){
    individualGrid = '<div id="individual-display"> '
    individualGrid += '<img src="' + data.inv_image 
      + '" alt="Image of '+ data.inv_make + ' ' + data.inv_model 
      + ' on CSE Motors" />'
    individualGrid += '<h2>' + data.inv_make + ' ' + data.inv_model + ' Details</h2>' 
    individualGrid += '<p><strong>Price: $' + new Intl.NumberFormat('en-US').format(data.inv_price) + '</strong></p>'
    individualGrid += '<p><strong>Description: </strong>' + data.inv_description + '</p>'
    individualGrid += '<p><strong>Color: </strong>' + data.inv_color + '</p>'
    individualGrid += '<p><strong>Miles: </strong>' + data.inv_miles + '</p>'
    individualGrid += '</div>'
  } else {
    individualGrid += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
  }
  // console.log('THE LINK IS', data.inv_image)
  return individualGrid
}

// Selection menu 
// Util.buildSelection = async function(data) {
//   let selection

//   if(data){
//     // let selectionArray = []
//     // selectionArray.push(addItem)
//     // selectionArray.forEach(selection) {
//     //   selection = '<option value="' + data.classification_name + '">' + data.classification_name + '</option>'
//     // }

//     selection = '<select name="classification-select" id="classification-select"> '
//     selection += '<option value="' + data.classification_name + '">' + data.classification_name + '</option>'
//     selection += '</select>'
//   } else {
//     individualGrid += '<p class="notice">Sorry, no matching vehicle could be found.</p>'
//   }

  // selectionArray.forEach(selection) {
  //   selection = '<option value="' + data.classification_name + '">' + data.classification_name + '</option>'
//   // }
//   return selection
// }

Util.buildAccountView = async function(data) {
  let accountView
  if(data){
    accountView = '<h1>You are logged in</h1>'
  } else {
    accountView += '<p class="notice">Sorry, login error.</p>'
  }
  return accountView
}

/* ******************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */ 
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util