import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = ({setIsIn}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const onSubmit = (e) => {
        const validate = async () => {
            e.preventDefault();
            const claims = {
                email,
                password
            };

            let res = await fetch("/api/validate?email="+claims.email, {
                body: JSON.stringify(claims),
                method: "POST",
                header: "Content-Type: application/json"

            });
            
            let data = await res.json();


            if (data.is_valid) {
                setIsIn(true);
                navigate("/");
            } else {
            data.error === "validateUser: getUserByEmail: sql: no rows in result set" ? setError("invalid email") :
                setError(data.error)
            }
        }
        validate();
    }


    return (
        <div className="bg-zinc-900  flex  h-screen justify-center ">
            <div className="bg-zinc-800 p-15 absolute max-h-xl mt-20">
                <form onSubmit={onSubmit} className="mt-4 min-w-xl">
                    <div className="grid grid-cols-1 gap-7">
                    <h1 className="text-5xl font-semibold text-white text-center">Login</h1>
                    <div className="mx-10 ">
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            className="border border-gray-300 text-gray-300 w-full py-2 px-3 mb-2 mt-2"
                            placeholder="Enter you email here: "
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mx-10 ">
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            className="border border-gray-300 text-gray-300 w-full py-2 px-3 mb-2 mt-2"
                            placeholder="Enter you password here: "
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="flex justify-between mt-7 mr-5 h"> 
                        <div className="justify-left">
                            <p className="text-red-500 mx-10">{error}</p>    
                        </div>
                        <div>
                            <button type="submit" className="text-blue-500 font-semibold text-xl over:text-blue-800 transition-colors duration-200 ">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export {LoginForm};
