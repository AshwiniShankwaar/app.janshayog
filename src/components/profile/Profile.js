import './profile.css';
import Navbar from '../navbar/Navbar.js';
import Tabs from './tabs/Tabs.js';

const Profile = () =>{
    return(
        <div id='profile'>
            <Navbar/>
            <div id='profileBody'>
                <Tabs/>
            </div>
        </div>
    )
}

export default Profile;