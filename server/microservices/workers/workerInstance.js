const mealModel = require("../../model/mealModel")
const User = require("../../model/authModel")

exports = module.exports = function (io) {
    io.on("connection", (socket) => {


        function callFunction(email, username, uuid, mealsQuery, updatedMeal) {
            console.log("call function")

        }

        module.exports = setInterval(async () => {
            // const ight = await User.findOne({ email: "to.baladev@gmail.com"}) 
            // console.log(ight._id.toString())

            mealModel.watch().on("change", async data => {
                
                if (data.operationType === "update") {
                    const docId = data.documentKey._id.toString()
                    const updatedDoc = await mealModel.findById(docId)
                    const getAllMeals = await mealModel.find({ email: updatedDoc.email })

                    socket.emit('realtimeUpdate', { email: updatedDoc.email, username: updatedDoc.username, meals: getAllMeals, updatedMeal: updatedDoc })
                    //console.log(username, email, isExpired, createdAt, expiryTime)
                    //meals        
                    //console.log(data.updateDescription.updatedFields)
                }

                // socket.emit('realtimeUpdate', { email: email, username: username, meals: meals })
            })
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
                    }


                })
            })

        }, 5000)
    })
}
