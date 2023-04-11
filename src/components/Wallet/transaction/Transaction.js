import './transaction.css';
const Transaction=(props)=>{
    const transactionId = props.transactionId;
    const Date = props.transactionDate;
    const Time = props.transactionTime;
    // const Reason = props.transactionReason;
    const isDebit = props.transactionIsDebit;
    const amount = props.transactionAmount;
    return(
        <p >
                <span><label>Transactions Id: </label> {transactionId}</span>
                <span><label>Date: </label> {Date}</span>
                <span><label>Time: </label>{Time}</span>
                {/* <span><label>Reason: </label>{Reason.split(' ').slice(0,5).join(' ')}{Reason.split(' ').length > 5 ? '...' : ''}</span> */}
                {isDebit ? (
                  <span><label>Debit: </label>{amount}Rs.</span>
                ) : (
                  <span><label>Credit: </label>{amount}Rs.</span>
                )}
              </p>
        )
}

export default Transaction;