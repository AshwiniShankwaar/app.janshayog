import './requestRegister.css';
const RequestRegister = () =>{
    return(
        <>

        <h2>Enter your Request details</h2>
            <div className="div">
                <input type="text" placeholder="Enter your request title" />
                <label htmlFor='date'>Date: </label>
                <input type="date" name='date' />
                <label htmlFor='time'>Time: </label>
                <input type="time" name='time'/>
            </div>
            <div className="div">
                <label htmlFor='street'>Address to visist:</label>
                <input type="text" name='street' placeholder='Street/Locality'/>
                <input type="text" name='addressLine1' placeholder='AddressLine1' />
            </div>
            <div className="div">
                <input type="text" name='AddressLine2' placeholder='AddressLine2/city'/>
            </div>
            <div className="div">
                <label htmlFor='District'>District: </label>
                <input type="text" name='District' />
                <label htmlFor='state'>State: </label>
                <input type="text" name='state' />
                <label htmlFor='zip'>Pincode: </label>
                <input type="text" name='zip' />
            </div>
            <div className="div">
                <label htmlFor="timePeriod">Time period:</label>
                <input type="text" name='timePeriod' placeholder='Time period '/>
                <label htmlFor="noPeople">Number of people:</label>
                <input type="number" name='noPeople' placeholder='Number of people'/>
            </div>
            <div id="skills" className="div">
                <label htmlFor="skills">Skills required</label>
                <input type="text" name='skills' placeholder='Separate the skills using , to make it easily visible to helpers' />
                <label htmlFor="amount">Payable Amount:</label>
                <input type="number" name='amount' placeholder='Amount'/>
            </div>
            <div id="description" className="div">
                <label htmlFor="description">Description:</label>
                <textarea name='description' placeholder='Description' rows="4" cols="50"></textarea>
            </div>
           
            <div className='checkbox' >
            <input type='checkbox' name='eligal'/>
            <label htmlFor="eligal"> No eligal activity is performed.</label>
            </div>
            <div className='checkbox'>
            <input type='checkbox' name='agree'/>
                <label htmlFor="agree"> Details provided are valied and i agree to the JanShayog term and condition. </label>

            </div>
            <button>Submit</button>
        </>
    )
}
export default RequestRegister;