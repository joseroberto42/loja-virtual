import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Produtos from "./pages/produtos/produtos";
import Carrinho from "./pages/carrinho/carrinho";
import SobrePage from "./pages/sobre/sobre";
import ProductPage from "./pages/ProdutosPage/ProdutosPage";



function AppRoutes(){
    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/produtos" element={<Produtos/>}></Route>
            <Route path="/ProdutosAdd" element={<ProductPage/>}></Route>


            <Route path="/sobre" element={<SobrePage/>}></Route>

            <Route path="/carrinho" element={<Carrinho/>}></Route>
           </Routes>
        </BrowserRouter>
    );
}
export default AppRoutes;