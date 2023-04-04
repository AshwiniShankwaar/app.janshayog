import { useEffect } from "react";

function ServerHome(){
    useEffect(()=>{
        sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
        window.location.href = "http://localhost:3001/";
    })

}
export default ServerHome;