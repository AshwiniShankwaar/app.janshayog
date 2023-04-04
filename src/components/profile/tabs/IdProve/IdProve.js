import { useEffect, useState } from "react";
import "./idProve.css";
const IdProve = ({
  idSerialNo,
  setIdSerialNo,
  idNumber,
  setIdNumber,
  IdProveType,
  setIdProveType,
  addressIdSerialNo,
  setAddressIdSerialNo,
  addressIdNumber,
  setAddressIdNumber,
  addressIdProveType,
  setAddressIdProveType,
}) => {
  const idTypeAllowed = ["National id", "Passport", "Social Security"];

  const [govermentfile, setGovermentFile] = useState(null);
  const [addressfile, setAddressFile] = useState(null);

  //console.log(idSerialNo,addressIdSerialNo);
  // const getDocument = (serialNo) => {
  //   let url = null;
  //   fetch(`http://localhost:8080/api/account/idProve?idSerialNo=${serialNo}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return url;
  // };

  
  const fileDownload = ()=>{
    const url = window.URL.createObjectURL(govermentfile);

        // Create a link element with the URL and click it to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = idSerialNo+".jpg";
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
  }

  const addressfileDownload = ()=>{
    const url = window.URL.createObjectURL(addressfile);

        // Create a link element with the URL and click it to download the file
        const link = document.createElement("a");
        link.href = url;
        link.download = addressIdSerialNo+".jpg";
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
  }
  const getFile = (serialNo,idType) => {
    console.log(serialNo);
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

  useEffect(() => {
    //console.log(idSerialNo.id);
    if(idSerialNo!=null)
    //console.log(idSerialNo)
    getFile(idSerialNo,"goverment");
    if(addressIdSerialNo!=null)
    //console.log(addressIdSerialNo)
    getFile(addressIdSerialNo,"address");
  }, [idSerialNo,addressIdSerialNo]);

  const handleGovermentIdSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#GovermentIdProve");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("http://localhost:8080/api/account/IdProveUpload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.id);
        setIdSerialNo(data.id);
        console.log("File uploaded:", data);
        getFile(data.id,"goverment");
        // Do something with the response from the server, like update the UI
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error, like displaying an error message to the user
      });
  };

  const handleAddressIdSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#AddressIdProve");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("http://localhost:8080/api/account/IdProveUpload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAddressIdSerialNo(data.id);
        console.log("File uploaded:", data);
        // Do something with the response from the server, like update the UI
        getFile(data.id,"address");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle the error, like displaying an error message to the user
      });
  };
  return (
    <>
      <div id="idprove">
        <form>
          <div id="GovermentId">
            <p className="idHead">Goverment Id</p>
            <div id="GovermentInput">
              <label>
                <p>Select Id Type:</p>
                <select
                  onChange={(e) => setIdProveType(e.target.value)}
                  value={IdProveType}
                >
                  <option value="select">Select Id type</option>
                  {idTypeAllowed.map((idType, index) => (
                    <option key={index} value={idType}>
                      {idType}
                    </option>
                  ))}
                </select>
              </label>
              <label id="input">
                <p>Enter Id Number:</p>
                <input
                  type="text"
                  placeholder="Enter your Id Prove"
                  value={idNumber || ""}
                  onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                  
                />
              </label>
              <label>
                <p>Upload Id:</p>

                <input
                  type="file"
                  className="FileInput"
                  id="GovermentIdProve"
                />
                
                <button
                  className="buttonSubmit"
                  onClick={handleGovermentIdSubmit}
                >
                  
                  Upload
                </button>
                <button id="transprantButton" onClick={fileDownload}>
                  {idSerialNo!==undefined? sessionStorage.getItem("AccountId")+"_"+idSerialNo+"_GovermentId.jpg":""}
                </button>
              </label>
            </div>
          </div>
          <div id="AddressId">
            <p className="idHead">Address Prove</p>
            <div id="GovermentInput">
              <label>
                <p>Select Id Type:</p>
                <select
                  onChange={(e) => setAddressIdProveType(e.target.value)}
                  value={addressIdProveType}
                >
                  <option value="select">Select Id type</option>
                  {idTypeAllowed.map((idType, index) => (
                    <option key={index} value={idType}>
                      {idType}
                    </option>
                  ))}
                </select>
              </label>
              <label id="input">
                <p>Enter Id Number:</p>
                <input
                  type="text"
                  placeholder="Enter your Id Prove"
                  value={addressIdNumber || ""}
                  onChange={(e) => setAddressIdNumber(e.target.value.toUpperCase())}
                />
              </label>
              <label>
                <p>Upload Id:</p>

                <input type="file" className="FileInput" id="AddressIdProve" />
                
                <button
                  className="buttonSubmit"
                  onClick={handleAddressIdSubmit}
                >
                  Upload
                </button>
                <button id="transprantButton" onClick={addressfileDownload}>
                  {addressIdSerialNo!==undefined?sessionStorage.getItem("AccountId")+"_"+addressIdSerialNo+"_Addressprove.jpg":""}
                </button>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default IdProve;
