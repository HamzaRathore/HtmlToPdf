const pdfService = require("../services/pdfService");

// This function handles the incoming request and sends the response
const generatePdf = async (req, res) => {
  const { htmlContent, options } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ error: "HTML content is required" });
  }

  try {
    const pdfBuffer = await pdfService.generatePdf(htmlContent,options);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${options.filename || "document.pdf"}"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

module.exports = {
  generatePdf,
};