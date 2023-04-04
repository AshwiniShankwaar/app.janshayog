import { useEffect } from "react";

function ServerHome(){
    useEffect(()=>{
        window.location.href = "http://localhost:3001/";
    })

}
export default ServerHome;