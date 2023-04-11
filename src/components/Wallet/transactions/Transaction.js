import "./transaction.css";
import Navbar from "../../navbar/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Balance from "../balance/Balance.js";
import TransactionData from "../transaction/Transaction.js";
import CompleteTask from "../../Request/completed/CompleteTask";
const Transaction = () => {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  let walletId = querySearch.get("walletId");

  const transactionsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/wallet/${walletId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        //console.log(data.wallet);
        await setWallet(data.wallet);
        await setTransactions(data.wallet.transaction.reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchdata();
  }, [walletId]);

  useEffect(() => {
    if (wallet !== null) {
      //console.log(wallet);
      setLoading(false);
    }
  }, [wallet]);
  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div>
      <Navbar />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div id="transaction">
          <div id="transaction-container" className="transaction-container">
            <h1>Previous Transactions</h1>

            {currentTransactions.map((transaction, index) => (
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

            <div className="pagination-buttons">
              {currentPage > 1 && (
                <button onClick={handlePrevClick}>Previous</button>
              )}
              {currentPage < totalPages && (
                <button onClick={handleNextClick}>Next</button>
              )}
            </div>
          </div>
          <div id="transtionSideBar">
            <div id="balanceSidebar">
              <Balance wallet={wallet} updateWallet={setWallet} isSideBar={false}/>
            </div>
            <div className="ongoing-task">
            <CompleteTask />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
