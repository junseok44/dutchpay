import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { RecoilRoot } from "recoil";
import { groupMemberAtom } from "./state/groupMembers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot
      initializeState={(snapShot) => {
        snapShot.set(groupMemberAtom, ["준석", "재연", "민영"]);
      }}
    >
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
