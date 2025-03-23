const errCont = {}

errCont.triggerError = async function (req, res, next) {
    try {
        throw new Error("Congrats! You broke it... From controller")
    } catch (error) {
        next(error);
    }
}

module.exports = errCont