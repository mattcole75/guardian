import React from 'react';
import moment from 'moment';
import TramImpactList from './tramImpact/tramImpactList';
import CustomerOperationsList from './customerOperations/customerOperationsList';
import AdditionalCommunications from './additionalCommunications/additionalCommunications';
import OperationalConsiderations from './operationalConsiderations/operationalConsiderations';
import SystemDisruption from './systemDisruption/systemDisruption';

const OperationalImpact = (props) => {

    const { save, roles, request, recordLocked } = props;
    const { disruptionSubmittedDate, disruptionSubmittedStatus } = request;
    const isPlanner = roles.includes('planner');

    const onSubmit = () => {
        save({ 
            disruptionSubmittedStatus: 'Submitted',
            disruptionSubmittedDate: disruptionSubmittedDate ? disruptionSubmittedDate : moment().format()
        });
    }

    return (
        <div>
            <div className='form-floating mb-3 p-2 text-start'>   
                { request
                    ?   <div>
                            <div className='border-bottom'>
                                <TramImpactList save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                            <div className='border-bottom mt-2'>
                                <CustomerOperationsList save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                            <div className='border-bottom'>
                                <AdditionalCommunications save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                            <div className='border-bottom'>
                                <SystemDisruption save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                            <div className='border-bottom mt-2'>
                                <OperationalConsiderations save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                            { (isPlanner === true && (disruptionSubmittedStatus == null || disruptionSubmittedStatus === 'Not Submitted' || disruptionSubmittedStatus === 'Rejected'))// and disription status not submitted or rejected and request status is good
                                ?   <div>
                                        <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ onSubmit }>Submit for Approval</button>
                                    </div>
                                :   null
                            }
                        </div>
                    :   null
                }
            </div>
        </div>
    );
}

export default OperationalImpact;