const express = require("express");
const {
  createEnq,

  deleteEnq,
  getEnq,
  getAllEnq,
  updateEnq,
} = require("../controller/EnqController");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", createEnq);
router.put("/", authMiddleware, isAdmin, updateEnq);
router.delete("/:id", authMiddleware, isAdmin, deleteEnq);
router.get("/:id", getEnq);
router.get("/", getAllEnq);

module.exports = router;
