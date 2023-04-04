import "./personalInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const PersonalInfo = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  MiddleName,
  setMiddleName,
  email,
  gender,
  setGender,
  dob,
  setDob,
  phoneNumber,
  setPhoneNumber,
  AltphoneNumber,
  setAltPhoneNumber,
  accountType,
  AltEmail,
  setAltEmail
}) => {
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleMiddleNameChange = (event) => {
    setMiddleName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleDobChange = (date) => setDob(date);
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };
  const handleAltPhoneChange = (value) => {
    setAltPhoneNumber(value);
  };
  const handleAltEmailChange = (event) => {
    setAltEmail(event.target.value);
  };
  return (
    <>
      <div id="personalInfo">
        <form>
          <div id="nameSection">
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="FirstName"
            />
            <input
              type="text"
              value={MiddleName}
              onChange={handleMiddleNameChange}
              placeholder="MiddleName"
            />
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="LastName"
            />
          </div>
          <div id="emailSection">
            <label>
              <p>Email Id:</p>
              <input
                type="email"
                disabled
                value={email}
                placeholder="example@gmail.com"
              />
            </label>
            <label>
              Gender:
              <select onChange={handleGenderChange} value={gender}>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="UniSexual">UniSexual</option>
              </select>
            </label>
          </div>
          <div id="dobSection">
            <label>
              <p>Date of Birth:</p>
              <DatePicker
                selected={new Date(dob)}
                onChange={handleDobChange}
                className="datepicker"
              />
            </label>
            <label>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="IN"
                maxLength = "12"
                value={phoneNumber||""}
                onChange={handlePhoneChange}
              />
            </label>
            </div>
            <div id="AccountType">
            <label>
                <p>Account Type:</p>
                <input type="text" value={accountType.toUpperCase()} disabled/>
            </label>
          </div>
          <div id="alternative">
            <p>Alternative Details</p>
            <label>
                <PhoneInput
                  placeholder="Phone Number"
                  defaultCountry="IN"
                  maxLength = "12"
                  value={AltphoneNumber||""}
                  onChange={handleAltPhoneChange}
                />
            </label>
            <label>
                <p>Email Address: </p>
                <input type="email"
                  placeholder="example@gmail.com"
                  value={AltEmail||""}
                  onChange={handleAltEmailChange}
                />
            </label>
            
          </div>
        </form>
      </div>
    </>
  );
};
export default PersonalInfo;
