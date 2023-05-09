const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserController,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { UserImgResize } = require("../middleware/uploadImages");
const { uploadImages } = require("../controller/productController");

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
//router.post("auth/goolle", passport.authenticate("google-plus-token"));
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.post("/login", loginUserController);
router.get("/all-users", getAllUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart-user", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put(
  "/upload-avatar/",
  authMiddleware,
  uploadPhoto.array("images", 10),
  UserImgResize,
  uploadImages
);
router.delete("/:id", deleteAUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
