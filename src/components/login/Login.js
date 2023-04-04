import "./login.css";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServerHome from "../serverhome.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useParams();
  const navigate = useNavigate();
  if (type === "helper" || type === "requester") {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // const isAlphanumeric = (password) => {
    //   const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    //   return alphanumericRegex.test(password);
    // };

    const isValid = () => {
      if (email === "" || password === "") {
        toast.warning("Please fill all the fields");
        return false;
      }
      if (!isValidEmail(email)) {
        toast.warning("Please enter a correct email");
        return false;
      }
      if (password.length < 8 || password.length > 20) {
        toast.warning(
          "Password shold be of minimum 8 character, maximum 20 character long"
        );
        return false;
      }
      // if( !isAlphanumeric(password)){
      //     toast.warning("Password should be alphanumeric means password should have one Uppercase,one lowercase and one digit ");
      //     return false;
      // }
      return true;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let email_id = email;
      let obj = { email_id, password,type };
      if (isValid()) {
        setIsLoading(true);
        console.log(obj);
        console.log(type);
        fetch("http://localhost:8080/api/account/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            setIsLoading(false);
            return res.json();
          })
          .then((res) => {
            console.log(res);
            // if (res.message !== "User not found") {
            //   sessionStorage.setItem("AccountId", res.AccountId);
            //   sessionStorage.setItem("EmailId", res.EmailId);
            //   sessionStorage.setItem("AccountType",type);
            //   toast.success("Login successful");

            //   setTimeout(() => {
            //     navigate("/dashboard?accountId=" + res.AccountId);
            //   }, 3000);
            // }else{
            //   toast.error("Login failed "+res.message);
            // }

            if(res.message === "User not found"){
              toast.error("Login failed "+res.message);
            }else if(res.message === "Not_Verified"){
              toast.error("Account not verified, Please verify before logging in.");
            }else{
              sessionStorage.setItem("AccountId", res.AccountId);
              sessionStorage.setItem("EmailId", res.EmailId);
              sessionStorage.setItem("AccountType",type);
              toast.success("Login successful");

              setTimeout(() => {
                navigate("/dashboard?accountId=" + res.AccountId);
              }, 3000);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Login Failed " + err.message);
          });
      }
    };
    return (
      <>
        <div id="login">
          <form className="form" onSubmit={handleSubmit}>
            <span className="title">Sign In</span>
            <span className="sub mb">Enter your email and password</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input"
              placeholder="Password"
            />
            <span className="sub">
              Don't have an account ?{" "}
              <Link to="/register" replace>
                Sing Up
              </Link>
            </span>
            <button type="submit">Login</button>
            <span className="sub">
              Forgot Password ? <Link to="/forgotPassword">Reset Password</Link>
            </span>
          </form>
          <div className={isLoading ? "loaderId" : "hide"}>
            <div className="loader"></div>
            <span className="sub">Loading.....</span>
          </div>
        </div>
      </>
    );
  } else {
    return <ServerHome />;
  }
};
export default Login;
