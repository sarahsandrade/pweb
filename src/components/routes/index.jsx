import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Country from "../Pages/Country";
import Home from "../Pages/Homepage/index";
import Login from "../Pages/Login/index";
import Register from "../Pages/Register/index.jsx";
import Medal from "../Pages/Registermedal/index";

const Rotas =() => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Medal" element={<Medal />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/country/:id" element={<Country/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas;