import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../template/App";

ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter basename="https://raipen.github.io/blog_test/">
    <App />
  </BrowserRouter>
);
