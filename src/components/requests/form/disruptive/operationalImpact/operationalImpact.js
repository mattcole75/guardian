import React from 'react';
import TramImpactList from './tramImpact/list/tramImpactList';
import BusImpactList from './busImpact/list/busImpactlist';
import MaintenanceImpactList from './maintenanceImpact/list/maintenanceImpactList';
import ResourceImpactList from './resourceImpact/list/resourceImpactList';
import ExternalImpactList from './externalImpact/list/externalImpactList';
import CommunicationImpactList from './communicationsImpact/list/communicationImpactList'

const OperationalImpact = (props) => {

    const {
        request, editable, toggleTramDisruptive, selectTramDisruptive, toggleBusDisruptive, selectBusDisruptive,
        toggleMaintenanceDisruptive, selectMaintenanceDisruptive, toggleResourceDisruptive, selectResourceDisruptive,
        toggleExternalDisruptive, selectExternalDisruptive, toggleCommunicationDisruptive, selectCommunicationDisruptive
    } = props;

    return (
        <div>
            
            <div className='form-floating mb-3 p-2 text-start'>
                {/* Disruption */}
                { request
                    ?   <div>
                            <div className='border-bottom'>
                                <TramImpactList request={request} editable={editable} toggle={toggleTramDisruptive} select={selectTramDisruptive} />
                            </div>
                            <div className='border-bottom'>
                                <BusImpactList request={request} editable={editable} toggle={toggleBusDisruptive} select={selectBusDisruptive} />
                            </div>
                            <div className='border-bottom'>
                                <MaintenanceImpactList request={request} editable={editable} toggle={toggleMaintenanceDisruptive} select={selectMaintenanceDisruptive} />
                            </div>
                            <div className='border-bottom'>
                                <ResourceImpactList request={request} editable={editable} toggle={toggleResourceDisruptive} select={selectResourceDisruptive} />
                            </div>
                            <div className='border-bottom'>
                                <ExternalImpactList request={request} editable={editable} toggle={toggleExternalDisruptive} select={selectExternalDisruptive} />
                            </div>
                            <div>
                                <CommunicationImpactList request={request} editable={editable} toggle={toggleCommunicationDisruptive} select={selectCommunicationDisruptive} />
                            </div>
                        </div>
                    :   null
                }
            </div>
        </div>
    );
}

export default OperationalImpact;