import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Add.css";
import studentUrl from "./urls";
import { AuthContext } from "../context/AuthContext";

const initialState = {
  name: "",
  email: "",
  level: "",
  profile: null,
};

function AddUser() {
  const [initState, setInitState] = useState(initialState);
  const { name, email, level, profile } = initState;

  const history = useNavigate();

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInitState({ ...initState, [name]: value });
  };

  const handleFileChange = (e) => {
    setInitState({ ...initState, profile: e.target.files[0] }); // Handle file input
  };

  const adStudent = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("level", data.level);
    formData.append("profile", data.profile);
    try{
    const res = await axios.post(`${studentUrl}/student`, formData, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    if (!user.isAdmin) {
      toast.error("You are not authorized to add student", {
        theme: "colored",
      });
      return;
    }
    if (res.status === 200 || res.status === 201) {
      toast.success("User created", { theme: "colored" });
    } else {
      toast.error("something went wrong");
    }}catch(error){
      toast.error(error.response.data.message, { theme: "colored" });
    }
  };
  const submitMain = (e) => {
    e.preventDefault();
    try {
      if (user.isAdmin) {
        adStudent(initState);
        // history("/");

      } else {
        toast.error("You are not authorized to add student", {
          theme: "colored",
        });
      }
        
      
    } catch (error) {
      console.log(error.data.response.message);
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
      <form
        onSubmit={submitMain}
        style={{
          border: "solid 1px grey",
          padding: "15px",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <div style={{ margin: "5px" }}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={name}
            required
          />
        </div>
        <div style={{ margin: "5px" }}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profile">Profile Picture</label>
          {/* set file limit */}
          <br />
          <input
            type="file"
            id="profile"
            name="profile"
            onChange={handleFileChange}
            
            required
          />
        </div>
        <div style={{ margin: "5px" }}>
          <label htmlFor="level">Level</label>
          <br />
          <select id="level" name="level" onChange={handleChange} value={level} required>
            <option value="">Select level</option>
            <option value="100-level">100 Level</option>
            <option value="200_level">200 Level</option>
            <option value="300_level">300 level</option>
            <option value="400_level">400 level</option>
            <option value="500_level">500 level</option>
          </select>
        </div>
        <input
          type="submit"
          value="Add"
          className="submit"
          disabled={user ? false : true}
        />
      </form>
    </div>
  );
}

export default AddUser;
