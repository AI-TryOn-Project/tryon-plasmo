import type { PlasmoCSConfig } from "plasmo";

import { relayMessage } from "@plasmohq/messaging";
import { captureScreenshot } from "~utils/screenShoot";

export const config: PlasmoCSConfig = {
  matches: ["http://www.plasmo.com/*"], // Only relay messages from this domain
};
captureScreenshot();
relayMessage({
  name: "ping",
});
