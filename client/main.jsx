import React from "react";
import { render } from "react-dom";
import { BrowserRouter as UCCVTABrowserRouter } from "react-router-dom";
import App from "/imports/ui/App";

import "./main.css";

Meteor.startup(() => {
  render(
    <React.StrictMode>
      <UCCVTABrowserRouter>
        <App />
      </UCCVTABrowserRouter>
    </React.StrictMode>,
    document.getElementById("uccvta-root")
  );
});
