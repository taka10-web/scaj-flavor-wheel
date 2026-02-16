import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportAsPng(): Promise<void> {
  const el = document.getElementById("flavor-wheel-container");
  if (!el) return;

  const canvas = await html2canvas(el, {
    backgroundColor: "#ffffff",
    scale: 2,
  });

  const link = document.createElement("a");
  link.download = `flavor-wheel-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportAsPdf(): Promise<void> {
  const el = document.getElementById("flavor-wheel-container");
  if (!el) return;

  const canvas = await html2canvas(el, {
    backgroundColor: "#ffffff",
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgRatio = canvas.width / canvas.height;
  let imgWidth = pdfWidth - 20;
  let imgHeight = imgWidth / imgRatio;

  if (imgHeight > pdfHeight - 20) {
    imgHeight = pdfHeight - 20;
    imgWidth = imgHeight * imgRatio;
  }

  const x = (pdfWidth - imgWidth) / 2;
  const y = (pdfHeight - imgHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
  pdf.save(`flavor-wheel-${Date.now()}.pdf`);
}

export function encodeSelectionToUrl(selected: string[]): string {
  const params = new URLSearchParams();
  if (selected.length > 0) {
    params.set("s", selected.join(","));
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function decodeSelectionFromUrl(): string[] {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("s");
  if (!s) return [];
  return s.split(",").filter(Boolean);
}

export async function shareViaWebShare(selected: string[]): Promise<boolean> {
  if (!navigator.share) return false;

  const url = encodeSelectionToUrl(selected);
  try {
    await navigator.share({
      title: "SCA Flavor Wheel - カッピングノート",
      text: "コーヒーのフレーバーホイール",
      url,
    });
    return true;
  } catch {
    return false;
  }
}
