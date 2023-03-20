const mealModel = require("../../model/mealModel")
const User = require("../../model/authModel")

exports = module.exports = function (io) {
    io.on("connection", (socket) => {




        module.exports = setInterval(async () => {
            // const ight = await User.findOne({ email: "to.baladev@gmail.com"}) 
            // console.log(ight._id.toString())


            mealModel.find({ isExpired: false }).exec((err, docs) => {
                docs.map(async (elm, i) => {
                    const { isExpired, createdAt, expiryTime, email, username } = elm
                    const preTime = new Date(createdAt).getTime() + expiryTime



                    if (preTime <= Date.now()) {
                        const updatedMeal = await mealModel.findOneAndUpdate({ createdAt: createdAt, email: email, username: username }, { isExpired: true }, { new: true })

                        const getUUID = await User.findOne({ email: email, username: username })
                        socket.uuid = getUUID._id.toString()
                        // console.log(_id)
                        const mealQuery = await mealModel.find({ email: email })

                        socket.emit('realtimeUpdate', { email: email, username: username, uuid: socket.uuid, meals: mealQuery, updatedMeal: updatedMeal })

                    }


                })
            })

        }, 5000)
    })
}
