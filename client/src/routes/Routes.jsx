import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Footer } from "../pages/Footer";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>
        <Home/>
        <Footer/>
      </div>,
    },
  ]);