
import React from "react";
import "./PdfControls.css";

const PdfControls = ({ options, setOptions, handleDownload, isGenerating, selectedId, setSelectedId }) => {
  return (
    <div className="pdf-controls">
      <h3>PDF Export Settings</h3>

      <div className="field">
        <label>Section ID</label>
        <input
          type="text"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          placeholder="Enter section ID (e.g., section1)"
        />
      </div>

      <div className="field">
        <label>File Name</label>
        <input
          type="text"
          value={options.filename}
          onChange={(e) => setOptions({ ...options, filename: e.target.value })}
          placeholder="Enter file name"
        />
      </div>

      <div className="field">
        <label>Page Size</label>
        <select
          value={options.pageSize}
          onChange={(e) => setOptions({ ...options, pageSize: e.target.value })}
        >
          <option value="a4">A4</option>
          <option value="letter">Letter</option>
          <option value="legal">Legal</option>
          <option value="a3">A3</option>
          <option value="a5">A5</option>
        </select>
      </div>

      <div className="field">
        <label>Orientation</label>
        <select
          value={options.orientation}
          onChange={(e) => setOptions({ ...options, orientation: e.target.value })}
        >
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <div className="field">
        <label>Margin (mm)</label>
        <input
          type="number"
          min="5"
          max="50"
          value={options.margin}
          onChange={(e) =>
            setOptions({ ...options, margin: parseInt(e.target.value) || 15 })
          }
          placeholder="e.g. 15"
        />
      </div>

      <div className="tips">
        <h4>💡 Tips for Better PDF Quality:</h4>
        <ul>
          <li>Use inline styles for better compatibility</li>
          <li>Set explicit image dimensions</li>
          <li>Avoid complex CSS layouts</li>
          <li>Use web-safe fonts</li>
        </ul>
      </div>

      <button 
        className={`download-btn ${isGenerating ? 'loading' : ''}`} 
        onClick={handleDownload}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
};

export default PdfControls;