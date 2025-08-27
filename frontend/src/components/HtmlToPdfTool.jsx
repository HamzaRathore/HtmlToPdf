import React, { useState } from "react";
import HtmlEditor from "./HtmlEditor";
import PdfControls from "./PdfControls";
import HtmlPreview from "./HtmlPreview";
import "./HtmlToPdfTool.css";
import { generatePdfFromHtml } from "../api/pdfApi.js";

const HtmlToPdfTool = () => {
  const [htmlContent, setHtmlContent] = useState(
    `<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto;">
       <div id="section1">
         <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 28px; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
           Section 1: Sample Document
         </h1>
         <p style="font-size: 16px; margin-bottom: 20px; text-align: justify;">
           This is section 1 to demonstrate high-quality PDF conversion.
         </p>
         <div style="text-align: center; margin: 30px 0;">
           <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
                width="120" 
                height="120"
                style="display: inline-block; margin: 0 auto; border: 2px solid #ecf0f1; border-radius: 8px; padding: 10px;"
                crossorigin="anonymous"
                alt="React Logo"/>
         </div>
       </div>
       <div id="section2">
         <h1 style="color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 28px; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
           Section 2: Another Sample
         </h1>
         <p style="font-size: 16px; margin-bottom: 20px; text-align: justify;">
           This is section 2 with different content.
         </p>
       </div>
     </div>`
  );

  const [options, setOptions] = useState({
    filename: "document.pdf",
    pageSize: "a4",
    orientation: "portrait",
    margin: 15,
    scale: 1.4,
  });

  const [selectedId, setSelectedId] = useState(""); 
  const [isGenerating, setIsGenerating] = useState(false);

  const getSectionById = (id) => {
  const parser = new DOMParser();      //Convert String into html document
  const doc = parser.parseFromString(htmlContent, "text/html");
  const section = doc.getElementById(id);

  if (!section) return htmlContent;

  // Internal CSS collect karo
  const styles = doc.querySelectorAll("style");
  let stylesHTML = "";
  styles.forEach(style => {
    stylesHTML += style.outerHTML;
  });

  // Return section + CSS
  return `
    <html>
      <head>${stylesHTML}</head>
      <body>${section.outerHTML}</body>
    </html>
  `;
};


  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const filteredContent = getSectionById(selectedId);
      console.log("Generating PDF with:", { filteredContent, options }); 

      // generatePdfFromHtml function returns raw PDF binary data (not a downloadable file yet).
      // You cannot directly assign this binary data to a link (<a>) for download.
      // That’s why you wrap it in a Blob and give it a type: "application/pdf".

      const pdfBlob = await generatePdfFromHtml(filteredContent, options);  //to convert htmlContent to PDF Blob (binary large object). 
                                                                            // Blob is basically a raw file data which is inside memory in the browser.
      const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", options.filename);
      document.body.appendChild(link);   // It attach anchor to dom temporarily
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error.response ? error.response.data : error.message);
      alert(error.message || "Failed to generate PDF. Check console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="tool-container">
      <header className="tool-header">
        <h1>✨ HTML to PDF Converter</h1>
        <p>Write HTML → Preview → Export as PDF</p>
      </header>
      <div className="tool-grid">
        <HtmlEditor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
        <PdfControls
          options={options}
          setOptions={setOptions}
          handleDownl oad={handleDownload}
          isGenerating={isGenerating}
          selectedId={selectedId}
          setSelectedId={setSelectedId} 
        />
      </div>
      <HtmlPreview htmlContent={getSectionById(selectedId)} /> 
    </div>
  );
};

export default HtmlToPdfTool;