import "./balance.css";
import AddBalance from "../addBalance/AddBalance.js";
import Withdraw from "../withdraw/Withdraw.js";
import { useState} from "react";
const Balance = (props) => {
  const wallet = props.wallet;
  const [addPopUp,setAddPopUp] = useState(false);
  const [withdrawPopUp,setWithdrawPopUp] = useState(false);
  console.log(wallet);

  const handleAddBalancePopUp = ()=>{
    if(withdrawPopUp){
      setWithdrawPopUp(false);
      setAddPopUp(true);
    }
    else{
      setAddPopUp(true);
    }
  }
  const handleWithdrawPopUp = ()=>{
    if(addPopUp){
      setAddPopUp(false);
      setWithdrawPopUp(true);
    }
    else{
      setWithdrawPopUp(true);
    }
  }


return (
    <div className="balance-container">
      <h1>Available Balance</h1>

          <p className="balance-walletId">Wallet id: {wallet.walletId}</p>
          <div className="balance">
            <p>{wallet.balance} Rs.</p>
          </div>
          <div className="balance-button">
            <button onClick={handleAddBalancePopUp}>Add Balance</button>
            <button onClick={handleWithdrawPopUp}>Widthdraw</button>
          </div>
          {
            addPopUp && (
              <AddBalance 
              handleClose={() => setAddPopUp(false)} 
              updateWallet={props.updateWallet}
              />
            )
          }{
            withdrawPopUp && (
              <Withdraw handleClose={()=>setWithdrawPopUp(false)}
              updateWallet={props.updateWallet}/>
            )
          }
    </div>
  );
};
export default Balance;
