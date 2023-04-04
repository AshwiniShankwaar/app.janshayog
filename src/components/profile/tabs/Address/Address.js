import "./address.css";
const Address = ({
  houseNo,
  setHouseNo,
  Street,
  setStreet,
  City,
  setCity,
  state,
  setState,
  district,
  setDistrict,
  pinCode,
  setPinCode,
  country,
  setCountry,
  permanenthouseNo,
  setpermanentHouseNo,
  permanentStreet,
  setpermanentStreet,
  permanentCity,
  setpermanentCity,
  permanentstate,
  setpermanentstate,
  permanentdistrict,
  setpermanentdistrict,
  permanentpinCode,
  setpermanentpinCode,
  permanentcountry,
  setpermanentcountry,
}) => {

  const handleCheck = (e) => {
    if(e.target.checked){
      setpermanentHouseNo(houseNo);
      setpermanentStreet(Street);
      setpermanentCity(City);
      setpermanentdistrict(district);
      setpermanentpinCode(pinCode);
      setpermanentstate(state);
      setpermanentcountry(country);
    }else{
      setpermanentHouseNo("");
      setpermanentStreet("");
      setpermanentCity("");
      setpermanentdistrict("");
      setpermanentpinCode("");
      setpermanentstate("");
      setpermanentcountry("");
    }
  }
  return (
    <>
      <div id="address">
        <form>
          <p>Current Address</p>
          <div id="street">
            <input type="text" 
            placeholder="House No/ Flat no" 
            value={houseNo||""} 
            onChange={(e)=>setHouseNo(e.target.value)}/>
            <input 
            type="text" 
            placeholder="Street/village/Locality" 
            value={Street||""} 
            onChange={(e)=>setStreet(e.target.value)}/>
          </div>
          <div id="locality">
            <input 
            type="text" 
            placeholder="City" 
            value={City||""} 
            onChange={(e)=>setCity(e.target.value)}/>
            <input 
            type="text" 
            placeholder="District" 
            value={district||""} 
            onChange={(e)=>setDistrict(e.target.value)}/>
            <input 
            type="number" 
            placeholder="Pincode" 
            value={pinCode||""} 
            onChange={(e)=>setPinCode(e.target.value)}/>
          </div>
          <div id="state">
            <input 
            type="text" 
            placeholder="State" 
            value={state||""} 
            onChange={(e)=>setState(e.target.value)}/>
            <input type="text" placeholder="Country" 
            value={country||""} 
            onChange={(e)=>setCountry(e.target.value)}/>
            <div>
              <input type="checkbox" onChange={handleCheck}/>
              <label>Is permanent address same as current address</label>
            </div>
          </div>
          <p>Permanent Address</p>
          <div id="street">
            <input type="text" placeholder="House No/ Flat no" 
            value={permanenthouseNo||""} 
            onChange={(e)=>setpermanentHouseNo(e.target.value)}/>
            <input type="text" placeholder="Street/village/Locality" 
            value={permanentStreet||""} 
            onChange={(e)=>setpermanentStreet(e.target.value)}/>
          </div>
          <div id="locality">
            <input type="text" placeholder="City" 
            value={permanentCity||""} 
            onChange={(e)=>setpermanentCity(e.target.value)}/>
            <input type="text" placeholder="District" 
            value={permanentdistrict||""} 
            onChange={(e)=>setpermanentdistrict(e.target.value)}/>
            <input type="number" placeholder="Pincode" value={permanentpinCode||""} 
            onChange={(e)=>setpermanentpinCode(e.target.value)}/>
          </div>
          <div id="state">
            <input type="text" placeholder="State" value={permanentstate||""} 
            onChange={(e)=>setpermanentstate(e.target.value)}/>
            <input type="text" placeholder="Country" value={permanentcountry||""} 
            onChange={(e)=>setpermanentcountry(e.target.value)}/>
          </div>
        </form>
      </div>
    </>
  );
};
export default Address;
