import './withdraw.css';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Withdraw = (props)=>{
        const [isLoading, setIsLoading] = useState(false);
        const accountId = sessionStorage.getItem("AccountId");
        const [amount, setAmount] = useState(null);
        const reason = amount +" amount is withdraw from account " + accountId;
        const [currentTransactionDetails, setCurrentTransactionDetails] = useState();
      
        const transaction = async (obj) =>{
          try{
            const fetchData = await fetch(`http://localhost:8080/api/wallet/transaction`,{
            method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
          })
          const res = await fetchData.json();
          //console.log(res.wallet.transaction.length);
          await setCurrentTransactionDetails(res.wallet.transaction[res.wallet.transaction.length - 1]);
          props.updateWallet(res.wallet);
          toast.success(`Amount ${amount} withdraw from wallet`);
          }catch(error){
            toast.error("Error while withdrawing amount.")
            console.log(error);
          }
        }
      
        const performTransaction = (event) => {
          event.preventDefault();
          setIsLoading(true);
      
          let obj = {
            accountId: accountId,
            amount: amount,
            reason: reason,
            isDebit: true,
          };
          //console.log(obj);
          transaction(obj);
        };
        useEffect(()=>{
          setIsLoading(false);
        },[currentTransactionDetails,props])
        //window.addEventListener("click",()=>setIsLoading(false));
        const handleCancelButton=(event)=>{
          event.preventDefault();
          setIsLoading(false);
        }
        return (
          <div className="addBalance">
            <h2>Withdraw Amount</h2>
            <label htmlFor="amount">Enter amount you want to withdraw from wallet.</label>
            <input
              type="text"
              placeholder="Enter amount"
              name="amount"
              value={amount||""}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <div id="balanceButton">
              <button onClick={performTransaction}>Withdraw</button>
              <button onClick={props.handleClose}>Close</button>
            </div>
            {isLoading && (
              <div id="loader">
                  <h2>Alert</h2>
                  <p>Request for Withdraw amount {amount} is made wait till request complete.</p>
                <svg viewBox="25 25 50 50" className="svg">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
                <p>Loading.....</p>
                <button onClick={handleCancelButton}>Cancel</button>
              </div>
            )}
          </div>
        );
}
export default Withdraw;