const express = require("express");

const { addCategory } = require("../Controllers/Category");
const router = express.Router();

router.post("/category/create",addCategory);
    

module.exports = router;



