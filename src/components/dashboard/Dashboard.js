import "./dashboard.css";
import Navbar from "../navbar/Navbar.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RequestRegister from "../Request/requestRegister/RequestRegister.js";
import RequestShow from "../Request/requestShow/RequestShow.js";
import Balance from "../Wallet/balance/Balance.js";
import Ongoing from "../Request/ongoing/Ongoing";
import OpenRequest from "../Request/openRequest/OpenRequest.js";
import CompleteTask from "../Request/completed/CompleteTask";
const Dashboard = () => {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  let accountId = querySearch.get("accountId");

  function logout() {
    sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
  }

  if (accountId === null) {
    if (sessionStorage.getItem("AccountId") !== null) {
      accountId = sessionStorage.getItem("AccountId");
    } else {
      logout();
      toast.error("Please login to continue");
      window.location.href = "/";
    }
  }
  //const [accountCheck,setAccountCheck] = useState();
  function checkAccount() {
    fetch(`http://localhost:8080/api/account/user?accountId=${accountId}`, {
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
        //if account available then open dashboard else send to login and toast that account doesn't exit
        // if(res.message === "not verified"){

        //     toast.error("Please verify your account");
        //     window.location.href="/login/"+sessionStorage.getItem("AccountType");
        // }else
        if (res.message === "profile") {
          //toast.error("Please enter you details");
          window.location.href = "/editProfile";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    checkAccount();
  });

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="dashboard">
      <Navbar />

      <div id="dashboard">
     
        {sessionStorage.getItem("AccountType") === "requester" ? (
          <RequestRegister />
        ) : (
          <RequestShow />
        )}

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
        <div className="dashboard-box">
            <OpenRequest />
        </div>
        <div className="dashboard-box">
            <Ongoing />
        </div>
        <div className="dashboard-box">
            <CompleteTask />
        </div>
      </div>
      </div>
    </div>
  );
};
export default Dashboard;
