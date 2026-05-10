import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error404 from "./pages/Errors/Error404";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
