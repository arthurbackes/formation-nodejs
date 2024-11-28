const express = require("express");
const { getLists, getList, createList, updateList, deleteList } = require("../controllers/listController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


router.use(validateToken);

router.route("/").get(getLists).post(createList);
router.route("/:id").get(getList).post(updateList).delete(deleteList);


module.exports = router;