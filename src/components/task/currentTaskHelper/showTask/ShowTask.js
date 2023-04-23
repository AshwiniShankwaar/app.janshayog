import { useState } from "react";
import "./showTask.css";
import HelperAssign from "../../currentTask/helperAssign/HelperAssign.js";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
const ShowTask = (props) => {
  console.log(props);
  const [otpShow, setOtpShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [generateOtp, setGenerateOtp] = useState(false);
  const [otp, setOtp] = useState(null);
  if (!props.request) {
    return <div>Loading...</div>;
  }
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("JanShayog", 10, 20);
    doc.setFontSize(12);
    doc.text("describe ", 10, 25);
    // Add underline
    doc.setLineWidth(0.5);
    doc.line(10, 35, pageWidth - 10, 35);

    // Add content
    const content = [
      { label: "Request Id:", value: props.request.request.id },
      { label: "Request Title:", value: props.request.request.taskId.title },
      { label: "Required Skills:", value: props.request.request.taskId.skills },
      {
        label: "Amount to be paid:",
        value: `${props.request.request.taskId.amount} rs.`,
      },
      {
        label: "Number of peoples:",
        value: props.request.request.taskId.numberOfPeople,
      },
      { label: "Time period:", value: props.request.request.taskId.timePeriod },
      { label: "Date:", value: props.request.request.taskId.date },
      { label: "Time:", value: props.request.request.taskId.time },
      { label: "Location:", value: props.request.request.taskId.address },
      {
        label: "Description:",
        value: props.request.request.taskId.description,
      },
      {
        label: "Request Registration Date:",
        value: props.request.request.date,
      },
      {
        label: "Request Registration Time:",
        value: props.request.request.time,
      },
      { label: "Request Status:", value: props.request.request.requestStatus },
      { label: "Payment Status:", value: props.request.request.payment.status },
    ];

    let currentY = 50;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    content.forEach(({ label, value }) => {
      doc.text(`${label} ${value}`, 10, currentY);
      currentY += 10;
    });

    doc.text(
      "To view Helper assigned in request login to your account ",
      10,
      currentY
    );
    // Add footer
    doc.setLineWidth(0.5);
    doc.line(
      10,
      doc.internal.pageSize.getHeight() - 10,
      pageWidth - 10,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      new Date().toLocaleString(),
      20,
      doc.internal.pageSize.getHeight() - 5
    );
    doc.text("Page 1", pageWidth - 20, doc.internal.pageSize.getHeight() - 5);

    doc.save(`Request_${props.request.request.id}.pdf`);
  };
  const handleDownload = () => {
    generatePDF();
  };
  const handleComplete = () => {
    // console.log("Complete");
    setOtpShow(!otpShow);
  };
  const handleJoin = () => {
    if (props.present) {
      setShowPopup(!showPopup);
    } else {
      fetch(
        `http://localhost:8080/api/request/addHelper?requestId=
    ${props.request.request.id}&&accountId=${sessionStorage.getItem(
          "AccountId"
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.message === "helper assigned") {
            toast.success("assigned to request id " + props.request.request.id);

            setTimeout(() => {
              //navigate("/task?requestId="+res.request.id);
              window.location.reload();
            }, 3000);
          } else {
            toast.error(res.message);
          }
        });
    }
  };
  const handleRevoke = () => {
    fetch(`http://localhost:8080/api/request/removeHelper?requestId=
    ${props.request.request.id}&&accountId=${sessionStorage.getItem(
          "AccountId"
        )}`,{
        method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
    })
    .then((res) => {return res.json()})
    .then((res) => {
      toast.success("revoke join request from request id " + props.request.request.id);
      setTimeout(() => {
        //navigate("/task?requestId="+res.request.id);
        window.location.reload();
      }, 3000);
    });
  };
  const handleCancel = () => {
    setShowPopup(false);
  };
  const handleVerifyOtp = () => {
    setGenerateOtp(true);
  }
  const handleOtpCancel = () => {
    setOtpShow(!otpShow);
  }
  const verifyOtp = (otp)=>{
    return fetch(`http://localhost:8080/api/request/verifyRequestOtp?requestId=${props.request.request.id}&&otp=${otp}`).then((res)=>{
      return res.json()
    }).then((res)=>{
      console.log(res);
      if(res.message==="paid"){
        toast.success("OTP verified, Amount get paid successfully");
      }else{
        toast.error("OTP not verified");
      }
    })
  }
  const handleSubmitOtp = () => {
    console.log(otp);
    verifyOtp(otp).then(()=>{
      setOtpShow(false);
      window.location.reload();
    });
  }
  return (
    <div id="currentTask">
      <div>
        <h1>Request Details</h1>
      </div>

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
        <label>Location:</label>{" "}
        {props.request.request.taskId.address.replace(/\\/g, " ")}
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
        {props.request.request.helperAssignments.length === 0 ? (
          <p>Helper not assigned yet</p>
        ) : (
          props.request.request.helperAssignments.map((assignment, index) => {
            //console.log(assignment);
            return (
              <HelperAssign key={index} accountId={assignment.accountId} />
            );
          })
        )}
      </div>
      <div id="buttonCompleteTask">
        <button onClick={handleDownload} className="buttonTask">
          Download
        </button>
        <button
          className={
            props.request.request.requestStatus === "underProcessing"
              ? "buttonShow buttonTask"
              : "buttonHide buttonTask"
          }
          onClick={handleComplete}
        >
          Complete
        </button>
        {otpShow && (
          <div className="popup flexSetPopUp">
            <p>Does your request get completed?<br/>if, Yes then Enter request OTP.</p>
            {generateOtp?<p>Enter OTP: 
              <input type="number" 
              id="otpInput" 
              onChange={(e)=>{setOtp(e.target.value)}}
              value={otp}/></p>:""}
            <div className="button-container">
            {generateOtp?<button onClick={handleSubmitOtp} id="deactivateButton">
                      Submit OTP
                    </button>:<button onClick={handleVerifyOtp} id="deactivateButton">
                      Verify OTP
                    </button>}
              <button
                className="cancelButton"
                onClick={handleOtpCancel}
                id="deactivateButton"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <button className={props.request.request.requestStatus !== "underProcessing"
      ? "buttonShow buttonTask"
      : "buttonHide buttonTask"} onClick={handleJoin}>
          {props.present ? "Revoke Request" : "Join Request"}
        </button>
        {showPopup && (
          <div className="popup flexSetPopUp">
            <p>Do you want to revoke your join request?</p>
            <div className="button-container">
              <button onClick={handleRevoke} id="deactivateButton">
                Revoke Request
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
      </div>
    </div>
  );
};
export default ShowTask;
//now i the helper is assged the show revoke request and when
//request is revoked then remove the helperassignemnet object
