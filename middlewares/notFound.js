const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({message : "Sorry can't find that!"})
}

module.exports = notFoundMiddleware