const User = require("../model/authModel")
const jwt = require("jsonwebtoken")
const { checkUser } = require("../middlewares/authMiddleware")


module.exports.userIngredients = async (req, res, next) => {
    try {
        const { ingredients } = req.body

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
                            await User.findOneAndUpdate({ email: user.email }, { ingredients: ingredients })
                            return res.json({ status: true, user: user.email, ACTION_TYPE: "UPDATE_INGREDIENT_LIST" })
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