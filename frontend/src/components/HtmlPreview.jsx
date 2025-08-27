import React from "react";
import "./HtmlPreview.css";

const HtmlPreview = ({ htmlContent }) => {
  return (
    <div className="preview">
      <h3>Live Preview</h3>
      <div
        id="preview-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default HtmlPreview;
