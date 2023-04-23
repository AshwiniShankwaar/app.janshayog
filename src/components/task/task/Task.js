import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../navbar/Navbar.js";
import CurrentTask from "../currentTask/CurrentTask.js";
import Ongoing from "../../Request/ongoing/Ongoing";
import CompleteTask from "../../Request/completed/CompleteTask";
import HelperCurrentTask from "../currentTaskHelper/CurrentTask.js";
const Task = () => {
  const location = useLocation();
   const requestId = new URLSearchParams(location.search).get("requestId");
   console.log(requestId);
   const [request,setRequest] = useState();

   const fetchDataByRequestId = (requestId)=>{
    fetch(`http://localhost:8080/api/request/requestData?requestId=${requestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setRequest(data));
   }
   const fetchDataByAccountId = (accountId)=>{
    fetch(`http://localhost:8080/api/request/latestRequest?id=${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRequest(data);
        console.log(data);
      });
   }
  useEffect(() => {
    
    if (requestId !== null) {
      fetchDataByRequestId(requestId);
    }else{
      fetchDataByAccountId(sessionStorage.getItem("AccountId"));
    }
  }, [requestId]);

  return <>
  <div>
    <Navbar/> 
    <div id="currentTaskMain">
    {
        sessionStorage.getItem("AccountType")==="helper"?(
          <HelperCurrentTask requestId={requestId}/>
        ):<CurrentTask request={request}/>
      }
      
      
      <div id="dashboardSideBar">
        <div className="dashboard-box">
            <Ongoing />
        </div>
        <div className="dashboard-box">
            <CompleteTask />
        </div>
      </div>
    </div>
    </div>
    </>;
};
export default Task;
