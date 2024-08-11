import React, { useContext, useState } from "react";
import "./auth.css";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4190/user/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: response.data });
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="contain">
      <h1>LOG IN</h1>
      <p className="words">
        Welcome to our Application where we solve real life porblems
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inp-cont">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inp-cont">
          <label htmlFor="password">Password:</label>
          <div className="password">
            <input
              type={see ? "text" : "password"}
              id="password"
              name="password"
              placeholder={see ? "Strong@123" : "********"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={() => {
                setSee(!see);
              }}
            >
              {see ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <button
          className="drop"
          type="submit"
          disabled={loading}
          style={{ backgroundColor: loading ? "grey" : "#cc05f4" }}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="loading" />
          ) : (
            "Login"
          )}
        </button>
        <p>
          Don't have an account yet? <Link to="/register"> Sign Up</Link>
        </p>
        <div> {error && <p className="error">{error}</p>}</div>
      </form>
    </div>
  );
}

export default Login;
