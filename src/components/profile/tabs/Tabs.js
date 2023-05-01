import "./tabs.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./personalInfo/PersonalInfo.js";
import Address from "./Address/Address.js";
import IdProve from "./IdProve/IdProve.js";
import Emergency from "./EmergencyContact/Emergency.js";
import { BASH_URL } from "../../../URL.js";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [accountId, setAccountId] = useState(
    sessionStorage.getItem("AccountId")
  );
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(sessionStorage.getItem("EmailId"));
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState();
  const [AltphoneNumber, setAltPhoneNumber] = useState();
  const [accountType, setAccountType] = useState(
    sessionStorage.getItem("AccountType")
  );
  const [AltEmail, setAltEmail] = useState("");

  //current address
  const [houseNo, setHouseNo] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPinCode] = useState();
  const [country, setCountry] = useState("India");
  //permanent address
  const [permanenthouseNo, setpermanentHouseNo] = useState("");
  const [permanentStreet, setpermanentStreet] = useState("");
  const [permanentCity, setpermanentCity] = useState("");
  const [permanentstate, setpermanentState] = useState("");
  const [permanentdistrict, setpermanentDistrict] = useState("");
  const [permanentpinCode, setpermanentPinCode] = useState();
  const [permanentcountry, setpermanentCountry] = useState("India");
  //goverment id
  const [idSerialNo, setIdSerialNo] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [IdProveType, setIdProveType] = useState("");

  //addressprove id
  const [addressIdSerialNo, setAddressIdSerialNo] = useState(null);
  const [addressIdNumber, setAddressIdNumber] = useState("");
  const [addressIdProveType, setAddressIdProveType] = useState("");

  //Emergency contact details
  const [emergencyFirstName, setEmergencyFirstName] = useState("");
  const [emergencyMiddleName, setEmergencyMiddleName] = useState("");
  const [emergencyLastName, setEmergencyLastName] = useState("");
  const [emergencyEmailAddress, setEmergencyEmailAddress] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState();
  const [emergencyGender, setEmergencyGender] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [emergencyAddress, setEmergencyAddress] = useState("");

  // const [addressArray, setAddressArray] = useState();
  const [emergencyAddress1, setEmergencyAddress1] = useState("");
  const [emergencyAddress2, setEmergencyAddress2] = useState("");
  const [emergencyCity, setEmergencyCity] = useState("");
  const [emergencyState, setEmergencyState] = useState("");
  const [emergencyPinCode, setEmergencyPinCode] = useState();
  const [emergencyDistrict, setEmergencyDistrict] = useState("");
  const [emergencyCountry, setEmergencyCountry] = useState("");

  // console.log(addressArray);

  //get userdata

  const navigate = useNavigate();

  const setEmergencyAddressData = () => {
    let address =
      emergencyAddress1 +
      "/" +
      emergencyAddress2 +
      "/" +
      emergencyCity +
      "/" +
      emergencyDistrict +
      "/" +
      emergencyState +
      "/" +
      emergencyCountry +
      "/" +
      emergencyPinCode;
    setEmergencyAddress(address);
  };

  const createObj = () => {
    const obj = {
      accountId: accountId,
      firstname: firstName,
      middleName: middleName,
      lastname: lastName,
      gender: gender,
      dob: dob,
      alternative_email: AltEmail,
      alternative_PhoneNumber: AltphoneNumber,
      phoneNumber: phoneNumber,
      permanentAddress: {
        area: permanenthouseNo + "/" + permanentStreet,
        locality: permanentCity,
        district: permanentdistrict,
        state: permanentstate,
        country: permanentcountry,
        pincode: permanentpinCode,
      },
      currentAddress: {
        area: houseNo + "/" + Street,
        locality: City,
        district: district,
        state: state,
        country: country,
        pincode: pinCode,
      },
      govermentId: {
        idSerialNo: idSerialNo,
        idNumber: idNumber,
        idProveType: IdProveType,
      },
      addressProve: {
        idSerialNo: addressIdSerialNo,
        idNumber: addressIdNumber,
        idProveType: addressIdProveType,
      },
      relation: {
        relationType: emergencyRelationship,
        emergencyContact: {
          firstName: emergencyFirstName,
          middleName: emergencyMiddleName,
          lastName: emergencyLastName,
          emailAddress: emergencyEmailAddress,
          phoneNumber: emergencyContactNumber,
          gender: emergencyGender,
          address: emergencyAddress,
        },
      },
      phoneNumberVerification: {},
    };
    return obj;
  };

  const tabs = [
    {
      label: "Personal Information",
      content: (
        <PersonalInfo
          firstName={firstName}
          setFirstName={setFirstName}
          MiddleName={middleName}
          setMiddleName={setMiddleName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          gender={gender}
          setGender={setGender}
          dob={dob}
          setDob={setDob}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          AltphoneNumber={AltphoneNumber}
          setAltPhoneNumber={setAltPhoneNumber}
          accountType={accountType}
          setAltEmail={setAltEmail}
          AltEmail={AltEmail}
        />
      ),
    },
    {
      label: "Address Details",
      content: (
        <Address
          houseNo={houseNo}
          setHouseNo={setHouseNo}
          Street={Street}
          setStreet={setStreet}
          City={City}
          setCity={setCity}
          state={state}
          setState={setState}
          district={district}
          setDistrict={setDistrict}
          pinCode={pinCode}
          setPinCode={setPinCode}
          country={country}
          setCountry={setCountry}
          permanenthouseNo={permanenthouseNo}
          setpermanentHouseNo={setpermanentHouseNo}
          permanentStreet={permanentStreet}
          setpermanentStreet={setpermanentStreet}
          permanentCity={permanentCity}
          setpermanentCity={setpermanentCity}
          permanentstate={permanentstate}
          setpermanentstate={setpermanentState}
          permanentdistrict={permanentdistrict}
          setpermanentdistrict={setpermanentDistrict}
          permanentpinCode={permanentpinCode}
          setpermanentpinCode={setpermanentPinCode}
          permanentcountry={permanentcountry}
          setpermanentcountry={setpermanentCountry}
        />
      ),
    },
    {
      label: "Id Details",
      content: (
        <IdProve
          idSerialNo={idSerialNo}
          setIdSerialNo={setIdSerialNo}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
          IdProveType={IdProveType}
          setIdProveType={setIdProveType}
          addressIdSerialNo={addressIdSerialNo}
          setAddressIdSerialNo={setAddressIdSerialNo}
          addressIdNumber={addressIdNumber}
          setAddressIdNumber={setAddressIdNumber}
          addressIdProveType={addressIdProveType}
          setAddressIdProveType={setAddressIdProveType}
        />
      ),
    },
    {
      label: "Emergency Contact",
      content: (
        <Emergency
          emergencyFirstName={emergencyFirstName}
          setEmergencyFirstName={setEmergencyFirstName}
          emergencyMiddleName={emergencyMiddleName}
          setEmergencyMiddleName={setEmergencyMiddleName}
          emergencyLastName={emergencyLastName}
          setEmergencyLastName={setEmergencyLastName}
          emergencyEmailAddress={emergencyEmailAddress}
          setEmergencyEmailAddress={setEmergencyEmailAddress}
          emergencyContactNumber={emergencyContactNumber}
          setEmergencyContactNumber={setEmergencyContactNumber}
          emergencyGender={emergencyGender}
          setEmergencyGender={setEmergencyGender}
          emergencyRelationship={emergencyRelationship}
          setEmergencyRelationship={setEmergencyRelationship}
          emergencyAddress1={emergencyAddress1}
          setEmergencyAddress1={setEmergencyAddress1}
          emergencyAddress2={emergencyAddress2}
          setEmergencyAddress2={setEmergencyAddress2}
          emergencyCity={emergencyCity}
          setEmergencyCity={setEmergencyCity}
          emergencyState={emergencyState}
          setEmergencyState={setEmergencyState}
          emergencyPinCode={emergencyPinCode}
          setEmergencyPinCode={setEmergencyPinCode}
          emergencyDistrict={emergencyDistrict}
          setEmergencyDistrict={setEmergencyDistrict}
          emergencyCountry={emergencyCountry}
          setEmergencyCountry={setEmergencyCountry}
        />
      ),
    },
  ];

  // useEffect(() => {

  //   if (emergencyAddress) {
  //     const obj = createObj();
  //     console.log(obj);
  //     addUserDetails();

  //   }
  // });

  const addUserDetails = (obj) => {
    fetch(`${BASH_URL}api/account/saveDetails`, {
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
        //console.log(res);
        if (res.message === "error while saving data") {
          toast.error("Error while saving data,Try again later");
        } else if (res.message === "Data saved") {
          toast.success("Data saved successfully");
          setTimeout(() => {
            navigate(
              "/profile"
            );
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const fetchUserDetails = (id) => {
    try {
      fetch(`${BASH_URL}api/account/userDetails?id=${id}`, {
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
          if(res.message !=="not found"){

            //console.log(res.user);
            setFirstName(res.user.firstname);
            setMiddleName(res.user.middleName);
            setLastName(res.user.lastname);
            setPhoneNumber(res.user.phoneNumber);
            setAltEmail(res.user.alternative_email);
            setAltPhoneNumber(res.user.alternative_PhoneNumber);
            setGender(res.user.gender);
            setDob(res.user.dob);

            const currentaddressarray = res.user.currentAddress.area.split("/");
            setHouseNo(currentaddressarray[0]);
            setStreet(currentaddressarray[1]);
            setCity(res.user.currentAddress.locality);
            setDistrict(res.user.currentAddress.district);
            setPinCode(res.user.currentAddress.pincode);
            setState(res.user.currentAddress.state);
            setCountry(res.user.currentAddress.country);

            const permanentaddressarray = res.user.permanentAddress.area.split("/");
            setpermanentHouseNo(permanentaddressarray[0]);
            setpermanentStreet(permanentaddressarray[1]);
            setpermanentCity(res.user.permanentAddress.locality);
            setpermanentDistrict(res.user.permanentAddress.district);
            setpermanentPinCode(res.user.permanentAddress.pincode);
            setpermanentState(res.user.permanentAddress.state);
            setpermanentCountry(res.user.permanentAddress.country);

            setIdProveType(res.user.govermentId.idProveType);
            setIdNumber(res.user.govermentId.idNumber);
            setIdSerialNo(res.user.govermentId.idSerialNo);


            
            setAddressIdSerialNo(res.user.addressProve.idSerialNo);
            setAddressIdProveType(res.user.addressProve.idProveType);
            setAddressIdNumber(res.user.addressProve.idNumber);

            //console.log(idSerialNo+" "+addressIdSerialNo);

            setEmergencyFirstName(res.user.relation.emergencyContact.firstName);
            setEmergencyMiddleName(res.user.relation.emergencyContact.middleName);
            setEmergencyLastName(res.user.relation.emergencyContact.lastName);
            setEmergencyRelationship(res.user.relation.relationType);
            setEmergencyGender(res.user.relation.emergencyContact.gender);
            setEmergencyEmailAddress(res.user.relation.emergencyContact.emailAddress);
            setEmergencyContactNumber(res.user.relation.emergencyContact.phoneNumber);
            setEmergencyAddress(res.user.relation.emergencyContact.address);

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
    if (accountId === null) {
      //toast.error("Please Login");
      window.location.href = "/";
    } else {
      setAccountId(sessionStorage.getItem("AccountId"));
      setAccountType(sessionStorage.getItem("AccountType"));
      setEmail(sessionStorage.getItem("EmailId"));
      fetchUserDetails(accountId);
    }
  }, [accountId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (activeTab === 3) {
     // console.log(idSerialNo+" "+addressIdSerialNo+" "+activeTab)
      await setEmergencyAddressData();
      if (emergencyAddress) {
        const obj = await createObj();
        
        await addUserDetails(obj);
        //await console.log(obj);
      }
      //console.log(createObj());
    } else {
      setActiveTab(activeTab + 1);
    }
  };
  useEffect(() => {
    //if emergency address is present then set it according to there respective states

    if (emergencyAddress !== "") {
      // setAddressArray(emergencyAddress.split("/"));
      const addressArray = emergencyAddress.split("/");
      // console.log(addressArray[0]);
      setEmergencyAddress1(addressArray[0]);
      setEmergencyAddress2(addressArray[1]);
      setEmergencyCity(addressArray[2]);
      setEmergencyDistrict(addressArray[3]);
      setEmergencyState(addressArray[4]);
      setEmergencyCountry(addressArray[5]);
      setEmergencyPinCode(addressArray[6]);
    }
  }, [emergencyAddress]);
  return (
    <>
      <div className="tab-menu">
        <ul>
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={activeTab === index ? "active" : ""}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {tabs[activeTab].content}
      <button onClick={handleFormSubmit} className="buttonSubmit">
        {activeTab === 3 ? "Submit" : "next"}
      </button>
    </>
  );
};

export default Tabs;
