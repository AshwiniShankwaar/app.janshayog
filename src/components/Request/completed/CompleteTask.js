import './completeTask.css';
import SideTaskBar from '../Task/sideTaskBar/SideTaskBar';
import { NavLink } from 'react-router-dom';
const CompleteTask = ()=>{
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
            <h1>Completed task</h1>
            {
                requestDetails.slice(0,5).map((requestDetail,index)=>{
                    return <SideTaskBar key={index} title={requestDetail.title} description={requestDetail.description} date={requestDetail.date} time={requestDetail.time} />
                })
            }
            <NavLink to={"/completedTasks?accountId="+1}>View all Transactions</NavLink>
        </div>
        </>
    )
}
export default CompleteTask;