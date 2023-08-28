import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../template/App";

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.documentElement
);