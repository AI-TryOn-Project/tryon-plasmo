import type { PlasmoMessaging } from "@plasmohq/messaging";

import { sendMessageToContent } from "~utils/message";

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("capture", req);
  chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
    // 创建一个画布并绘制截取的图像部分
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      //   canvas.width = request.area.width;
      //   canvas.height = request.area.height;
      //   ctx.drawImage(img, request.area.x, request.area.y, request.area.width, request.area.height, 0, 0, request.area.width, request.area.height);
      // 将截取的图像导出为数据URL
      const croppedDataUrl = canvas.toDataURL("image/png");
      // 可以在这里处理截图结果，例如下载或预览
      console.log(croppedDataUrl);
    };
  });
  res.send({
    name: "MyMsg",
  });
};
