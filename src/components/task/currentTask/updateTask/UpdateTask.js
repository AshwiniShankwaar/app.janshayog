import "./updateTask.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const UpdateTask = (props) => {
  const request = props.request.request;
  const accountId = sessionStorage.getItem("AccountId");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [street, setStreet] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [noPeople, setNoPeople] = useState("");
  const [skills, setSkills] = useState("");
  const [payableAmount, setPayableAmount] = useState(null);
  const [description, setDescription] = useState("");
  console.log(request);
  const [address, setAddress] = useState("");
  const [object,setObject] = useState(null);
  useEffect(() => {
    if (request !== null) {
      setTitle(request.taskId.title);
      setDate(request.taskId.date);
      setTime(request.taskId.time);
      setAddress(request.taskId.address);
      setTimePeriod(request.taskId.timePeriod);
      setNoPeople(request.taskId.numberOfPeople);
      setSkills(request.taskId.skills);
      setPayableAmount(request.taskId.amount);
      setDescription(request.taskId.description);
    }
  }, [request]);
  useEffect(() => {
    if (address != null) {
      const addressArray = address.split("/");
      console.log(addressArray);
      setStreet(addressArray[0]);
      setAddressLine1(addressArray[1]);
      setDistrict(addressArray[2]);
      setState(addressArray[3]);
      setZip(addressArray[4]);
      setCountry(addressArray[5]);
    }
  }, [address]);

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
      legal: request.taskId.legal,
      agree: request.taskId.agreed,
    };
    return object;
  };

  useEffect(()=>{
    if(object!==null){
      console.log(object);
      fetch(`http://localhost:8080/api/request/updateRequest?requestId=${request.id}`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
      })
      .then((res) => {
        return res.json();
      })
      .then((res)=>{
        console.log(res);
        if(res.message==="updated"){
          toast.success("Request updated successfully with request id "+res.request.id);
            console.log(res);
            setTimeout(() => {
              //navigate("/task?requestId="+res.request.id);
              window.location.href = "/task?requestId="+res.request.id;
            }, 3000);
        }else{
          toast.error("Request not updated");
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[object]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setObject(objCreate());
  };
  return (
    <>
      <div id="updateTaskTitle">
        <h2>Edit your Request details</h2>
        <i
          className="fa-sharp fa-solid fa-xmark"
          onClick={props.handleClose}
        ></i>
      </div>
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
          <label htmlFor="zip">Pincode: </label>
          <input
            type="text"
            name="zip"
            value={zip || ""}
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </div>
        <div className="div"></div>
        <div className="div">
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
          <label htmlFor="timePeriod">Time period:</label>
          <input
            type="text"
            name="timePeriod"
            placeholder="1hrs/1day "
            value={timePeriod || ""}
            onChange={(e) => {
              setTimePeriod(e.target.value);
            }}
            id="smallinput"
          />
          <label htmlFor="noPeople">Number of people:</label>
          <input
            type="number"
            name="noPeople"
            placeholder="2"
            value={noPeople || ""}
            onChange={(e) => {
              setNoPeople(e.target.value);
            }}
            id="smallinput"
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
            The amount will be transferd to server and will be paid to helper
            once the task is finised else it will be re added to same wallet.
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
        <button>Submit</button>
      </form>
    </>
  );
};
export default UpdateTask;
