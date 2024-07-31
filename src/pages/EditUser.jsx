import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import studentUrl from "./urls";

const initialState = {
  name: "",
  email: "",
  level: "",
};

function EditUser() {
  const [initState, setInitState] = useState(initialState);
  const { name, email, level } = initState;
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`${studentUrl}/student/${id}`);
    if (response.status === 200) {
      setInitState({ ...response.data });
      
    }
  };

  const history = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInitState({ ...initState, [name]: value });
  };

  const adStudent = async (data) => {
    const res = await axios.post(`${studentUrl}/student`, data);
    if (res.status === 200) {
      toast.success(res.data, { theme: "colored" });
    } else {
      toast.error("something went wrong");
    }
  };
  const updateUser = async (data, id) => {
    const res = await axios.put(`${studentUrl}/student/${id}`, data);
    if (res.status === 200) {
      toast.success('User updated', { theme: "colored" });
    } else {
      toast.error("something went wrong");
    }
  };
  const submitMain = (e) => {
    e.preventDefault();
    try{if (!name || !email || !level) {
      toast.error("Please fill all entries", { theme: "colored" });
    } else {
      if (!id) {
        adStudent(initState);
      }else{
        updateUser(initState, id)
      }

      history("/");
    }} catch(err){
      toast.error(err)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "80svh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Edit User Details</h2>
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
          />
        </div>
        <div style={{ margin: "5px" }}>
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
        <input type="submit" value={id ? "Update" : "Add"} className="submit" />
      </form>
    </div>
  );
}

export default EditUser;
