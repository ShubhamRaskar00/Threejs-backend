const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// get controller
router.post("/v1/api/add-event", userController.addEventToGoogleCalendar);

module.exports = router;
