import express from "express";
import { getNearestUsers, updateUser } from "../controllers/user.js";
import bodyParser from "body-parser";
import multer from "multer";
import { getUser } from "../controllers/auth.js";
const router = express.Router();
router.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
router.get("/getNearest", getNearestUsers);
router.post("/update/:userId", upload.single("profilepic"), updateUser);
router.put("/update/:userId", upload.single("profilepic"), updateUser);
router.get("/:id", getUser);

export default router;
