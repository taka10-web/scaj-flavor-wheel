import { useState } from "react";
import { exportAsPng, exportAsPdf, shareViaWebShare, encodeSelectionToUrl } from "../utils/export";

interface ExportButtonProps {
  selectedFlavors: Set<string>;
}

export default function ExportButton({ selectedFlavors }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handlePng = async () => {
    setExporting(true);
    try {
      await exportAsPng();
    } finally {
      setExporting(false);
    }
  };

  const handlePdf = async () => {
    setExporting(true);
    try {
      await exportAsPdf();
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    const selected = Array.from(selectedFlavors);
    const shared = await shareViaWebShare(selected);
    if (!shared) {
      // Web Share API非対応: URLをコピー
      const url = encodeSelectionToUrl(selected);
      await navigator.clipboard.writeText(url);
      alert("URLをクリップボードにコピーしました");
    }
  };

  return (
    <div className="export-buttons">
      <h3>エクスポート</h3>
      <div className="btn-group">
        <button className="btn btn-export" onClick={handlePng} disabled={exporting}>
          PNG
        </button>
        <button className="btn btn-export" onClick={handlePdf} disabled={exporting}>
          PDF
        </button>
        <button className="btn btn-export" onClick={handleShare}>
          共有
        </button>
      </div>
    </div>
  );
}
