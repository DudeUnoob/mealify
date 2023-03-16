const User = require("../model/authModel")
const jwt = require("jsonwebtoken")
const { checkUser } = require("../middlewares/authMiddleware")
const mealModel = require("../model/mealModel")

module.exports.createMeal = async (req, res, next) => {
    try {
        const { meal } = req.body

        // const modelArray = {
        //     title: mealTitle,
        //     picture: mealPicture
        // }

        const token = req.body.token || req.cookies.jwt;
        if (token) {
            jwt.verify(
                token,
                "mealifyauth",
                async (err, decodedToken) => {
                    if (err) {
                        res.json({ status: false });
                        next();
                    } else {
                        const user = await User.findById(decodedToken.id);
                        if (user) {
                            //res.json({ status: true, user: user.email })
                            //await User.findOneAndUpdate({ email: user.email }, { meals: meal })
                            const emaily = user.email
                            const usernamey = user.username
                            // new mealModel({
                            //     username: usernamey,
                            //     email: emaily,
                            //     meals: meal,
                            //     expiryTime: parseInt(meal.expiryDate)
                            //     //expiryDate: new Date(Date.now() + parseInt(meal.expiryDate))
                            // }).save()
                           
                                const docs = await mealModel.find({ email: emaily }).exec()

                                if(docs.some(doc => doc.meals.mealTitle === meal.mealTitle)){
                                    return res.status(400).send({ message: "You already have a meal with this name!" })
                                }
                            
                           
                                const myDoc = new mealModel({ username: usernamey, email: emaily, meals: meal, expiryTime: parseInt(meal.expiryDate) })
                                myDoc.save((err, savedDoc) => {
                                    setTimeout(() => {
                                        mealModel.findByIdAndUpdate(savedDoc._id, { isExpired: true }, { new: true }, (err, updatedDoc) => {
                                            if(err){
                                                console.log(err)
                                            } else {
                                            }
                                        })
                                    }, parseInt(meal.expiryDate))
                                })
                                res.json({ status: true, user: user.email, ACTION_TYPE: "UPDATE_MEAL_LIST" })
                                next()
                            
                            
                           
                       }
                       else {
                       res.json({ status: false });
                       next();
                       }
                    }
                }
            );
        } else {
            res.json({ status: false });
            next();
        }

    } catch (e) {
        return res.status(400).send(e)
    }
}