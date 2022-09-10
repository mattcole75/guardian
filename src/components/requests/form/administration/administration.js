import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Comment from '../../comment/comment';
import moment from 'moment';

const Administration = (props) => {

    const { request, save } = props;

    const planners = useSelector(state => state.requests.planners);
    const displayName = useSelector(state => state.auth.displayName);

    const [comment, setComment] = useState('');
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            assignedPlanner: request && request.assignedPlanner
        }
    });

    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    }, [comment]);

    const onSave = useCallback((data) => {
        save({ ...data, status: 'Under Review' }, 'SAVE_REQUEST');
    }, [save]);

    const onSaveComment = useCallback(() => {

        let updatedComments = [];

        if (request.administrationComments != null)
            updatedComments = [ ...request.administrationComments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

        save({ administrationComments: updatedComments }, 'SAVE_REQUEST');
        setComment('');
        
    }, [comment, displayName, request, save]);



    return (
        <div>
            <div className='mb-3'>

                {/* Administration section */}
                <div className='form-floating mb-3'>
                    <select className='form-select' id='assignedPlanner' required
                        {...register('assignedPlanner', { required: true })}>
                        <option value=''>Choose...</option>
                        {
                            planners.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))
                        }
                    </select>
                    <label htmlFor='assignedPlanner'>Assigned Planner</label>
                </div>

                <div className='border rounded p-1 mb-1 bg-light'>
                    
                    <div className='text-sm-start p-2'>
                        <div className='mb-1'>
                            <label htmlFor='comment' className='form-label'>Comments</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='comment'
                                autoComplete='off'
                                value={comment}
                                onChange={(event => {setComment(event.target.value)})}
                                placeholder='Type your message here'
                            />
                        </div>
                        <div className='text-sm-end'>
                            <button
                                className='w-25 btn btn-sm btn-primary mb-3'
                                type='button'
                                disabled={!commentButtonEnabled}
                                onClick={onSaveComment}>Send</button>
                        </div>
                    </div>
                    <div className='list-group'>
                        {
                            (request && request.administrationComments) && request.administrationComments.map((item, index) => (<Comment key={index} comment={item} />))
                        }
                    </div>
                </div>
            </div>

            <div>
                <button className='w-100 btn btn-lg btn-secondary mb-3' type='button' disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save Administration Details</button>
            </div>
        </div>
    );
}

export default Administration;