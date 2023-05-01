import './currentTask.css';
import { useEffect, useState } from 'react';
import ShowTask from './showTask/ShowTask.js';
import { BASH_URL } from '../../../URL';
const HelperCurrentTask = (props) => {
  const requestId = props.requestId;
  const [request, setRequest] = useState(null);
  const [present, setPresent] = useState(false);

  const fetchDataByRequestId = (requestId) => {
    fetch(`${BASH_URL}api/request/requestData?requestId=${requestId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setRequest(data));
  };
  const fetchDataByAccountId = (accountId)=>{
    fetch(`${BASH_URL}api/request/getLatestRequestHelper?accountId=${accountId}`, {
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

  useEffect(() => {
    if (request !== null) {
      const isHelperAssigned = request.request.helperAssignments.some(
        (assignment) => {
            // console.log(typeof(assignment.accountId) +" "+
            // typeof(parseInt(sessionStorage.getItem("AccountId"))));
            return assignment.accountId === parseInt(sessionStorage.getItem("AccountId"))}
      );
      
      setPresent(isHelperAssigned);
    }
  }, [request]);  
  return (
    <ShowTask request={request} present={present} />
  );
};

export default HelperCurrentTask;
