const express = require("express");
const cors = require("cors");
const pdfController = require("./controllers/pdfController");

const app = express();
const port = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// API route
app.post("/generate-pdf", pdfController.generatePdf);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});