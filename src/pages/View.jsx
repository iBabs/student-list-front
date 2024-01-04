import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./View.css";

function View() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://students-details.vercel.app/user/${id}`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        // console.log(error);
        toast.error("User not found", { theme: "colored" });
        setError(true);
      }
    };
    fetchData();
  }, [id]);
  if (error) {
    return (
      <div>
        <p>Error: User not found</p>
        <Link to="/">
            <button className="btn btn-view">Go back home</button>
          </Link>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80svh",
      }}
    >
      {!data ? (
        <div>
          <p>Loading...</p>
          <Link to="/">
            <button className="btn btn-view">Go back</button>
          </Link>
        </div>
      ) : (
        <div
          className="detailed"
          style={{
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          <div>View</div>
          <p>ID: {data && data._id}</p>
          <h2>Name: {data && data.name}</h2>
          <p>email: {data && data.email}</p>
          <p>level: {data && data.level}</p>
          <p> Created: {data && data.createdAt}</p>
          <p> Last Updated: {data && data.updatedAt}</p>
          <Link to="/">
            {" "}
            <button className="btn btn-view">Go back</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default View;
