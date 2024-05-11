import React, { useEffect, useState } from "react";
import cssText from "data-text:~components/Loading/style.css";
import type { PlasmoCSConfig } from "plasmo";

import { useMessage } from "@plasmohq/messaging/hook";
import { usePort } from "@plasmohq/messaging/hook";
import Loading from "~/components/Loading";

export const config: PlasmoCSConfig = {
  all_frames: true
};
export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};
const QueryTextAnywhere = () => {
  const loadingPort = usePort("creatLoading");

  useEffect(() => {
    loadingPort.send({
      message111: "2222222",
    });
  }, []);
  console.log(loadingPort, 11111112222);


  return (
    <div>
      <div>{loadingPort.data?.message === 'showLoading' && <Loading />}</div>
    </div >
  );
};

export default QueryTextAnywhere;
