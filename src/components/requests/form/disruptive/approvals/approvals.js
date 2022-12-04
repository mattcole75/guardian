import React from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
// import moment from 'moment';

const Approvals = (props) => {

    const { save, roles, request, recordLocked } = props;
    const { disruptionSubmittedDate, disruptionStatus } = request;
    const isPlanner = roles.includes('planner');
    const isDisruptiveAuthority = roles.includes('disruptiveAuthority');

    const { register, getValues } = useForm({
        mode: 'onChange',
        // defaultValues: operationalConsiderationDisriptionItem ? operationalConsiderationDisriptionItem : null
    });

    let isLocked = false;
    if(disruptionStatus === 'Submitted' || disruptionStatus === 'Approved' || recordLocked){
        isLocked = true;
    }

    const onSubmit = () => {
        save({ 
            disruptionStatus: 'Submitted',
            disruptionSubmittedDate: disruptionSubmittedDate ? disruptionSubmittedDate : moment().format()
        });
    }

    return (
        <div className='m-3'>
            <div className='row border rounded mb-2 p-2'>
                <div className='form-floating text-start'>
                    <h3 className='h5 text-muted'>Submit Disruptive for Approval</h3>
                    <div className='border-bottom mb-3'>
                        <div className='form-floating mb-3'>
                            <textarea className='form-control' id='disruptiveSubmissionNotes'  rows='5' style={{height:'auto'}} placeholder='Request description' required 
                                disabled={(isPlanner === false && isLocked === false) || isLocked}
                                {...register('disruptiveSubmissionNotes', { required: true, minLength: 5 })}
                            />
                            <label htmlFor='disruptiveSubmissionNotes' className='form-label'>Disruptive Submission Notes</label>
                        </div>
                        { (isPlanner === true && isLocked === false) || isLocked
                            ?   <div className='form-floating mb-3'>
                                    <button className='w-100 btn btn-lg btn-primary' type='button' disabled={false} onClick={() => {}}>Submit for Approval</button>
                                </div>
                            :   null
                        }
                        <p>Submitted by person on this date</p>
                    </div>

                    <h3 className='h5 text-muted'>Disruption Authority Approval</h3>
                    <div className='mb-3'>
                        <div className='form-floating mb-3'>
                            <textarea className='form-control' id='disruptiveSubmissionNotes'  rows='5' style={{height:'auto'}} placeholder='Request description' required 
                                disabled={(isPlanner === false && isLocked === false) || isLocked}
                                {...register('disruptiveSubmissionNotes', { required: true, minLength: 5 })}
                            />
                            <label htmlFor='disruptiveSubmissionNotes' className='form-label'>Disruption Authority Notes</label>
                            {
                            <div className='row g-2 mt-2'>
                                <div className='form-floating  col-sm-6'>
                                    <button className='w-100 btn btn-lg btn-success' type='button' disabled={false} onClick={() => {}}>Approved</button>
                                </div>
                                <div className='form-floating col-sm-6 mb-1'>
                                    <button className='w-100 btn btn-lg btn-danger' type='button' disabled={false} onClick={() => {}}>Declined</button>
                                </div>
                            </div>
                            }
                            <p>Approved/Rejected by person on this date</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;