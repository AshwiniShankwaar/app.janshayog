import './completeTask.css';
import SideTaskBar from "../Task/sideTaskBar/SideTaskBar";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASH_URL } from '../../../URL';
const CompleteTask = ()=>{
    const [requestDetails, setRequestDetails] = useState(null);
    const accountId = sessionStorage.getItem("AccountId");
    const accountrType = sessionStorage.getItem("AccountType");
    const getOngoingTaskByAccountId = (id) => {
      const url = accountrType==="helper"?"getRequestHelper":"getRequest"
      fetch(
        `${BASH_URL}api/request/${url}?accountId=${id}&&state=Completed`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          setRequestDetails(res.reverse());
        });
    };
    useEffect(()=>{
      if(accountId!==null||accountId!==undefined){
          getOngoingTaskByAccountId(accountId);
      }
    },[accountId])
   
    return (
      <>
        <div id="ongoingTask">
          <h1>Completed tasks</h1>
          {requestDetails && requestDetails.length > 0 ?
      requestDetails.slice(0, 2).map((requestDetail, index) => {
          return (
              <SideTaskBar key={index} 
              id={requestDetail.id}
              title={requestDetail.taskId.title} 
              description={requestDetail.taskId.description}
              date={requestDetail.taskId.date}
              time={requestDetail.taskId.time} />
          );
      })
      : <p>No request till now</p>
  }
          <NavLink to={"/getTasks?accountId=" + accountId+"&&state=Completed"}>
            View all Transactions
          </NavLink>
        </div>
      </>
    );
  };
export default CompleteTask;