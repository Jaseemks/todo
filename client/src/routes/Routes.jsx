import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <div>
        <Header/>
        <Home/>
        <Footer/>
      </div>,
    },
  ]);