const mealModel = require("../../model/mealModel")

module.exports = setInterval(async() => {

    await mealModel.find({ isExpired: false }).exec((err, docs) => {
        docs.map(async(elm, i) => {
            const { isExpired, createdAt, expiryTime, email, username } = elm
            const preTime = new Date(createdAt).getTime() + expiryTime

            
            if(preTime < Date.now()){
                console.log(elm.isExpired)
                await mealModel.findOneAndUpdate({ createdAt: createdAt, email: email, username: username }, { isExpired: true })
            }
        })
    })

}, 5000)