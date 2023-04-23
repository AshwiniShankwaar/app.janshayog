import "./viewprofile.css";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar.js";
import dpImage from "../../images/dp.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ViewProfile = () => {
  const navigate = useNavigate();
  const accountId = sessionStorage.getItem("AccountId");
  const [userData, setUserData] = useState("");
  const [accountData, setAccountData] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [relation, setRelation] = useState("");
  const [govermentId, setGovermentId] = useState("");
  const [addressprove, setAddressProve] = useState("");
  const [govermentfile, setGovermentFile] = useState(null);
  const [addressfile, setAddressFile] = useState(null);
  const [dob, setDob] = useState("");
  const [eAddress, setEAddress] = useState("");
  //deactivate
  const [showPopup, setShowPopup] = useState(false);
  //phone verification
  const [verifyPopup, setVerifyPopup] = useState(false);

  function vertifyOtp() {
    // Fetch API to deactivate account here
    setVerifyPopup(false);
  }

  function cancleverify() {
    setVerifyPopup(false);
  }

  function handleVerifyClick() {
    if(!showPopup)
    setVerifyPopup(true);
  }

  function handleDeactivate() {
    // Fetch API to deactivate account here
    fetch(`http://localhost:8080/api/account/deactivate?accountId=${accountId}`,{
      method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
    })
    .then((res) => {
      return res.json();
    }).then((res) => {
      if(res.message === "Deactivated"){
        setShowPopup(false);
        alert("your account has been deactivated, please login again");
        window.location.href = "/";
      }else{
        toast.error(res.message);
      }
      // setTimeout(() => {
        
      // },3000);
    })
    .catch((err) => {
      console.log(err);
    });
    
  }

  function handleCancel() {
    setShowPopup(false);
  }

  function handleDeactivateButtonClick() {
    if (!verifyPopup) setShowPopup(true);
  }
  const fetchUserDetails = (id) => {
    try {
      fetch(`http://localhost:8080/api/account/getUserData?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          //console.log(res);
          if (res.message === "not found") {
            window.alert("Not Found");
            window.location.href = "/";
          } else {
            // console.log(res.user);
            //console.log(res.account);
            setUserData(res.user);
            setAccountData(res.account);
            setCurrentAddress(res.user.currentAddress);
            setPermanentAddress(res.user.permanentAddress);
            setEmergencyContact(res.user.relation.emergencyContact);
            setRelation(res.user.relation);
            setGovermentId(res.user.govermentId);
            setAddressProve(res.user.addressProve);
            setDob(new Date(res.user.dob).toLocaleDateString());
            setEAddress(
              res.user.relation.emergencyContact.address.replace(/\//g, ", ")
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails(accountId);
  }, [accountId]);

  useEffect(() => {
    if (govermentId !== "") {
      getFile(govermentId.idSerialNo, "goverment");
    }
  }, [govermentId]);
  useEffect(() => {
    if (addressprove !== "") {
      getFile(addressprove.idSerialNo, "address");
    }
  }, [addressprove]);
  const fileDownload = () => {
    const url = window.URL.createObjectURL(govermentfile);

    // Create a link element with the URL and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = govermentId.idSerialNo + ".jpg";
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };

  const addressfileDownload = () => {
    const url = window.URL.createObjectURL(addressfile);

    // Create a link element with the URL and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = addressprove.idSerialNo + ".jpg";
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };
  const getFile = (serialNo, idType) => {
    //console.log(serialNo);
    fetch(`http://localhost:8080/api/account/file?idSerialNo=${serialNo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        if (idType === "goverment") {
          setGovermentFile(blob);
        } else if (idType === "address") {
          setAddressFile(blob);
        }
        // Create a URL for the blob
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditBUtton = () => {
    navigate("/editProfile");
  }
  return (
    <>
      <div id="profilePage">
        <Navbar />
        {/* view profile <br/> <NavLink to="/editProfile">edit profile</NavLink> */}
        <div id="container">
          <div id="personalInfo">
            <div id="dp">
              <img src={dpImage} alt="dp" />
              <p id="name">
                {userData.firstname +
                  " " +
                  userData.middleName +
                  " " +
                  userData.lastname}
              </p>
              <p id="accountType">
                <label className="lableTitle">Account Type:</label>{" "}
                {accountData.accountType}
              </p>
            </div>
            <div id="info">
              <div>
                <p id="email">
                  <label className="lableTitle">Email id:</label>{" "}
                  {accountData.emailAddress}{" "}
                </p>
                <p id="phone">
                  <label className="lableTitle">Mobile No:</label>{" "}
                  {userData.phoneNumber}</p>

                  <button
                    onClick={handleVerifyClick}
                    id="deactivateButton"
                  >
                    verify
                  </button>
                  {verifyPopup && (
                    <div className="popup">
                      <p>Enter OTP send on the number {userData.phoneNumber}</p>
                      <input id="otp" type="text" name="otp" />
                      <div className="button-container">
                        <button
                          onClick={vertifyOtp}
                          id="deactivateButton"
                        >
                          verify OTP
                        </button>
                        <button className="cancelButton" onClick={cancleverify} id="deactivateButton">
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                <p id="dob">
                  <label className="lableTitle">Date of Birth:</label> {dob}
                </p>
                <p id="gender">
                  <label className="lableTitle">Gender:</label>{" "}
                  {userData.gender}
                </p>
                <p id="accountStatus">
                  <label className="lableTitle">Account Status:</label>{" "}
                  {accountData.accountStatus + " "}
                </p>
                <p id="accountVerified">
                  <label className="lableTitle">Account Verification:</label>{" "}
                  {accountData.verified === "verified"
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </div>
              <div>
                <label className="lableHeading">Alternative Contact</label>{" "}
                <br />
                <p id="altemail">
                  <label className="lableTitle">Email id:</label>{" "}
                  {userData.alternative_email}
                </p>
                <p id="altphonenumber">
                  <label className="lableTitle">Phone Number:</label>{" "}
                  {userData.alternative_PhoneNumber}
                </p>
              </div>
              <div className="editProfile"><button id="deactivateButton" onClick={handleEditBUtton} >Edit Profile</button></div>
            </div>
          </div>
          <div id="contactDetails">
            <div id="contactAddress">
              <div id="current">
                <label className="lableHeading">Current Address</label>
                <br />
                <label className="lableTitle">Area:</label>{" "}
                {currentAddress.area + ", " + currentAddress.locality + ", "}{" "}
                <br />
                <label className="lableTitle">District:</label>{" "}
                {currentAddress.district + ", "}
                <label className="lableTitle">State:</label>{" "}
                {currentAddress.state + ", "}
                <label className="lableTitle">Pincode:</label>{" "}
                {currentAddress.pincode + ", "}
                <label className="lableTitle">Country:</label>{" "}
                {currentAddress.country}
              </div>

              <div id="permanent">
                <label className="lableHeading">Permanent Address</label>
                <br />
                <label className="lableTitle">Area:</label>{" "}
                {permanentAddress.area +
                  ", " +
                  permanentAddress.locality +
                  ", "}{" "}
                <br />
                <label className="lableTitle">District:</label>{" "}
                {permanentAddress.district + ", "}
                <label className="lableTitle">State:</label>{" "}
                {permanentAddress.state + ", "}
                <label className="lableTitle">Pincode:</label>
                {permanentAddress.pincode + ", "}
                <label className="lableTitle">Country:</label>{" "}
                {permanentAddress.country}
              </div>
            </div>
            <div id="emergencyContact">
              <label className="lableHeading">Emergency Contact</label> <br />
              <p id="name">
                <label className="lableTitle">Name:</label>{" "}
                {emergencyContact.firstName +
                  " " +
                  emergencyContact.middleName +
                  " " +
                  emergencyContact.lastName}
              </p>
              <p id="gender">
                <label className="lableTitle">Gender:</label>{" "}
                {emergencyContact.gender}
              </p>
              <p id="relationType">
                <label className="lableTitle">Relation:</label>{" "}
                {relation.relationType}
              </p>
              <p id="email">
                <label className="lableTitle">Email id:</label>{" "}
                {emergencyContact.emailAddress}
              </p>
              <p id="phone">
                <label className="lableTitle">Phone Number:</label>{" "}
                {emergencyContact.phoneNumber}
              </p>
              <p id="Contactaddress">
                <label className="lableTitle">Address:</label> {eAddress}
              </p>
            </div>
            <div id="documents">
              <div>
                <label className="lableHeading">Goverment Id</label>
                <br />
                <p>
                  <label className="lableTitle">Id Type:</label>{" "}
                  {govermentId.idProveType + ", "}
                </p>
                <p>
                  <label className="lableTitle">Id Number:</label>{" "}
                  {govermentId.idNumber + ", "}
                </p>
                <div id="doc">
                  <label className="lableTitle">Document:</label>{" "}
                  <p onClick={fileDownload} id="downloads">
                    {govermentId.idSerialNo
                      ? sessionStorage.getItem("AccountId") +
                        "_" +
                        govermentId.idSerialNo +
                        "_GovermentId.jpg"
                      : ""}
                  </p>
                </div>
              </div>
              <div>
                <label className="lableHeading">Address prove Id</label>
                <br />
                <p>
                  <label className="lableTitle">Id Type:</label>{" "}
                  {addressprove.idProveType + ", "}
                </p>
                <p>
                  <label className="lableTitle">Id Number:</label>{" "}
                  {addressprove.idNumber + ", "}
                </p>
                <div id="doc">
                  <label className="lableTitle">Document:</label>{" "}
                  <p id="downloads" onClick={addressfileDownload}>
                    {addressprove.idSerialNo
                      ? sessionStorage.getItem("AccountId") +
                        "_" +
                        addressprove.idSerialNo +
                        "_Addressprove.jpg"
                      : ""}
                  </p>{" "}
                </div>
              </div>
            </div>
            <div id="deactivate">
              Deactivate your account.
              <button
                onClick={handleDeactivateButtonClick}
                id="deactivateButton"
              >
                Deactivate
              </button>
              {showPopup && (
                <div className="popup">
                  <p>Do you want to deactivate your account?</p>
                  <div className="button-container">
                    <button onClick={handleDeactivate} id="deactivateButton">
                      Deactivate
                    </button>
                    <button className="cancelButton" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
