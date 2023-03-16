const User = require("../model/authModel")
const jwt = require("jsonwebtoken")
const { checkUser } = require("../middlewares/authMiddleware")

module.exports.getMeals = async(req, res, next) => {

    try {
       
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
                            const getMeals = await User.findOne({ email: user.email })
                            return res.json({ status: true, user: user.email, ACTION_TYPE: "GET_MEALS_LIST", meals: getMeals.meals })
                        }
                        else 
                        {res.json({ status: false });
                        next();}
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