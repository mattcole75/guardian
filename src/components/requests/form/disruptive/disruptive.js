import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import DisruptiveAccessSummary from './disruptiveAccessSummary/disruptiveAccessSummary';
import OperationalImpact from './operationalImpact/operationalImpact';
import Approvals from './approvals/approvals';
import { useSelector } from 'react-redux';

const Disruptive = (props) => {

    const { request, save, recordLocked } = props;

    const { register } = useForm({
        mode: 'onChange',
        defaultValues: {
            disruptive: request && request.isDisruptive,
        }
    });

    const roles = useSelector(state => state.auth.roles);
    const [ isDisruptive, setIsDisruptive ] = useState(request && request.isDisruptive);


    const toggleDisruptive = () => {
        setIsDisruptive(prevState => !prevState);
        onSave({ isDisruptive: !isDisruptive });
    }

    const onSave = useCallback((data) => {
        save(data);
    }, [save]);

    return (
        <div>
            <div>

                {/* Disruptive section */}
                <div className='border rounded p-1 mb-1 bg-light'>
                    <div className='list-group mx-0'>
                        <label className='list-group-item d-flex gap-2'>
                            <div className='form-check form-switch'>
                                <input className='form-check-input' type='checkbox' role='switch' id='disruptive'
                                    disabled={recordLocked}
                                    {...register('disruptive', { onChange:  toggleDisruptive })}
                                />
                            </div>
                            <span className='text-start'>
                                Is this Access Request likely to cause disruption?
                                <small className='d-block text-muted'>Indicate if this access request is likely to cause disruption to Metrolink services. A Metrolink representative will review and compile a list of requirements for the proposed disruptive access which will be agreed or rejected by TfGM.</small>
                            </span>
                        </label>
                    </div>

                    <p className='h4 mt-2'>For official use only</p>
                    
                    { isDisruptive
                        ?    <div className='mt-2'>
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
                                            Disruptive Access
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
                                            Operational Impact
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
                                        <DisruptiveAccessSummary
                                            recordLocked={recordLocked}
                                            roles={roles}
                                            request={request}
                                            save={onSave}
                                        />
                                    </div>

                                    <div className='tab-pane fade' id='nav-operational-impact' role='tabpanel' aria-labelledby='nav-operational-impact-tab'>
                                        <OperationalImpact
                                            recordLocked={recordLocked}
                                            roles={roles}
                                            request={request ? request : null}
                                            save={save}
                                        />
                                    </div>

                                    <div className='tab-pane fade' id='nav-approvals' role='tabpanel' aria-labelledby='nav-approvals'>
                                        <Approvals
                                            recordLocked={recordLocked}
                                            roles={roles}
                                        />
                                    </div>

                                </div>
                            </div>
                        :   null
                    }
                </div>

            </div>
        </div>
    );
}

export default Disruptive;