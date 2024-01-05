import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const ListItem = (props) => {

const navigate = useNavigate();
 
    
const { item } = props;

    let statusCSS = [];
    statusCSS.push('badge d-inline-block text-nowrap');

    switch(item.status) {
        case 'Draft':
            statusCSS.push('bg-secondary');
            break;
        case 'Submitted':
            statusCSS.push('bg-warning text-dark');
            break;
        case 'Under Review':
            statusCSS.push('bg-warning text-dark');
            break;
        case 'Denied':
            statusCSS.push('bg-danger');
            break;
        case 'Granted':
            statusCSS.push('bg-success');
            break;
        case 'Completed':
            statusCSS.push('bg-secondary')
            break;
        case 'Deleted':
            statusCSS.push('bg-info')
            break;
        default:
            break;
    }

    const open = () => {
        navigate(`/accessrequest/${item.uid}`);
    }

    return (
        <tr className='border-bottom cursor-pointer' onClick={ open }>
            <td>{ <small className={statusCSS.join(' ')}>{ item.status }</small> }</td>
            <td>{ moment(item.startDate).format('DD/MM/YYYY') }</td>
            <td>{ moment(item.endDates).format('DD/MM/YYYY') }</td>
            <td>{ item.possessionDetails }</td>
            <td>{ item.coLocate === 'Not Set' ? item.coLocate : item.coLocate ? 'Yes' : 'No'}</td>
            <td>{ item.picop }</td>
            <td>{ item.nwrAdjacent === 'Not Set' ? item.nwrAdjacent : item.nwrAdjacent ? 'Yes' : 'No' }</td>
            <td>{ item.pic }</td>
            <td>{ item.line }</td>
            <td>{ item.organisation }</td>
            <td>{ item.siteDescription }</td>
            <td>{ item.isolationType }</td>
            <td>{ item.isolationDetails }</td>
            <td>{ item.startTime }</td>
            <td>{ item.endTime }</td>
            <td>{ item.worksiteLimits }</td>
            <td>{ item.signallingResourceRequired === 'Not Set' ? item.signallingResourceRequired : item.signallingResourceRequired ? 'Yes' : 'No' }</td>
            <td>{ item.electricalResourceRequired === 'Not Set' ? item.electricalResourceRequired : item.electricalResourceRequired ? 'Yes' : 'No' }</td>
            <td>{ item.testTramsRequired === 'Not Set' ? item.testTramsRequired : item.testTramsRequired ? 'Yes' : 'No' }</td>
            <td>{ item.onTrackMachineCount }</td>
            <td>{ item.rrvType }</td>
            <td>{ item.trolleyType }</td>
            <td>{ item.heavyMachineType }</td>
            <td>{ item.siteRemarks }</td>
            <td>{ moment(item.updated).fromNow() }</td>
        </tr>
    );
}

export default ListItem;