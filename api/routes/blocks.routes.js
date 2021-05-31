const express = require("express");
const router = express.Router();
const block = require("../controllers/blocks.controller");

router.get("/", block.getBlock);
router.post("/transaction", block.addTransaction);
router.get("/balance/:id", block.getBalance);

module.exports = router;