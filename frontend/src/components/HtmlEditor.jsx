import React from "react";
import "./HtmlEditor.css";

const HtmlEditor = ({ htmlContent, setHtmlContent }) => {
//   const templates = [
//     {
//       name: "Simple Document",
//       content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//   <h1 style="color: #2c3e50; text-align: center;">Document Title</h1>
//   <p>Your content here...</p>
// </div>`
//     },
//     {
//       name: "Report Template",
//       content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto;">
//   <h1 style="color: #2c3e50; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
//     Report Title
//   </h1>
//   <h2 style="color: #34495e; margin-top: 30px;">Section 1</h2>
//   <p>Section content...</p>
//   <h2 style="color: #34495e; margin-top: 30px;">Section 2</h2>
//   <p>More content...</p>
// </div>`
//     },
//     {
//       name: "Invoice Template",
//       content: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//   <h1 style="color: #2c3e50; text-align: center;">INVOICE</h1>
//   <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//     <tr style="background-color: #ecf0f1;">
//       <th style="border: 1px solid #bdc3c7; padding: 10px;">Item</th>
//       <th style="border: 1px solid #bdc3c7; padding: 10px;">Quantity</th>
//       <th style="border: 1px solid #bdc3c7; padding: 10px;">Price</th>
//     </tr>
//     <tr>
//       <td style="border: 1px solid #bdc3c7; padding: 10px;">Sample Item</td>
//       <td style="border: 1px solid #bdc3c7; padding: 10px;">1</td>
//       <td style="border: 1px solid #bdc3c7; padding: 10px;">$100.00</td>
//     </tr>
//   </table>
// </div>`
//     }
//   ];

  const insertTemplate = (template) => {
    setHtmlContent(template.content);
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <h3>HTML Editor</h3>
        {/* <div className="template-dropdown">
          <select 
            onChange={(e) => {
              if (e.target.value) {
                const template = templates.find(t => t.name === e.target.value);
                if (template) insertTemplate(template);
                e.target.value = '';
              }
            }}
            defaultValue=""
          >
            <option value="">📄 Insert Template</option>
            {templates.map((template, index) => (
              <option key={index} value={template.name}>{template.name}</option>
            ))}
          </select>
        </div> */}
      </div>
      
      <div className="editor-tips">
        <p><strong>💡 PDF Tips:</strong></p>
        <ul>
          <li>Use inline styles for better compatibility</li>
          <li>Set explicit width/height for images</li>
          <li>Use web-safe fonts (Arial, Helvetica, Times New Roman)</li>
          <li>Avoid complex CSS layouts</li>
        </ul>
      </div>

      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        placeholder="Enter your HTML content here..."
        className="html-textarea"
      />
    </div>
  );
};

export default HtmlEditor;
