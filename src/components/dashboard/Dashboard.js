import "./dashboard.css";
import Navbar from "../navbar/Navbar.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Dashboard = ()=>{
    const location = useLocation();
    const querySearch = new URLSearchParams(location.search);
    let accountId = querySearch.get("accountId");

    function logout() {
        sessionStorage.removeItem("AccountId");
        sessionStorage.removeItem("AccountType");
        sessionStorage.removeItem("EmailId");
      }

    if(accountId===null){
        if(sessionStorage.getItem("AccountId")!==null){
        accountId = sessionStorage.getItem("AccountId");}else{
            logout();
        toast.error("Please login to continue");
        window.location.href="/";
        }
    }
    //const [accountCheck,setAccountCheck] = useState();
    function checkAccount(){
        fetch(`http://localhost:8080/api/account/user?accountId=${accountId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then(res=>{
            return res.json();
        }).then(res=>{
            console.log(res);
            //if account available then open dashboard else send to login and toast that account doesn't exit
            // if(res.message === "not verified"){
                
            //     toast.error("Please verify your account");
            //     window.location.href="/login/"+sessionStorage.getItem("AccountType");
            // }else 
            if(res.message === "profile"){    
                //toast.error("Please enter you details");
                window.location.href = "/editProfile";
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        checkAccount();
    });
    return(
        <div className="dashboard">
            <Navbar />
            <h1>Dashboard</h1>
        </div>
    )
}
export default Dashboard;