import "./viewprofile.css";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar.js";
import dpImage from "../../images/dp.png"; 
const ViewProfile = () => {
  const accountId = sessionStorage.getItem("AccountId");
  const [userData,setUserData] = useState("");
  const [accountData,setAccountData] = useState("");
  const [currentAddress,setCurrentAddress] = useState("");
  const [permanentAddress,setPermanentAddress] = useState("");
  const [emergencyContact,setEmergencyContact] = useState("");
  const [relation,setRelation] = useState("");
  const [govermentId,setGovermentId] = useState("");
  const [addressprove,setAddressProve] = useState("");
  const [govermentfile, setGovermentFile] = useState(null);
  const [addressfile, setAddressFile] = useState(null);
  const [dob,setDob] = useState("");
  const [eAddress,setEAddress] = useState("");
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
            // console.log(res.account);
            setUserData(res.user);
            setAccountData(res.account);
            setCurrentAddress(res.user.currentAddress);
            setPermanentAddress(res.user.permanentAddress);
            setEmergencyContact(res.user.relation.emergencyContact);
            setRelation(res.user.relation);
            setGovermentId(res.user.govermentId);
            setAddressProve(res.user.addressProve);
            setDob(new Date(res.user.dob).toLocaleDateString());
            setEAddress(res.user.relation.emergencyContact.address.replace(/\//g, ', '));
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
  },[accountId]);

  useEffect(()=>{
    if(govermentId!==""){
      getFile(govermentId.idSerialNo,"goverment");
    }
  },[govermentId]);
useEffect(()=>{
    if(addressprove!==""){
        getFile(addressprove.idSerialNo,"address")
    }
},[addressprove]);
  const fileDownload = ()=>{
    const url = window.URL.createObjectURL(govermentfile);

        // Create a link element with the URL and click it to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = govermentId.idSerialNo+".jpg";
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
  }

  const addressfileDownload = ()=>{
    const url = window.URL.createObjectURL(addressfile);

        // Create a link element with the URL and click it to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = addressprove.idSerialNo+".jpg";
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
  }
  const getFile = (serialNo,idType) => {
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
        if(idType === "goverment")
        {
          setGovermentFile(blob);
        }
        else if(idType === "address")
        {
          setAddressFile(blob);
        }
        // Create a URL for the blob
        
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="profilePage">
        <Navbar />
        {/* view profile <br/> <NavLink to="/editProfile">edit profile</NavLink> */}
        <div id="container">
          <div id="personalInfo">
            <div id="dp">
              <img src={dpImage} alt="dp" />
              <p id="name">{userData.firstname+" "+userData.middleName+" "+userData.lastname}</p>
              <p id="accountType">Account Type: {
              accountData.accountType
              }</p>
            </div>
            <div id="info">
              
              <div>
              <p id="email">Email id: {accountData.emailAddress} </p>
              <p id="phone">Contact number: {userData.phoneNumber}</p>
              <p id="dob">Date of Birth: {
              dob}</p>
              <p id="gender">Gender: {userData.gender}</p>
              <p id="accountStatus">Account Status: {accountData.accountStatus}</p>
              </div>
              <div>
                Alternative contact: <br/>
                <p id="altemail">Email: {userData.alternative_email}</p>
                <p id="altphonenumber">Phone Number: {userData.alternative_PhoneNumber}</p>
              </div>
            </div>
          </div>
          <div id="contactDetails">
            <div id="contactAddress">
                
                < div id="current">
                    Current Address: {currentAddress.area+", "+
                    currentAddress.locality+", "} <br/>
                    District: {currentAddress.district+", State: "+
                    currentAddress.state+", "}
                    Pincode: {currentAddress.pincode+", Country: "+
                    currentAddress.country
                    }
                </div>
                
                <div id="permanent">
                    Permanent Address: {permanentAddress.area+", "+
                    permanentAddress.locality+", "} <br/>
                    District: {permanentAddress.district+", State: "+
                    permanentAddress.state+", "}
                    Pincode: {permanentAddress.pincode+", Country: "+
                    permanentAddress.country
                    }
                </div>
            </div>
            <div id="emergencyContact">
                Emergency Contact: <br/>
                <p id="name">Name: {emergencyContact.firstName+", "+
                emergencyContact.middleName+", "+
                emergencyContact.lastName}</p>
                <p id="gender">Gender: {emergencyContact.gender}</p>
                <p id="relationType">Relation: {relation.relationType}</p>
                <p id="email">Email id: {emergencyContact.emailAddress}</p>
                <p id="phone">Phone Number: {emergencyContact.phoneNumber}</p>
                <p id="Contactaddress">Address: {eAddress}</p>
            </div>
            <div id="documents">
                Goverment Id: <br/>
                Id Type: {govermentId.idProveType+", "}<br/>
                Id Number: {govermentId.idNumber+", "}<br/>
                Document: <button id="transprantButton" onClick={fileDownload}>
                  {govermentId.idSerialNo?
                   sessionStorage.getItem("AccountId")+"_"+
                   govermentId.idSerialNo+"_GovermentId.jpg":""}
                </button><br/> 
                Address prove Id: <br/>
                Id Type: {addressprove.idProveType+", "}<br/>
                Id Number: {addressprove.idNumber+", "}<br/> 
                Document: <button id="transprantButton" onClick={addressfileDownload}>
                  {addressprove.idSerialNo?
                  sessionStorage.getItem("AccountId")+"_"+addressprove.idSerialNo+"_Addressprove.jpg":""}
                </button> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
