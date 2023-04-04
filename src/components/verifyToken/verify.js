import { useLocation} from "react-router-dom";
import './verify.css';
const Verify =() =>{
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message');
  sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
  const handleClick = () =>{
    window.location.href = "http://localhost:3001/";
  }
   if(message==="invalidToken"){
       return (
       <div id="VerificationMessage">
        <h1>Account Verification</h1>
        <p> Provided token is invalied. Please check your mail for right verification 
            link or contact us to generate new verification token</p>
        Contact us at: 
        </div>
        )
   }else if(message==="verified"){
    return (
        <div id="VerificationMessage">
        <h1>Account Verification</h1>
        <p> Your account is now verified. click the button to redirect to the login page.</p>
        <button onClick={()=>{handleClick()}}>Log in</button>
        </div>
         )
   }
}
export default Verify;