const { register, login } = require("../controllers/authControllers");
const { userIngredients } = require("../createData/userIngredients");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post('/user/ingredients', userIngredients)

module.exports = router;
