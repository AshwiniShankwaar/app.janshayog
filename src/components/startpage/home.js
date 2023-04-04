import "./home.css";
import { useNavigate, useParams } from "react-router-dom";
import ServerHome from "../serverhome.js";
const Home = () => {
  const { type } = useParams();
  // console.log(type);
  const Navigate = useNavigate();
  sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");
  const handleNavigate = (link) => {
    Navigate(link);
  }
  if (type === "login") {
    return (
      <>
        <div id="home">
          <div className="card">
            <div className="card-header">
              <h3>
                Welcome to Janshayog's <br />
                <span>Login as:</span>
              </h3>
            </div>
            <div className="card-body">
                <button className="testbutton" onClick={()=>{handleNavigate("/login/helper")}}>Helper</button>
                <button className="testbutton" onClick={()=>{handleNavigate("/login/requester")}}>Requester</button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (type === "register") {
    return (
      <>
        <div id="home">
          <div className="card">
          <div className="card-header">
              <h3>
                Welcome to Janshayog's <br />
                <span>Register as:</span>
              </h3>
            </div>
            <div className="card-body">
                <button className="testbutton" onClick={()=>{handleNavigate("/register/helper")}}>Helper</button>
                <button className="testbutton" onClick={()=>{handleNavigate("/register/requester")}}>Requester</button>
            </div>
          </div>
        </div>
      </>
    );
  }else{
    return (
      <ServerHome/>
    )
  }
};
export default Home;
