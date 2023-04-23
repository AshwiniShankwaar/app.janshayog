import { useEffect, useState } from "react";
import "./requestShow.css";
import SearchBar from "./searchbar/SearchBar.js";
import Request from "../../task/getTask/request/Request.js";

const RequestShow = () => {
  const accountId = sessionStorage.getItem("AccountId");
  const [requestList, setRequestList] = useState([]);

  const fetchOpenRequests = () => {
    fetch(`http://localhost:8080/api/request/openRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setRequestList(res.reverse());
      });
  };

  const fetchRequestsBySkill = (skill) => {
    fetch(`http://localhost:8080/api/request/${skill}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setRequestList(res.reverse());
      });
  };

  useEffect(() => {
    if (accountId !== null || accountId !== undefined) {
      fetchOpenRequests();
    }
  }, [accountId]);

  const handleSearchBySkill = (skill) => {
    fetchRequestsBySkill(skill)
  };

  return (
    <>
      <div id="dashboardMain">
        <div id="seachBar">
          <h1>Search request by your skills.</h1>
          <SearchBar handleSearchBySkill={handleSearchBySkill} />
        </div>
        <div className="requestShow">
        { requestList.length===0?(<p>No request found</p>):( 
          requestList.map((request,index) => {
            return <div id="request" key={index}><Request request={request} /></div>;
          })
        )}
        </div>
      </div>
    </>
  );
};


export default RequestShow;
