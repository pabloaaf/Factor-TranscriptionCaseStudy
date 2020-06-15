const express = require("express");
const router = express.Router();
const grpcRoutes = require('./grpc');

router.use('/message', grpcRoutes);

module.exports = router;