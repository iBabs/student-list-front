import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Register() {
  const [fornData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...fornData,
      [name]: name === "isAdmin" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4190/user/register",
        fornData
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("User created", { theme: "colored" });
        dispatch({ type: "LOGIN", payload: response.data });
      } else {
        toast.error("something went wrong");
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error, { theme: "colored" });
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  const { first_name, last_name, email, password, isAdmin } = fornData;

  return (
    <div className="contain">
      <h1>REGISTER</h1>
      <p className="words">
        Welcome to our Application where we solve real life porblems
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inp-cont">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="first name"
            required
            value={first_name}
            onChange={handleChange}
          />
        </div>
        <div className="inp-cont">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="last name"
            required
            value={last_name}
            onChange={handleChange}
          />
        </div>
        <div className="inp-cont">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
            required
            value={email}
            onChange={handleChange}
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
              onChange={handleChange}
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
        <div className="inp-cont">
          <label htmlFor="isAdmin">Admin</label>
          <select
            name="isAdmin"
            id="isAdmin"
            value={isAdmin}
            onChange={handleChange}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
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
            "Register"
          )}
        </button>
        <p>
          Already have an account with us? <Link to="/login">Login in </Link>
        </p>
        <div> {error && <p className="error">{error}</p>}</div>
      </form>
    </div>
  );
}

export default Register;
