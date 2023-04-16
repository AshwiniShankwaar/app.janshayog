import { useEffect } from "react";

function ServerHome(){
    useEffect(()=>{
        sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
        window.location.href = "https://janshayog.azurewebsites.net";
    })

}
export default ServerHome;