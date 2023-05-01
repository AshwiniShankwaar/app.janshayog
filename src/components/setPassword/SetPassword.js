import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./SetPassword.css";
import {toast} from "react-toastify";
import { BASH_URL } from "../../URL";
const SetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accountId = queryParams.get("accountId");
  const token = queryParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [repasswords, setRepasswords] = useState("");

  sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");

  const isValid =()=>{

    if (password.length < 8 || password.length > 20 ) {
        toast.warning("Password shold be of minimum 8 character, maximum 20 character long");
      return false;
    }
    // if( !isAlphanumeric(password)){
    //     toast.warning("Password should be alphanumeric means password should have one Uppercase,one lowercase and one digit ");
    //     return false;
    // }
    if (password !== repasswords) {
        toast.warning("Password and Repassword should be same");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isValid()){
        let obj = {accountId,token,password};
        setIsLoading(true);
        console.log(obj);
        fetch(`${BASH_URL}api/account/setPassword`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
        })
        .then(res=>res.json())
        .then(res=>{
          setIsLoading(false);
            if(res.success){
                toast.success(res.message);
            }else{
              toast.error(res.message);
            }
        })
    }
    
  };
  return (
    <div id="setPassword">
      <div className="card">
        <span className="card__title">Reset Password</span>
        <p className="card__content">
          Please enter your new Password make sure that password and re-password
          should be same.
        </p>
        <div className="card__form">
          <input placeholder="Example@123" type="password" value = {password} onChange={e=>setPassword(e.target.value)}/>
          <input placeholder="Example@123" type="password" value = {repasswords} onChange={e=>setRepasswords(e.target.value)}/>
          <button className="sign-up" onClick={handleSubmit}> Reset Password</button>
        </div>
        <div className={isLoading ? "loaderId" : "hide"}>
          <div className="loader"></div>
          <span className="sub">waiting.....</span>
        </div>
      </div>
    </div>
  );
};
export default SetPassword;
