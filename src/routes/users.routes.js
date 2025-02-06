import { Router } from "express";
import usersModel from "../models/users.model.js";
import { isValidPassword, createHash, generateToken } from "../utils/index.js";
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersModel.find();
    res.status(200).json({ status: "Ok", payload: users });
  } catch (error) {
    res.status(500).json({ status: "Error ", error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, role, age } = req.body;
  try {
    const newUser = {
      first_name,
      last_name,
      email,
      password: createHash(password),
      age,
    };
    if (role) newUser.role = role;
    await usersModel.create(newUser);
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ status: "Error ", error: error.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await usersModel.findOne({ email });

    if(!userFound){
      return res.status(401).json({ status: "Error", error: "usuario no encontrado" });
    }

    const isvalid = isValidPassword(password, userFound.password);
    if(!isvalid){
      return res.status(401).json({ status: "Error", error: "Contraseña incorrecta" });
    }

    const user = userFound._doc;
    delete user.password;
    console.log(user);

    const token = generateToken(user);
    console.log(token);
    res.cookie("tokenCookie", token, { httpOnly: true });
    res.redirect("/current");
  } catch (error) {
    res.status(500).json({ status: "Error ", error: error.message });
  }
});
router.get('/current',passport.authenticate('jwt',{session:false}), (req,res)=>{
  res.send(req.user)
  
})
export default router;
