import "./register.css";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServerHome from "../serverhome.js";
import { BASH_URL } from "../../URL";
const Register = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  sessionStorage.removeItem("AccountId");
    sessionStorage.removeItem("AccountType");
    sessionStorage.removeItem("EmailId");

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
      if (email === "" || password === "" || rePassword === "") {
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
      if (password !== rePassword) {
        toast.warning("Password and Repassword should be same");
        return false;
      }
      return true;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let emailAddress = email;
      let accountType = type;
      let obj = { emailAddress, password, accountType };
      if (isValid()) {
        setIsLoading(true);
        console.log(obj);
        console.log(type);
        fetch(`${BASH_URL}api/account/registration`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            return res.json();
            
          })
          .then((res) => {
            setIsLoading(false);
            toast.success(res.message);
            console.log(res);
            setTimeout(() => {
              navigate("/login/" + type);
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Registration Failed " + err.message);
          });
      }
    };
    return (
      <>
        <div id="register">
          <form className="form" onSubmit={handleSubmit}>
            <span className="title">Sign Up</span>
            <span className="sub mb">Create an account with your email</span>
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
            <input
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              type="password"
              className="input"
              placeholder="Re-Password"
            />

            <span className="sub">
              Already have an account ?{" "}
              <Link to={`/login/${type}`} replace>
                Sing in
              </Link>
            </span>
            <button type="submit">Register</button>
          </form>
          <div className={isLoading ? "loaderId" : "hide"}>
            <div className="loader"></div>
            <span>Loading.....</span>
          </div>
        </div>
      </>
    );
  } else {
    return <ServerHome />;
  }
};

export default Register;
