import Logando from "../../componentes/login";
import Navbar from "../../componentes/navbar";
import RegisterPage from "../../componentes/RegistrarUser";
function login(){
    return(
        <div>
                <Navbar></Navbar>
                <Logando/>
                <RegisterPage></RegisterPage>
        </div>
        

    );
}
export default login;