

module.exports.requestPayloadSize = async(req, res, next) => {
    
    const payloadSize = parseInt(req.headers['content-length'])
    const maxAllowedSize = 5000000;

    if(contentLength > maxAllowedSize){
        return res.status(413).json({ message: "Your image is too large of a file" })
    } else {
        next()
    }
}