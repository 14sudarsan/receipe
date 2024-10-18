import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [_,setCookies]= useCookies(["access_token"])

  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();  // Prevent page refresh on form submission

    if (username.trim() !== "" && password.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();  // Parse the response from backend

        if (response.ok) {
          // Check if login was successful and navigate
          if (data.message !== "user does not exists") {
            setCookies("access_token", data.token);
            window.localStorage.setItem("userID", data.userID);
            navigate("/");  // Navigate to the homepage if login is successful
          }
        } else {
          // Backend returned an error
          if (data.message === "User does not exist") {
            alert("User does not exist. Please register first.");
          } else if (data.message === "Incorrect password") {
            alert("Incorrect password. Please try again.");
          } else if (data.message === "User already exists") {
            // Navigate to the appropriate page if the user already exists
            alert("User already exists. Navigating to the dashboard...");
            navigate("/dashboard");  // You can adjust the route here
          } else {
            alert("Login failed. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in.");
      }
    } else {
      alert("Username and password cannot be empty.");
    }
  };


      
return (<Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>)
};

  const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const[todos,setTodos]= useState([]);
    const[error,setError]= useState("");

    const onSubmit = async (event) => {
      event.preventDefault(); // Prevent form from refreshing on submit
  
      if (username.trim() !== "" && password.trim() !== "") {
        try {
          const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
  
          const data = await response.json(); // Parse the backend response
  
          if (response.ok && data.message !== "user already exists") {
            // Backend returned success, user is created
            setTodos([...todos, { username, password }]); // Add new user to list
            alert("User created successfully");
          } else {
            // Backend returned an error, handle it
            alert("user already exists give other username")
            if (data.message === "User already exists") {
              setError("User already exists. Please choose another username.");
            } else {
              setError("Unable to create user. Please try again.");
            }
          }
        } catch (error) {
          console.error("Error during registration:", error);
          setError("An error occurred during registration. Please try again.");
        }
      } else {
        setError("Username and password cannot be empty.");
      }
    };
  

    return (<Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>)
      

    
};


const Form = ({username,setUsername,password,setPassword,label,onSubmit}) =>{
  return (
    <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id ="username" value={username} onChange={(event) =>setUsername(event.target.value) }/>
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input type="password" id ="password"  value = {password} onChange={(event) =>setPassword(event.target.value) }/>
          </div>
        <button  type="submit" >{label}</button>
        </form>
      </div>

  );
}