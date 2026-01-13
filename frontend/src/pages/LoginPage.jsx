import {Link} from "react-router-dom";
import {LoginForm} from "../components/LoginForm";
const LoginPage = ({setIsIn, setIsAdmin}) => {

    return (
        <div>
            <LoginForm setIsIn={setIsIn} setIsAdmin={setIsAdmin}/>
        </div>
    );

}

export {LoginPage};
