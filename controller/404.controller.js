const pageNotFound = (req,res,next) => {
    const message = `Page Not Found`
    res.status(404).send({message, status: 404})
}

module.exports = pageNotFound;
