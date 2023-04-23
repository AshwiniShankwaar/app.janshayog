import './sidetaskbar.css';
const SideTaskBar = (props) =>{
    const handleClick=()=>{
        window.location.href = "/task?requestId="+props.id;
    }
    return (
        <div id='tasksidebar' onClick={handleClick}>
            <h2>Title: {props.title.toUpperCase()}</h2>
            <p>{props.description.split(' ').slice(0,10).join(' ')}{props.description.split(' ').length > 5 ? '...' : ''}</p>
            <div id='dateandtimetask'><label>Date: {props.date}</label> <label>Time: {props.time}</label></div>
        </div>
        )
}
export default SideTaskBar;