import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () =>{

    const [cookies,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const Logout = () =>{
        setCookies("access_token","")
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return <div className="navbar">
        <Link to ="/">Home</Link>
        
        <Link to ="/create-receipe">Create-Receipe</Link>
        <Link to ="/saved-receipe">SavedReceipe</Link>
        {!cookies.access_token ? (<Link to ="/auth">Login/Register</Link>):<button onClick={Logout}> Logout</button>}
    </div>
}