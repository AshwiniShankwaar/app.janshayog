import { useState } from "react";
import "./currentTask.css";
import HelperAssign from "./helperAssign/HelperAssign.js";
import UpdateTask from "./updateTask/UpdateTask.js";
import jsPDF from 'jspdf';
const CurrentTask = (props) => {
  console.log(props);
  const [updatePopup,setUpdatePopup] = useState(false);
  const [otpShow,setOtpShow] = useState(false);
  const [otp,setOtp] = useState(null);
  const [generateOtp,setGenerateOtp] = useState(false);
  if (!props.request) {
    return <div>Loading...</div>;
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('JanShayog', 10, 20);
    doc.setFontSize(12);
    doc.text('describe ', 10, 25);
    // Add underline
    doc.setLineWidth(0.5);
    doc.line(10, 35, pageWidth - 10, 35);

    // Add content
    const content = [
      { label: 'Request Id:', value: props.request.request.id },
      { label: 'Request Title:', value: props.request.request.taskId.title },
      { label: 'Required Skills:', value: props.request.request.taskId.skills },
      { label: 'Amount to be paid:', value: `${props.request.request.taskId.amount} rs.` },
      {
        label: 'Number of peoples:',
        value: props.request.request.taskId.numberOfPeople,
      },
      { label: 'Time period:', value: props.request.request.taskId.timePeriod },
      { label: 'Date:', value: props.request.request.taskId.date },
      { label: 'Time:', value: props.request.request.taskId.time },
      { label: 'Location:', value: props.request.request.taskId.address },
      { label: 'Description:', value: props.request.request.taskId.description },
      {
        label: 'Request Registration Date:',
        value: props.request.request.date,
      },
      {
        label: 'Request Registration Time:',
        value: props.request.request.time,
      },
      { label: 'Request Status:', value: props.request.request.requestStatus },
      { label: 'Payment Status:', value: props.request.request.payment.status },
    ];

    let currentY = 50;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    content.forEach(({ label, value }) => {
      doc.text(`${label} ${value}`, 10, currentY);
      currentY += 10;
    });

    doc.text("To view Helper assigned in request login to your account ", 10, currentY);
    // Add footer
    doc.setLineWidth(0.5);
    doc.line(10, doc.internal.pageSize.getHeight() - 10, pageWidth - 10, doc.internal.pageSize.getHeight() - 10);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleString() ,  20, doc.internal.pageSize.getHeight() - 5);
    doc.text('Page 1', pageWidth - 20, doc.internal.pageSize.getHeight() - 5);

    doc.save(`Request_${props.request.request.id}.pdf`);
  };
  const handleDownload = () => {
    generatePDF();
  };
  const handleComplete = () => {
    console.log("Complete");
    setOtpShow(!otpShow);
  };
  const handleDelete = () => {
    if(props.request.request.helperAssignments.length===0){
        fetch(`http://localhost:8080/api/request/deleteRequest?requestId=${props.request.request.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
            console.log(response);
             alert("Request deleted successfully");
        }).then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }
  const handleUpdatePopup = () => {
    setUpdatePopup(!updatePopup);
  }
  const handleCancel = () => {
    setOtpShow(!otpShow);
    setGenerateOtp(false);
    window.location.reload();
  };
  const fetchOtp = ()=>{
    return fetch(`http://localhost:8080/api/request/requestComplete?requestId=${props.request.request.id}`)
    .then((response) => {
      return response.json();
    })
    .then((response) =>{
      console.log(response);
      setOtp(response.message);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const handleGenerateOtp = () => {
    fetchOtp().then(()=>{
      setGenerateOtp(true);
    })
  }
  return (
    <div id="currentTask">
      <div><h1>Request Details</h1><i className="fa-solid fa-pen" onClick={handleUpdatePopup}></i></div>
      {updatePopup&&(
      <div className="updatePopUp">
        <UpdateTask request={props.request} handleClose={handleUpdatePopup}/>
        </div>
        )}
      <p>
        <label>Request Id:</label> {props.request.request.id}
      </p>
      <p>
        <label>Request Title:</label> {props.request.request.taskId.title}
      </p>

      <p>
        <label>Required Skills:</label> {props.request.request.taskId.skills}
      </p>
      <p>
        <label>Amount to be paid:</label> {props.request.request.taskId.amount}{" "}
        rs.
      </p>
      <div className="gap">
        <p>
          <label>Number of peoples:</label>{" "}
          {props.request.request.taskId.numberOfPeople}
        </p>
        <p>
          <label>Time period:</label> {props.request.request.taskId.timePeriod}
        </p>
      </div>
      <div className="gap">
        <p>
          <label>Date:</label> {props.request.request.taskId.date}
        </p>
        <p>
          <label>Time:</label> {props.request.request.taskId.time}
        </p>
      </div>
      <p>
        <label>Location:</label> {props.request.request.taskId.address.replace(/\\/g, ' ')}
      </p>
      <p>
        <label>Description:</label> {props.request.request.taskId.description}
      </p>
      <div className="gap">
        <p>
          <label>Request Registration Date:</label> {props.request.request.date}
        </p>
        <p>
          <label>Request Registration Time:</label> {props.request.request.time}
        </p>
      </div>
      <p>
        <label>Request Status:</label> {props.request.request.requestStatus}
      </p>
      <p>
        <label>Payment Status:</label> {props.request.request.payment.status}
      </p>
      <h1>Helper Assigned</h1>
      <div id="helperAssignedCurrentTask">
      {
        props.request.request.helperAssignments.length===0 ? (
          <p>Helper not assigned yet</p>
        ) : (
           props.request.request.helperAssignments.map((assignment,index) => {
            console.log(assignment);
            return <HelperAssign key={index} accountId={assignment.accountId} />;
          })
        )
      }
      </div>
      <div id="buttonCompleteTask">
        <button onClick={handleDownload} className="buttonTask">Download</button>
        <button className=
        {
            props.request.request.requestStatus==="underProcessing"?"buttonShow buttonTask":"buttonHide buttonTask"
        } onClick={handleComplete}>Complete
        </button>
        {otpShow && (
          <div className="popup flexSetPopUp">
            <p>Does your request get completed?<br/>if, Yes then generate OTP to verify.</p>
            {generateOtp?<p>Your OTP is: {otp}</p>:""}
            <div className="button-container">
            <button onClick={handleGenerateOtp} id="deactivateButton">
                      Generate OTP
                    </button>
              <button
                className="cancelButton"
                onClick={handleCancel}
                id="deactivateButton"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      <button className={props.request.request.helperAssignments.length===0?
        "buttonShow buttonTask":"buttonHide buttonTask"} onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
};
export default CurrentTask;
