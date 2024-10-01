require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getDepartments } = require("./controllers")

const app = express()

app.use(express.json());

app.use(cors());

app.get("/departments", getDepartments);
app.get("/objects/:object_id, getObjectByID")
module.exports = app; 