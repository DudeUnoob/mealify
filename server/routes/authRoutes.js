const { register, login } = require("../controllers/authControllers");
const { createMeal } = require("../createData/createMeal");
const { userIngredients } = require("../createData/userIngredients");
const { getMeals } = require("../getData/getMeals");
const { getUserIngredients } = require("../getData/getUserIngredients")
const { checkUser } = require("../middlewares/authMiddleware");
const { requestPayloadSize } = require("../middlewares/requestPayloadSize");


const router = require("express").Router();


router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post('/user/ingredients', userIngredients)
router.post('/user/get-ingredients', getUserIngredients)
router.post('/user/new-meal',  createMeal)
router.post('/user/get-meals', getMeals)



module.exports = router;
