import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = (props) => {
  const navigate = useNavigate();
  const [signUpCredentials, setsignUpCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(signUpCredentials);
    const url = `http://localhost:5000/api/auth/createUser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNzdjYzAyMTg1OThiYTY1OTAyMWNiIn0sImlhdCI6MTY0ODIxMjE3N30.8brQ1CkIN07zepsE172oRawjwkrN33UUWeTQkYjDBrI"
      },
      body: JSON.stringify({
        name: signUpCredentials.name,
        email: signUpCredentials.email,
        password: signUpCredentials.password
      })
    });
    const json = await response.json();
    if (json.success) {
      //redirect
      props.showAlert("Account created. Welcome to your CloudNote Dashborad","success");
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials.","danger");
    }
  };

  const onChange = e => {
    setsignUpCredentials({
      ...signUpCredentials,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="name"
            minLength={3}
            required
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            Make sure to have a uniquie Username.
          </div>
        </div>
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
            required
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Create Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            minLength={5}
            required
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Register
        </button>
        <div className="my-2">
          Already have an account?{" "}
          <Link to="/login">Log into your account</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
