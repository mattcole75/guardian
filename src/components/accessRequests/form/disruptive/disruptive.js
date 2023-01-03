import React, { useCallback } from 'react';
// import { useForm } from 'react-hook-form';
import DisruptiveImpact from './disruptiveImpact/disruptiveImpact';
import OperationalImpact from './operationalImpact/operationalImpact';
import Approvals from './approvals/approvals';
import { useSelector } from 'react-redux';

const Disruptive = (props) => {

    const { disruptive, save, recordLocked } = props;

    // const { register } = useForm({
    //     mode: 'onChange',
    //     defaultValues: {
    //         disruptive: request && request.isDisruptive,
    //     }
    // });

    const roles = useSelector(state => state.auth.roles);

    const onSave = useCallback((data) => {
        save(data);
    }, [save]);

    return (
        <div>
            <div>
                <div className='mt-2'>
                    <nav>
                        <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                            <button
                                className='nav-link active'
                                id='nav-disruptive-access-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#nav-disruptive-access'
                                type='button'
                                role='tab'
                                aria-controls='nav-disruptive-access'
                                aria-selected='true'>
                                Impact
                            </button>
                            <button 
                                className='nav-link'
                                id='nav-operational-impact-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#nav-operational-impact'
                                type='button'
                                role='tab'
                                aria-controls='nav-operational-impact'
                                aria-selected='false'
                                tabIndex='-1'>
                                Planning Requirements
                            </button>
                            <button
                                className='nav-link'
                                id='nav-approvals-tab'
                                data-bs-toggle='tab'
                                data-bs-target='#nav-approvals'
                                type='button'
                                role='tab'
                                aria-controls='nav-approvals'
                                aria-selected='false'
                                tabIndex='-2'>
                                Approvals
                            </button>
                        </div>
                    </nav>
                    <div className='tab-content' id='nav-tab'>

                        <div className='tab-pane fade active show' id='nav-disruptive-access' role='tabpanel' aria-labelledby='nav-disruptive-access'>
                            {/* <DisruptiveImpact
                                recordLocked={recordLocked}
                                roles={roles}
                                disruptive={disruptive}
                                save={onSave}
                            /> */}
                        </div>

                        <div className='tab-pane fade' id='nav-operational-impact' role='tabpanel' aria-labelledby='nav-operational-impact-tab'>
                            {/* <OperationalImpact
                                recordLocked={recordLocked}
                                roles={roles}
                                request={request ? request : null}
                                save={save}
                            /> */}
                        </div>

                        <div className='tab-pane fade' id='nav-approvals' role='tabpanel' aria-labelledby='nav-approvals'>
                            {/* <Approvals
                                disruptive={disruptive}
                                recordLocked={recordLocked}
                                roles={roles}
                                request={request}
                                save={onSave}
                            /> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Disruptive;