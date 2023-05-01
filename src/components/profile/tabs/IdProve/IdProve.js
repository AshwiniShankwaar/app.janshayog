import { useEffect, useState } from "react";
import "./idProve.css";
import { BASH_URL } from "../../../../URL.js";
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
    //console.log(serialNo);
    fetch(`${BASH_URL}api/account/file?idSerialNo=${serialNo}`, {
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
        
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (idSerialNo !== null && idSerialNo !== undefined && idSerialNo !== 0) {
      //console.log(idSerialNo);
      getFile(idSerialNo,"goverment");
    }
  }, [idSerialNo]);
  useEffect(() => {
    if (addressIdSerialNo !== null && addressIdSerialNo !== undefined && addressIdSerialNo !== 0) {
      //console.log(addressIdSerialNo);
      getFile(addressIdSerialNo,"address");
    }
  }, [addressIdSerialNo]);

  const handleGovermentIdSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#GovermentIdProve");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    fetch(`${BASH_URL}api/account/IdProveUpload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setIdSerialNo(data.id);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleAddressIdSubmit = (event) => {
    event.preventDefault();
    const fileInput = document.querySelector("#AddressIdProve");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch(`${BASH_URL}api/account/IdProveUpload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAddressIdSerialNo(data.id);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
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
                  {idSerialNo !== null
                    ? sessionStorage.getItem("AccountId") +
                      "_" +
                      idSerialNo +
                      "_GovermentId.jpg"
                    : ""}
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
                  onChange={(e) =>
                    setAddressIdNumber(e.target.value.toUpperCase())
                  }
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
                  {addressIdSerialNo !== null
                    ? sessionStorage.getItem("AccountId") +
                      "_" +
                      addressIdSerialNo +
                      "_Addressprove.jpg"
                    : ""}
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
