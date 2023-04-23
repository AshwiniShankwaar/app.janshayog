import { toast } from "react-toastify";
import "./requestRegister.css";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
const RequestRegister = () => {
  // const navigate = useNavigate();
  const accountId = sessionStorage.getItem("AccountId");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [street, setStreet] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country,setCountry] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [noPeople, setNoPeople] = useState("");
  const [skills, setSkills] = useState("");
  const [payableAmount, setPayableAmount] = useState(null);
  const [description, setDescription] = useState("");
  const [legal, setLegal] = useState(false);
  const [agree, setAgree] = useState(false);
  //wallet data


  const [object,setObject] = useState(null);

  const objCreate = () => {
    let object = {
      accountId: accountId,
      title: title,
      date: date,
      time: time,
      address: street+"\\"+addressLine1+"\\"+district+"\\"+state+"\\"+zip+"\\"+country,
      timePeriod: timePeriod,
      noPeople: noPeople,
      skills: skills,
      payableAmount: payableAmount,
      description: description,
      legal: legal,
      agree: agree,
    };
    return object;
  };
  
 useEffect(()=>{
  if(object!==null){
    console.log(object);
    fetch(`http://localhost:8080/api/request/createRequest`,{
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    })
    .then((response) => {
      return response.json();
    })
    .then((res)=>{
      if(res.status==="created"){
        toast.success("Request created successfully with request id "+res.request.id);
          console.log(res);
          setTimeout(() => {
            //navigate("/task?requestId="+res.request.id);
            window.location.href = "/task?requestId="+res.request.id;
          }, 3000);
      }else{
        toast.error("Request not created");
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
},[object]);

  const handleFormSubmit =(e)=>{
    e.preventDefault();
    if(legal){
      if(agree){
        setObject(objCreate());
      }
    }
   
  }

  return (
    <>
     <div id="dashboardMain">
     <h2>Enter your Request details</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="div">
        <label htmlFor="title">Request Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter your request title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title || ""}
        />
      </div>
      <div className="div">
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          name="date"
          value={date || ""}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <label htmlFor="time">Time: </label>
        <input
          type="time"
          name="time"
          value={time || ""}
          onChange={(event) => {
            setTime(event.target.value);
          }}
        />
      </div>
      <p className="para">Address to visit</p>
      <div className="div">
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          name="street"
          placeholder="Street/Locality"
          value={street || ""}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <input
          type="text"
          name="addressLine1"
          placeholder="AddressLine1"
          value={addressLine1 || ""}
          onChange={(e) => {
            setAddressLine1(e.target.value);
          }}
        />
      </div>
      
      <div className="div">
        <label htmlFor="District">District: </label>
        <input
          type="text"
          name="District"
          value={district || ""}
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
        />
        <label htmlFor="state">State: </label>
        <input
          type="text"
          name="state"
          value={state || ""}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
        
      </div>
      <div className="div">
      <label htmlFor="zip">Pincode: </label>
        <input
          type="text"
          name="zip"
          value={zip || ""}
          onChange={(e) => {
            setZip(e.target.value);
          }}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          placeholder="country"
          value={country || ""}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </div>
      <div className="div">
        <label htmlFor="timePeriod">Time period:</label>
        <input
          type="text"
          name="timePeriod"
          placeholder="Time period "
          value={timePeriod || ""}
          onChange={(e) => {
            setTimePeriod(e.target.value);
          }}
        />
        <label htmlFor="noPeople">Number of people:</label>
        <input
          type="number"
          name="noPeople"
          placeholder="Number of people"
          value={noPeople || ""}
          onChange={(e) => {
            setNoPeople(e.target.value);
          }}
        />
      </div>
      <div id="skills" className="div">
        <label htmlFor="skills">Skills required</label>
        <input
          type="text"
          name="skills"
          placeholder="Separate the skills using , to make it easily visible to helpers"
          value={skills || ""}
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        />
      </div>
      <div className="div" id="payableAmount">
        <label htmlFor="amount">Payable Amount:</label>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={payableAmount || ""}
          onChange={(e) => {
            setPayableAmount(e.target.value);
          }}
        />
        <p className="msg">
          The amount will be transferd to server and will be paid to helper once
          the task is finised else it will be re added to same wallet.
        </p>
      </div>
      <div id="description" className="div">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
          value={description || ""}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          name="legal"
          value={legal || ""}
          onChange={(e) => {
            setLegal(!legal);
          }}
        />
        <label htmlFor="legal"> No legal activity is performed.</label>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          name="agree"
          value={agree || ""}
          onChange={(e) => {
            setAgree(!agree);
          }}
        />
        <label htmlFor="agree">
          {" "}
          Details provided are valied and i agree to the JanShayog term and
          condition.{" "}
        </label>
      </div>
      <button className="button">Submit</button>
      </form>
     </div>
    </>
  );
};
export default RequestRegister;
