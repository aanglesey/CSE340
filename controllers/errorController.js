const errCont = {}

errCont.triggerError = async function (req, res, next) {
    console.log("THIS IS IN ERROR CONTROLLER")
    throw new Error("Congrats! You broke it... From controller")
}

module.exports = errCont