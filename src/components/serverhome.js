import { useEffect } from "react";
import { LANDING_URL } from "../URL";
function ServerHome() {
  useEffect(() => {
    sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
    window.location.href = `${LANDING_URL}`;
  });
}
export default ServerHome;
