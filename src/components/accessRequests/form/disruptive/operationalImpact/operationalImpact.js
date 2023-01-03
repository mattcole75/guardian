import React from 'react';
import TramImpactList from './tramImpact/tramImpactList';
import CustomerOperationsList from './customerOperations/customerOperationsList';
import AdditionalCommunications from './additionalCommunications/additionalCommunications';
import OperationalConsiderations from './operationalConsiderations/operationalConsiderations';
import SystemDisruption from './systemDisruption/systemDisruption';

const OperationalImpact = (props) => {

    const { save, roles, request, recordLocked } = props;

    return (
        <div>
            <div className='form-floating p-2 text-start'>   
                { request
                    ?   <div>
                            <div className='border-bottom mt-2'>
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
                            <div className='mt-2'>
                                <OperationalConsiderations save={save} roles={roles} request={request} recordLocked={recordLocked} />
                            </div>
                        </div>
                    :   null
                }
            </div>
        </div>
    );
}

export default OperationalImpact;