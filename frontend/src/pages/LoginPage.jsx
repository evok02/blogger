import {Link} from "react-router-dom";
import {LoginForm} from "../components/LoginForm";
const LoginPage = ({setIsIn}) => {
    console.log(typeof(setIsIn))

    return (
        <div>
            <LoginForm setIsIn={setIsIn}/>
        </div>
    );

}

export {LoginPage};
