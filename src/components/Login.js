import React, { useState } from "react";
import {useNavigate,Link} from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNzdjYzAyMTg1OThiYTY1OTAyMWNiIn0sImlhdCI6MTY0ODIxMjE3N30.8brQ1CkIN07zepsE172oRawjwkrN33UUWeTQkYjDBrI"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    if(json.success){
        //redirect
        props.showAlert("Welcome back to your CloudNote Dashborad","success");
        localStorage.setItem('token',json.authToken);
        navigate("/");

    }else{
      
      props.showAlert("Oops, Looks like you forgot something.","danger");
    }
  };

  const onChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container px-5 mx-6">
      <form className="px-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-success">
          Log In
        </button>
        <div className="my-2">
          New to the site? <Link to="/signup">Create new account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
