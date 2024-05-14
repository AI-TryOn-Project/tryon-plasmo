chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScreenshot") {
    startScreenshot();
  }
});

export function startScreenshot() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";
  overlay.style.cursor = "crosshair";
  document.body.appendChild(overlay);

  let startX: number, startY: number;
  const selectionBox = document.createElement("div");
  selectionBox.style.position = "absolute";
  selectionBox.style.border = "2px dashed #fff";
  overlay.appendChild(selectionBox);

  overlay.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = "0px";
    selectionBox.style.height = "0px";
    overlay.addEventListener("mousemove", onMouseMove);
  });

  overlay.addEventListener("mouseup", (e) => {
    const endX = e.clientX;
    const endY = e.clientY;
    overlay.removeEventListener("mousemove", onMouseMove);
    overlay.remove();
    captureScreenshot(startX, startY, endX, endY);
  });

  function onMouseMove(e: MouseEvent) {
    const currentX = e.clientX;
    const currentY = e.clientY;
    selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
    selectionBox.style.height = `${Math.abs(currentY - startY)}px`;
    selectionBox.style.left = `${Math.min(currentX, startX)}px`;
    selectionBox.style.top = `${Math.min(currentY, startY)}px`;
  }

  function captureScreenshot(x1: number, y1: number, x2: number, y2: number) {
    chrome.runtime.sendMessage({
      action: "captureImage",
      area: {
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      },
    });
  }
}
