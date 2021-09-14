const express = require("express");
const router = express.Router();
const services = require("../services/render");

/**
 * @description root route
 * @method GET /
 */

router.get("/", services.homeRoutes);

/**
 * @description add user
 * @method GET /add-user
 */

router.get("/add-user", services.add_user);

/**
 * @description update user
 * @method GET /update-user
 */

router.get("/update-user", services.update_user);

module.exports = router;
