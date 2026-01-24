const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const familyRoutes = require("./routes/family.routes");
const uploadRoutes = require("./routes/upload.routes");
const prescriptionRoutes = require("./routes/prescription.routes");

const app = express();

app.use(cors())const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const familyRoutes = require("./routes/family.routes");
const uploadRoutes = require("./routes/upload.routes");
const prescriptionRoutes = require("./routes/prescription.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/s3", uploadRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.get("/", (req, res) => {
    res.send("MedVault backend is running");
});

module.exports = app;
;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/family", familyRoutes);
app.use("/api/s3", uploadRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

app.get("/", (req, res) => {
    res.send("MedVault backend is running");
});

module.exports = app;
