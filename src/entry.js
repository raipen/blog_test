import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../template/App";

if(process.env.NODE_ENV === "development") {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter basename={process.env.BASE_URL}>
      <App />
    </BrowserRouter>
  );
}
else{
  ReactDOM.hydrateRoot(
    document.getElementById("root"),
    <BrowserRouter basename={process.env.BASE_URL}>
      <App />
    </BrowserRouter>
  );
}
