import { NavLink } from "react-router-dom";
import "./request.css";
const Request = (props) => {
  console.log(props.request);
  const handleViewClick = ()=>{
    window.location.href = "/task?requestId="+props.request.id;
  }
  return (
    <>
      
        <div className="gap flexDiv">
        <p>
          <label>Request Id:</label> {props.request.id}
        </p>
        <p>
          <label>Request Title:</label> {props.request.taskId.title}
        </p>
        </div>

        <p>
          <label>Required Skills:</label> {props.request.taskId.skills}
        </p>
        <p>
          <label>Amount to be paid:</label> {props.request.taskId.amount} rs.
        </p>
        <div className="gap flexDiv">
          <p>
            <label>Number of peoples:</label>{" "}
            {props.request.taskId.numberOfPeople}
          </p>
          <p>
            <label>Time period:</label> {props.request.taskId.timePeriod}
          </p>
        </div>
        <div className="flexDiv gap">
          <p>
            <label>Date:</label> {props.request.taskId.date}
          </p>
          <p>
            <label>Time:</label> {props.request.taskId.time}
          </p>
        </div>
        <p>
          <label>Location:</label> {props.request.taskId.address.replace(/\\/g, ' ')}
        </p>
        <p>
          <label>Description:</label> {props.request.taskId.description.split(' ').slice(0,5).join(' ')}{props.request.taskId.description.split(' ').length > 5 ? '...' : ''} 
        </p>
        <NavLink onClick={handleViewClick} className="rightShift">View Request Details</NavLink>
    </>
  );
};
export default Request;
