import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginForm = ({setIsIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [hasAnAccount, setHasAnAccount] = useState(false);
    const navigate = useNavigate();

    const onLogIn = (e) => {
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

    const onSignIn = (e) => {
        const validate = async () => {
            e.preventDefault();
            const claims = {
                firstName,
                lastName,
                email,
                password
            };

            let res = await fetch("/api/user", {
                body: JSON.stringify(claims),
                method: "POST",
                header: "Content-Type: application/json"

            });
            
            let data = await res.json();


            if (data.success) {
                navigate("/login");
            } else {
                data.error === "createUser: UNIQUE constraint failed: users_v.email" ? setError("this email already exists") :
                setError(data.error)
            }
        }
        validate();
        setHasAnAccount(true);
    }

    if (hasAnAccount) {
    return (
        <div className="bg-zinc-900  flex  h-screen justify-center ">
            <div className="bg-zinc-800 p-15 absolute max-h-xl mt-20">
                <form onSubmit={onLogIn} className="mt-4 min-w-xl">
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
                            <p className="text-red-500 mx-10 text-center">{error}</p>    
                        </div>
                        <div className="flex-box flex-row space-x-4">
                                <label onClick={()=>setHasAnAccount(false)} className="text-blue-600 text-xl hover:text-blue-800 transition-colors duration-200 ">Dont have an account?</label>
                            <button type="submit" className="text-blue-600 font-semibold text-xl hover:text-blue-800 transition-colors duration-200 ">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

    } else {

    return (
        <div className="bg-zinc-900  flex  h-screen justify-center ">
            <div className="bg-zinc-800 p-15 absolute max-h-xl mt-20">
                <form onSubmit={onSignIn} className="mt-4 min-w-xl">
                    <div className="grid grid-cols-1 gap-7">
                    <h1 className="text-5xl font-semibold text-white text-center">Sign In</h1>
                    <div className="mx-10 ">
                        <input 
                            type="text"
                            id="lastName"
                            name="firstName"
                            className="border border-gray-300 text-gray-300 w-full py-2 px-3 mb-2 mt-2"
                            placeholder="Enter you first name here: "
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mx-10 ">
                        <input 
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="border border-gray-300 text-gray-300 w-full py-2 px-3 mb-2 mt-2"
                            placeholder="Enter you second name here: "
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
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
                            <p className="text-red-500 mx-10 text-center">{error}</p>    
                        </div>
                        <div className="flex-box flex-row space-x-4">
                                <label onClick={()=>setHasAnAccount(true)} className="text-blue-600 text-xl hover:text-blue-800 transition-colors duration-200 ">Have an account?</label>
                            <button type="submit" className="text-blue-600 font-semibold text-xl hover:text-blue-800 transition-colors duration-200 ">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
    }


}

export {LoginForm};
