import { Router } from "express";
import passport from "passport";
import { verifyToken } from "../utils/index.js";

const router = Router();
router.get("/", (req, res) => {
  res.render("home", { title: "HOME" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "REGISTER" });
});
router.get("/login", (req, res) => {
  res.render("login", { title: "LOGIN" });
});
router.get('/current',passport.authenticate('jwt',{session:false}), (req,res)=>{
  res.render("current", { title: "CURRENT" ,user:req.user.user});
  console.log(req.user);
  
})
export default router;
