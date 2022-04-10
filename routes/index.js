const router = require('express').Router();
const path = require('path');
const express = require('express');

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(express.static(path.join(__dirname, '../client/build/index.html')));
});

module.exports = router;