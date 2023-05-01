import "./forget.css";
import {useState} from "react";
import {toast} from "react-toastify";
import { BASH_URL } from "../../URL";
const Forget =()=>{
    const [email,setEmail]=useState("");
    const [isLoading, setIsLoading] = useState(false);

    sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    const isValid = () => {
        if (email === "") {
            toast.warning("Please enter a valid email");
          return false;
        }
        if (!isValidEmail(email)) {
            toast.warning("Please enter a correct email");
          return false;
        }
        return true;
    }
    function handleClick(e){
        e.preventDefault();
        let obj = {email}
       if(isValid()){
        setIsLoading(true);
        console.log(obj);
        fetch(`${BASH_URL}api/account/forgetPassword`,{
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
                toast.success("Email sent to your email address "+ email);
            }else{
              toast.error("Email address is not registered with us");
            }
        })
       }
    }
   
    return(
        <div id="forgetPassword">
            <div className="card">
    <span className="card__title">Forgot Password</span>
    <p className="card__content">Please enter your registered email address to reset your password.</p>
    <div className="card__form">
        <input placeholder="example.gmail.com" type="email" value = {email} onChange={e=>setEmail(e.target.value)}/>
        <button className="sign-up" onClick={handleClick}> Reset Password</button>
    </div>
    <div className={isLoading?"loaderId":"hide"} >
        <div className="loader"></div>
        <span className='sub'>waiting.....</span>
        </div>
</div>

        </div>)
}
export default Forget;