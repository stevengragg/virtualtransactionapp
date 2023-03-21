import React from "react";
import ReactDOM from "react-dom/client";
import { Meteor } from "meteor/meteor";
import App from "/imports/ui/App";
import AuthProvider from "/imports/ui/auth/AuthProvider";

import "./main.css";

const root = ReactDOM.createRoot(document.getElementById("uccvta-root"));

Meteor.startup(() => {
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  );
});
