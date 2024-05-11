import type { PlasmoMessaging } from "@plasmohq/messaging";

let show = true;
const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log(req);
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log(11111, info, tab);
    res.send({
      message: "showLoading",
    });

    setTimeout(() => {
      res.send({
        message: "hideLoading",
      });
    }, 3000);
  });
};

export default handler;
