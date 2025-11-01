import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../App/store";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Navigation from "./component/Navigation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
