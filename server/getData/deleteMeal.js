const mealModel = require("../model/mealModel")


module.exports.deleteMeal = async(req, res, next) => {

    const { mealId, token } = req.body 


    mealModel.findByIdAndDelete(mealId, function(err, response) {
        if (err) return res.status(400).json({ error:"error deleting the meal", status: 400})

        return res.json({ message: "Successfully deleted the meal", status: 201 })
    })
}