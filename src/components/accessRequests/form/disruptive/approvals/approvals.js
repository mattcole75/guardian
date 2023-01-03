import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Approvals = (props) => {

    const { save, roles, request } = props;
    const { disruptiveSubmissionNotes, disruptionSubmittedDate, disruptionSubmittedBy, disruptiveAuthorityUpdatedBy, disruptionAuthorityUpdatedDate, disruptiveSubmissionAuthorityNotes, disruptiveStatus } = request;
    const isPlanner = roles.includes('planner');
    const isDisruptiveAuthority = roles.includes('disruptionAuthority');

    const { displayName } = useSelector(state => state.auth);

    const [submissionNote, setSubmissionNote] = useState(disruptiveSubmissionNotes ? disruptiveSubmissionNotes : '');
    const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
    const [submissionAuthorityNote, setSubmissionAuthorityNote] = useState(disruptiveSubmissionAuthorityNotes ? disruptiveSubmissionAuthorityNotes : '');
    const [submitAuthorityButtonEnabled, setSubmitAuthorityButtonEnabled] = useState(false)

    let isLocked = false;
    if(disruptiveStatus === 'Submitted' || disruptiveStatus === 'Approved') {
        isLocked = true;
    }

    useEffect(() => {
        if(submissionNote.length > 5)
            setSubmitButtonEnabled(true);
            
        if(submissionNote.length <= 5)
            setSubmitButtonEnabled(false);
        
        if(submissionAuthorityNote.length > 5)
            setSubmitAuthorityButtonEnabled(true);
        
        if(submissionAuthorityNote <= 5)
            setSubmitAuthorityButtonEnabled(false);

    }, [submissionNote, submissionAuthorityNote]);

    const onSubmitToDisruptionAuthority = () => {
        save({
            disruptiveStatus: 'Submitted',
            disruptiveSubmissionNotes: submissionNote,
            disruptionSubmittedBy: displayName,
            disruptionSubmittedDate: disruptionSubmittedDate ? disruptionSubmittedDate : moment().format()
        });
    }

    const onDecline = () => {
        save({
            disruptiveStatus: 'Declined',
            disruptiveSubmissionAuthorityNotes: submissionAuthorityNote,
            disruptiveAuthorityUpdatedBy: displayName,
            disruptionAuthorityUpdatedDate: moment().format()
        });
    }

    const onApprove = () => {
        save({
            disruptiveStatus: 'Approved',
            disruptiveSubmissionAuthorityNotes: submissionAuthorityNote,
            disruptiveAuthorityUpdatedBy: displayName,
            disruptionAuthorityUpdatedDate: moment().format()
        });
    }

    const disruptionAuthorityMessageStyle =  
        disruptiveStatus === 'Approved' 
            ? 'alert-success' 
            : disruptiveStatus === 'Declined' 
                ? 'alert-danger' 
                : null;

    return (
        <div className='m-3'>
            <div className='row border rounded mb-2 p-2'>
                <div className='form-floating text-start'>
                    <h3 className='h5 text-muted'>Submit Disruptive for Approval</h3>
                    <div className='border-bottom mb-3'>

                        <div className='form-floating mb-3'>
                            <textarea
                                className='form-control'
                                id='disruptiveSubmissionNotes'
                                rows='5' style={{height:'auto'}}
                                value={submissionNote}
                                placeholder='Request description'
                                disabled={ (!isPlanner && !isLocked) || isLocked }
                                onChange={(event => {setSubmissionNote(event.target.value)})}
                            />
                            <label htmlFor='disruptiveSubmissionNotes' className='form-label'>Disruptive Submission Notes</label>
                        </div>
                        { (isPlanner && !isLocked && disruptiveStatus !== 'Declined')
                            ?   <div className='form-floating'>
                                    <button className='w-100 btn btn-lg btn-primary' type='button' disabled={!submitButtonEnabled} onClick={ onSubmitToDisruptionAuthority }>Submit for Approval</button>
                                </div>
                            :   null
                        }

                        { disruptionSubmittedDate && (disruptiveStatus === 'Approved' || disruptiveStatus === 'Declined' || disruptiveStatus === 'Submitted')
                            ?   <div className='alert alert-success' role='alert'>
                                    Submitted by {disruptionSubmittedBy} on {moment(disruptionSubmittedDate).format('YYYY-MM-DD HH:mm')}
                                </div>
                            :   (isPlanner || isDisruptiveAuthority)
                                    ?   null
                                    :   <div className='alert alert-warning' role='alert'>
                                            Not submitted yet!
                                        </div>
                        }
                        
                    </div>

                    <h3 className='h5 text-muted'>Disruption Authority Approval</h3>
                    <div className='mb-3'>

                        <div className='form-floating mb-3'>
                            <textarea
                                className='form-control'
                                id='disruptiveSubmissionAuthorityNotes'
                                rows='5' style={{height:'auto'}}
                                value={submissionAuthorityNote}
                                placeholder='Request description' 
                                disabled={ !isDisruptiveAuthority || (disruptiveStatus === 'Approved' || disruptiveStatus === 'Declined') }
                                onChange={(event => {setSubmissionAuthorityNote(event.target.value)})}
                            />
                            <label htmlFor='disruptiveSubmissionAuthorityNotes' className='form-label'>Disruption Authority Notes</label>
                        </div>

                        { isDisruptiveAuthority && disruptiveStatus !== 'Declined' && disruptiveStatus !== 'Approved'
                            ?   <div className='row g-2'>
                                    <div className='form-floating col-sm-6'>
                                        <button className='w-100 btn btn-lg btn-success' type='button' disabled={ !submitAuthorityButtonEnabled } onClick={ onApprove }>Approved</button>
                                    </div>
                                    <div className='form-floating col-sm-6'>
                                        <button className='w-100 btn btn-lg btn-danger' type='button' disabled={ !submitAuthorityButtonEnabled } onClick={ onDecline }>Declined</button>
                                    </div>
                                </div>
                            : null
                        }

                        { disruptionAuthorityUpdatedDate && (disruptiveStatus === 'Approved' || disruptiveStatus === 'Declined')
                            ?   <div className={ 'alert ' + disruptionAuthorityMessageStyle } role='alert'>
                                    {disruptiveStatus} by {disruptiveAuthorityUpdatedBy} on {moment(disruptionAuthorityUpdatedDate).format('YYYY-MM-DD HH:mm')}
                                </div>
                            :   (isDisruptiveAuthority)
                                ?   null
                                :   <div className='alert alert-warning' role='alert'>
                                        Not approved yet!
                                    </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;