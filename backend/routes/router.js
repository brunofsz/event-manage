const router = require("express").Router();
const serviceRouter = require("./service");

router.use("/", serviceRouter);

const partyRouter = require("./parties");

router.use("/", partyRouter);

module.exports = router;
