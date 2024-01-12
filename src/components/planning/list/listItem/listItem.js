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
            <td className={ item.possessionCategory === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.possessionCategory }</td>
            <td>{ item.organisation }</td>
            <td>{ moment(item.startDate).format('DD/MM/YYYY') }</td>
            <td>{ moment(item.endDate).format('DD/MM/YYYY') }</td>
            <td className={ item.escalatedDate === '' ? '' : 'bg-escalatedDate'}>{ item.escalatedDate === '' ? item.escalatedDate :  moment(item.escalatedDate).format('DD/MM/YYYY') }</td>
            <td className={ item.possessionDetails === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.possessionDetails }</td>
            <td className={ item.possessionDetails === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.coLocate === 'TBC' ? item.coLocate : item.coLocate === true ? 'Yes' : 'No'}</td>
            <td className={ item.picop === 'TBC' ? 'bg-TBC-Priority1' : '' }>{ item.picop }</td>
            <td className={ item.pic === 'TBC' ? 'bg-TBC-Priority1' : ''  }>{ item.pic }</td>
            <td className={ item.picop === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.nwrAdjacent === 'TBC' ? item.nwrAdjacent : item.nwrAdjacent === true ? 'Yes' : 'No' }</td>
            <td className={ item.line === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.line }</td>
            <td>{ item.siteDescription }</td>
            <td className={ item.isolationType === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.isolationType }</td>
            <td className={ item.isolationDetails === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.isolationDetails }</td>
            <td>{ item.startTime }</td>
            <td>{ item.endTime }</td>
            <td className={ item.worksiteLimits === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.worksiteLimits }</td>
            
            <td className={ item.safetyResourceRequired  ? 'bg-safetyResource' : item.safetyResourceRequired ? 'bg-TBC-Priority2' : ''}>{ item.safetyResourceRequired ? 'Yes' : 'No' }</td>
            
            <td className={ item.signallingResourceRequired ? 'bg-signallingResource' : item.signallingResourceRequired ? 'bg-TBC-Priority2' : ''}>{ item.signallingResourceRequired ? 'Yes' : 'No' }</td>
            <td className={ item.electricalResourceRequired ? 'bg-electricalResource' : item.electricalResourceRequired ? 'bg-TBC-Priority2' : ''}>{ item.electricalResourceRequired ? 'Yes' : 'No' }</td>
            <td>{ item.testTramsRequired === 'TBC' ? item.testTramsRequired : item.testTramsRequired ? 'Yes' : 'No' }</td>
            <td className={ 
                item.tramConfigurationType === 'TBC' 
                    ?   'bg-TBC-Priority2' 
                    :   item.tramConfigurationType === 'Any (M5000)'
                        ?   'bg-tramAny'
                        :   item.tramConfigurationType === 'Single (M5000)'
                            ?   'bg-tramSingle'
                            :   item.tramConfigurationType === 'Double (M5000)'
                                ?   'bg-tramDouble'
                                :   '' }>{ item.tramConfigurationType }</td>
            <td className={ item.onTrackMachineCount === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.onTrackMachineCount }</td>
            <td className={ item.rrvType === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.rrvType }</td>
            <td className={ item.trolleyType === 'TBC' ? 'bg-TBC-Priority2' : item.trolleyType === 'TBC' || item.trolleyType === 'Not Applicable' ? '' : 'bg-Trolly' }>{ item.trolleyType }</td>
            <td className={ item.heavyMachineType === 'TBC' ? 'bg-TBC-Priority2' : '' }>{ item.heavyMachineType }</td>
            <td className={ item.withinDisruptivePossession === 'TBC' ? 'bg-TBC-Priority2' : item.withinDisruptivePossession === true ? 'bg-withinDisruptivePosession' : '' }>{ item.withinDisruptivePossession === 'TBC'? item.withinDisruptivePossession : item.withinDisruptivePossession === true ? 'Yes' : 'No' }</td>
            <td>{ item.siteRemarks }</td>
            <td>{ moment(item.updated).fromNow() }</td>
        </tr>   
    );
}

export default ListItem;