import "./getTask.css";
import Navbar from "../../navbar/Navbar.js";
import Balance from "../../Wallet/balance/Balance.js";
import Request from "./request/Request.js";
import CompleteTask from "../../Request/completed/CompleteTask.js";
import Ongoing from "../../Request/ongoing/Ongoing";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const GetTask = () => {
  const location = useLocation();
  const accountId = new URLSearchParams(location.search).get("accountId");
  const state = new URLSearchParams(location.search).get("state");
  const accountrType = sessionStorage.getItem("AccountType");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestDetails, setRequestDetails] = useState([]);
  const requestPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(requestDetails.length / requestPerPage);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/wallet/walletData?id=${accountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        //console.log(data.wallet.transaction);
        await setWallet(data.wallet);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchdata();
  }, [accountId]);

  useEffect(() => {
    if (wallet !== null) {
      //console.log(wallet);
      //   setTransactions(wallet.transaction.reverse());
      setLoading(false);
    }
  }, [wallet]);

  const fetchData = (accountId, state) => {
    const url = accountrType==="helper"?"getRequestHelper":"getRequest"
    fetch(`http://localhost:8080/api/request/${url}?accountId=${accountId}&&state=${state}`,
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

  useEffect(() => {
    if (state !== null && state !== undefined) {
      fetchData(accountId, state);
    }
  }, [accountId, state]);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * requestPerPage;
  const endIndex = startIndex + requestPerPage;
  const currentRequest = requestDetails.slice(startIndex, endIndex);
  return (
    <div>
      <Navbar />
      <div id="currentTaskMain">
        <div id="mainGetAllTask">
        {requestDetails.length===0?
        <div id="request">
            <p>No Request</p>
        </div>:
        currentRequest.map((request, index) => (
              <div id="request" key={index} className="requestDataSet">
                <Request request={request}/>
              </div>
            ))}
          <div className="pagination-buttons">
            {currentPage > 1 && (
              <button onClick={handlePrevClick}>Previous</button>
            )}
            {currentPage < totalPages && (
              <button onClick={handleNextClick}>Next</button>
            )}
          </div>
        </div>
        <div id="dashboardSideBar">
          <div className="dashboard-box">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div id="walletBalance">
                  <Balance
                    wallet={wallet}
                    updateWallet={setWallet}
                    isSideBar={false}
                  />
                </div>
              </>
            )}
          </div>
          <div className="dashboard-box">{
            state==="helperAssignment"?
          <CompleteTask />:<Ongoing /> }</div>
        </div>
      </div>
    </div>
  );
};
export default GetTask;
