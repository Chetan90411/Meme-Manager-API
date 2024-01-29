import { Router } from "express";
const router = new Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("pages/login");
});

router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.get("/home", (req, res) => {
  res.render("pages/home");
});

export default router;
