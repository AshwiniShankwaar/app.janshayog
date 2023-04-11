import "./wallet.css";
import Navbar from "../../navbar/Navbar.js";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionData from "../transaction/Transaction.js";
import Balance from "../balance/Balance.js";
import CompleteTask from "../../Request/completed/CompleteTask";
import Ongoing from "../../Request/ongoing/Ongoing";
const Wallet = () => {
  const accountId = sessionStorage.getItem("AccountId");
  const [transactions, setTransactions] = useState([]);
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

  useEffect(()=>{
    if(wallet!==null){
      //console.log(wallet);
      setTransactions(wallet.transaction.reverse());
      setLoading(false);
    }
  },[wallet]);

  return (
    <div id="wallet">
      <Navbar />
      <div id="walletContainer">
        <div id="walletMain">
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
              <div id="walletLastTransactions">
                <label>Last Transactions</label>
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="transaction">
                    <TransactionData
                      transactionId={transaction.transactionId}
                      transactionDate={transaction.date}
                      transactionTime={transaction.time}
                      transactionReason={transaction.reason}
                      transactionIsDebit={transaction.isDebit}
                      transactionAmount={transaction.amount}
                    />
                  </div>
                ))}
                <div>
                <NavLink to={"/transaction?walletId="+wallet.walletId}>View all Transactions</NavLink>
            </div>
              </div>
            </>
          )}
        </div>
        {/* dont show sidebar when it is been previewd in mobile*/}
        <div id="walletSideBar">
          {/* <div id="underProcessTask">
            <Ongoing/>
          </div> */}
          <div id="cmpltTask">
            <CompleteTask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
