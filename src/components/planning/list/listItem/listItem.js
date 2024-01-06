import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../../planning.css';

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
            statusCSS.push('bg-info');
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
        case 'Cancelled':
            statusCSS.push('bg-info')
            break;
        default:
            break;
    }

    let categoryCSS = [];
    categoryCSS.push('border-bottom cursor-pointer');

    switch(item.possessionCategory) {

        case 'Third Party Works':
            categoryCSS.push('bg-ThirdPartyWorks text-dark');
            break;
        case 'Disruptive Possession':
            categoryCSS.push('bg-DisruptivePossession text-dark');
            break;
        case 'Wheels Free Required':
            categoryCSS.push('bg-WheelsFreeRequired text-light');
            break;
        case 'Conflict/Conflicting Information':
            categoryCSS.push('bg-ConflictConflictingInformation text-light');
            break;
        case 'Cancelled Works':
            categoryCSS.push('bg-CancelledWorks text-danger');
            break;
        case 'Changed Works':
            categoryCSS.push('bg-ChangedWorks');
            break;
        case 'Day Works':
            categoryCSS.push('bg-DayWorks text-dark')
            break;
        case 'No Possession Req/Blue Permit Works':
            categoryCSS.push('bg-NoPossessionReqBluePermitWorks text-light')
            break;
        default:
            break;
    }

    const open = () => {
        navigate(`/accessrequest/${item.uid}`);
    }

    return (
        <tr className={categoryCSS.join(' ')} onClick={ open }>
            <td>{ <small className={statusCSS.join(' ')}>{ item.status }</small> }</td>
            <td>{ item.possessionCategory }</td>
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