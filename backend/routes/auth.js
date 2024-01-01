import express from "express";
import {
  ResetPassword,
  generateDummyUsers,
  getUser,
  login,
  register,
} from "../controllers/auth.js";
import multer from "multer";
import { updateUser } from "../controllers/user.js";

const router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
router.post("/register", upload.single("profilepic"), register);
router.post("/createdummy", generateDummyUsers);
router.put("/update/:userId", upload.single("profilepic"), updateUser);

router.post("/login", login);
router.post("/reset", ResetPassword);

export default router;
