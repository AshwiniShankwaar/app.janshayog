import "./emergency.css";
import "react-phone-number-input/style.css";
const Emergency = ({
  emergencyFirstName,
  setEmergencyFirstName,
  emergencyMiddleName,
  setEmergencyMiddleName,
  emergencyLastName,
  setEmergencyLastName,
  emergencyEmailAddress,
  setEmergencyEmailAddress,
  emergencyContactNumber,
  setEmergencyContactNumber,
  emergencyGender,
  setEmergencyGender,
  emergencyAddress1,
  setEmergencyAddress1,
  emergencyAddress2,
  setEmergencyAddress2,
  emergencyCity,
  setEmergencyCity,
  emergencyDistrict,
  setEmergencyDistrict,
  emergencyState,
  setEmergencyState,
  emergencyCountry,
  setEmergencyCountry,
  emergencyPinCode,
  setEmergencyPinCode,
  emergencyRelationship,
  setEmergencyRelationship
}) => {

  

  return (
    <>
      <div id="EmergencyContact">
        <form>
          <div id="EnameSection">
            
            <input type="text" name="emergencyfirstName"
             placeholder="First name" value={emergencyFirstName||""}
              onChange={(e)=>setEmergencyFirstName(e.target.value)}/>
            <input type="text" name="emergencyMidddleName" 
            placeholder="Middle name" value={emergencyMiddleName||""}
            onChange={(e)=>setEmergencyMiddleName(e.target.value)}/>
            <input type="text" name="emergencyLastName" 
            placeholder="Last name" value={emergencyLastName||""}
            onChange={(e)=>setEmergencyLastName(e.target.value)}/>
          </div>
          <div id="genderSection">
            <label htmlFor="selectgender">Gender:
            <select value={emergencyGender}
            onChange={(e)=>{setEmergencyGender(e.target.value)}}>
              <option value="select">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select></label>
            <label htmlFor="RelationType">Relation:
            <select value={emergencyRelationship}
            onChange={(e)=>{setEmergencyRelationship(e.target.value)}}>
              <option value="select">Select Relation</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Sister">Sister</option>
              <option value="Other">Other</option>
            </select></label>
          </div>
          <div id="contactSection">
            <label htmlFor="emergencyEmailAddress"><p>Email id:</p>
            <input type="email" name="emergencyEmailAddress" 
            placeholder="example@gmail.com" value={emergencyEmailAddress||""}
            onChange={(e)=>{setEmergencyEmailAddress(e.target.value)}}/></label>
            <label htmlFor="emergencyContactNumber"><p>Contact Number:</p>
            <input type="text" name="emergencyContactNumber" 
            placeholder="+911234567891" value={emergencyContactNumber||""}
            onChange={(e)=>{setEmergencyContactNumber(e.target.value)}}/>
            </label>
          </div>
          <div id="addressSection">
            <label htmlFor="addressLine1"><p>Address Line 1:</p>
            <input type="text" name="addressLine1" 
            value={emergencyAddress1||""} onChange={(e)=>{setEmergencyAddress1(e.target.value)}}/></label>
            <label htmlFor="addressLine2"><p>Address Line 2:</p>
            <input type="text" name="addressLine2" 
            value={emergencyAddress2||""} onChange={(e)=>{setEmergencyAddress2(e.target.value)}}/></label>
            <div>
              <label htmlFor="city">City:
              <input type="text" name="city" 
              value={emergencyCity||""} onChange={(e)=>{setEmergencyCity(e.target.value)}}/></label>
              <label htmlFor="district">District:
              <input type="text" name="district" 
              value={emergencyDistrict||""} onChange={(e)=>{setEmergencyDistrict(e.target.value)}}/></label>
              <label htmlFor="state">State:
              <input type="text" name="state" 
              value={emergencyState||""} onChange={(e)=>{setEmergencyState(e.target.value)}}/></label>
            </div>
            <div>
              <label htmlFor="country">Country:
              <input type="text" name="Country" 
              value={emergencyCountry||""} onChange={(e)=>{setEmergencyCountry(e.target.value)}}/></label>
              <label htmlFor="PinCode">PinCode:
              <input type="text" name="PinCode" 
              value={emergencyPinCode||""} onChange={(e)=>{setEmergencyPinCode(e.target.value)}}/></label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Emergency;
