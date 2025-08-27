const puppeteer = require("puppeteer");

const generatePdf = async (htmlContent, options = {}) => {
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: options.pageSize || "A4",
      landscape: options.orientation === "landscape",
      printBackground: true,
      margin: {
        top: `${options.margin || 15}mm`,
        right: `${options.margin || 15}mm`,
        bottom: `${options.margin || 15}mm`,
        left: `${options.margin || 15}mm`,
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Puppeteer PDF error:", error);
    throw new Error("PDF generation failed");
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

module.exports = {
  generatePdf,
};
