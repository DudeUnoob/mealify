const { register, login } = require("../controllers/authControllers");
const { userIngredients } = require("../createData/userIngredients");
const { getUserIngredients } = require("../getData/getUserIngredients")
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post('/user/ingredients', userIngredients)
router.post('/user/get-ingredients', getUserIngredients)

module.exports = router;
