import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import studentUrl from "./urls";
import { RiDeleteBin6Line } from "react-icons/ri";

const Home = () => {
  const [data, setData] = useState([]);
  const stuuu = `${studentUrl}/students`
  // "https://students-details.vercel.app/students"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(stuuu);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [stuuu]);
  const deleteUser = async (id) => {
    if (window.confirm("You want to delete user?")) {
      try {
        const response = await axios.delete(`${studentUrl}/student/${id}`);
        if (response.status === 200) {
          toast.success(response.data, { theme: "colored" });
        } else {
          toast.error("Something went wrong", { theme: "colored" });
        }
      } catch (err) {
        // console.log(err);
        toast.error(err.response.data.error, { theme: "colored" });
      }
    }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h2>Students Information</h2> <Link to="/add-student" style={{color:"maroon"}}>Add student</Link>
      </div>
      <table className="st-inform">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>NO</th>
            <th style={{ textAlign: "center" }}>NAME</th>
            <th style={{ textAlign: "center" }}>eMAIL</th>
            <th style={{ textAlign: "center" }}>LEVEL</th>
            <th style={{ textAlign: "center" }}>ACTION</th>
          </tr>
        </thead>
        <tbody>
           {data.length ? (
            data.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.level}</td>
                <td>
                  <Link to={`/view/${item._id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                  <Link to={`/edituser/${item._id}`}>
                    <button className="btn btn-update">Update</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      deleteUser(item._id);
                    }}
                  >
                    <RiDeleteBin6Line/>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr colSpan="5">Loading...</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
