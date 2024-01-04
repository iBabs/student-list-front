import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Add.css'

const initialState = {
  name: "",
  email: "",
  level: "",
};

function AddUser() {
  const [initState, setInitState] = useState(initialState);
  const { name, email, level } = initState;

  const history = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInitState({ ...initState, [name]: value });
  };
  const adStudent = async (data) => {
    const res = await axios.post("https://students-details.vercel.app/user", data);
    if (res.status === 200 || res.status === 201) {
      toast.success("User created", {theme: 'colored'});
    } else {
      toast.error("something went wrong");
    }
  };
  const submitMain = (e) => {
    e.preventDefault();
    if (!name || !email || !level) {
      toast.error("Please fill all entries",{theme: 'colored'});
    } else {
      adStudent(initState);
      history("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80svh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={submitMain}
        style={{
          border: "solid 1px grey",
          padding: "15px",
          margin:'auto',
          borderRadius: '10px'
        }}
      >
        <div style={{margin:'5px'}}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={name}
          />
        </div>
        <div style={{margin:'5px'}}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div style={{margin:'5px'}}>
          <label htmlFor="level">Level</label>
          <br />
          <select id="level" name="level" onChange={handleChange} value={level}>
            <option value="">Select level</option>
            <option value="100-level">100 Level</option>
            <option value="200_level">200 Level</option>
            <option value="300_level">300 level</option>
            <option value="400_level">400 level</option>
            <option value="500_level">500 level</option>
          </select>
        </div>
        <input type="submit" value="Add" className="submit" />
      </form>
    </div>
  );
}

export default AddUser;
