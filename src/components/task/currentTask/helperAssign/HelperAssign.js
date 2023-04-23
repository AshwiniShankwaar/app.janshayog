import './helperAssign.css';
import { useEffect,useState } from 'react';
const HelperAssign = (props) =>{
    //console.log(props.accountId);
    const accountId = props.accountId;
    const [user,setUser] = useState(null);
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
                setUser("details not present");
              } else {
                setUser(res.user)
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
        if(accountId!==null||accountId!==undefined){
            fetchUserDetails(accountId);
        }
      }, [accountId]);
    
      return(
        <div className="helperData">
            {
                user===null||user===undefined?
                <p>loading...</p>:(
                    user ? (
                    <>
                    <div className="helperDataSet"><p><label>Account Id:</label> {user.accountId}</p>
                    <p><label>Name:</label> {user.firstname+" "+user.middleName+" "+user.lastname}</p></div>
                    <div className="helperDataSet"><p><label>Gender:</label> {user.gender}</p>
                    <p><label>Phone number:</label> {user.phoneNumber}</p></div>
                    </>
                        
                    ) : (
                        <p>User account details not available</p>
                    )
                )
            }
        </div>
    );
    
}
export default HelperAssign;