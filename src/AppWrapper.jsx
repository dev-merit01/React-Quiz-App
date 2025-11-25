import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import AuthListener from "./AuthListener";
import App from "./App";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <AuthListener>
        <App />
      </AuthListener>
    </Provider>
  );
}
