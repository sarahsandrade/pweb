import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "../Pages/Homepage/Homepage";
import Login from "../Pages/Loginpage/Loginpage";
import Medal from "../Pages/RegistermedalPage/RegisterMedalPage";

const Rotas =() => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Medal" element={<Medal />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Rotas;