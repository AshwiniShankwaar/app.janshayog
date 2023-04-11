import './ongoing.css';
import SideTaskBar from '../Task/sideTaskBar/SideTaskBar';
import { NavLink } from 'react-router-dom';
const Ongoing = ()=>{
    const requestDetails = [{
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },{
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },
    {
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },
    {
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },
    {
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },
    {
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    },
    {
        title: 'oncgoing task',
        description: 'oncgoing task description oncgoing task description oncgoing task description'+
         'oncgoing task description oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description'+
         ' oncgoing task description oncgoing task description oncgoing task description',
        date: '02/02/2023',
        time: '10:00:00'
    }]
    return (
        <>
        <div id='ongoingTask'>
            <h1>ongoing task</h1>
            {
                requestDetails.slice(0,2).map((requestDetail,index)=>{
                    return <SideTaskBar key={index} title={requestDetail.title} description={requestDetail.description} date={requestDetail.date} time={requestDetail.time} />
                })
            }
            <NavLink to={"/ongoingTasks?accountId="+1}>View all Transactions</NavLink>
        </div>
        </>
    )
}
export default Ongoing;