import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DisruptiveSummary from '../../form/disruptive/operationalImpact/disruptiveSummary/disruptiveSummary';
import TramImpactList from './operationalImpact/tramImpact/tramImpactList';
import OperationImpactList from './operationalImpact/operationImpact/operationImpactList';
import AdditionalCommunication from './operationalImpact/additionalCommunication/additionalCommunication';
import SystemDisruption from './operationalImpact/systemDisruption/systemDisruption';
import OperationalConsiderations from './operationalImpact/operationalConsiderations/operationalConsiderations';

const DisruptiveForm = (props) => {

    const { toggle, save, disruptive, eventLog, logEvent } = props;

    let id = null;
    if(disruptive != null) {
        id = Object.keys(disruptive)[0];
    }

    const { displayName, roles } = useSelector(state => state.auth);

    const isPlanner = roles.includes('planner');
    const isDisruptionAuthority = roles.includes('disruptionAuthority');

    const onSubmit = useCallback(() => {
        // Create a copy of the access request event log
        let updatedEventLogItems = [ ...eventLog ];
        // update the disruptive status
        save(id, { status: 'Submitted'} );
        // add new event to the access request event log
        updatedEventLogItems.push({ user: displayName, logged: moment().format(), event: disruptive[id].summary.disruptiveTitle + ' disruptive submitted for approval' });
        logEvent({ eventLog: updatedEventLogItems }, 'SAVE_ACCESS_REQUEST');
        // close the modal
        toggle();

    }, [displayName, disruptive, eventLog, id, logEvent, save, toggle]);

    const onDecline = useCallback(() => {

    }, []);

    const onApprove = useCallback(() => {

    }, []);

    return (
        <div className='form-request my-1'>
            <h1 className='h3 mb-3 fw-normal text-start'>Disruptive</h1>
            
            <DisruptiveSummary save={save} roles={roles} id={id} summary={ disruptive ? disruptive[id].summary : null } status={ disruptive[id].status } />

            <TramImpactList save={save} roles={roles} id={id} tramImpactItems={ disruptive ? disruptive[id].tramImpactItems : null } status={ disruptive[id].status } />

            <OperationImpactList save={save} roles={roles} id={id} operationImpactItems={ disruptive ? disruptive[id].operationImpactItems : null } status={ disruptive[id].status } />

            <AdditionalCommunication save={save} roles={roles} id={id} additionalCommunication={ disruptive ? disruptive[id].additionalCommunication : null } status={ disruptive[id].status } />

            <SystemDisruption save={save} roles={roles} id={id} systemDisruption={ disruptive ? disruptive[id].systemDisruption : null } status={ disruptive[id].status } />

            <OperationalConsiderations save={save} roles={roles} id={id} operationalConsiderations={ disruptive ? disruptive[id].operationalConsiderations : null } status={ disruptive[id].status } />

            { isPlanner === true && (disruptive[id].status === 'Draft' || disruptive[id].status === 'Declined')
                ?   <div className='form-floating mt-3'>
                        <button className='w-100 btn btn-lg btn-primary' type='button' onClick={ onSubmit }>Submit For Approval</button>
                    </div>
                :   null
            }

            { isDisruptionAuthority === true
                ?   <div>
                        <div className='form-floating mt-3'>
                            <button className='w-100 btn btn-lg btn-success' type='button' onClick={ toggle }>Approve</button>
                        </div>
                        <div className='form-floating mt-3'>
                            <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ toggle }>Decline</button>
                        </div>
                    </div>
                :   null
            }

            <div className='form-floating mt-3'>
                <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={toggle}>Close</button>
            </div>

        </div>
    );
}

export default DisruptiveForm;