import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'debounce';
import { useSelector } from 'react-redux';
import Comment from '../../comment/comment';
import moment from 'moment';

const Administration = (props) => {

    const { accessRequest, save } = props;

    const planners = useSelector(state => state.accessRequest.planners);
    const displayName = useSelector(state => state.auth.displayName);

    const [comment, setComment] = useState('');
    const [commentButtonEnabled, setCommentButtonEnabled] = useState(false);

    const { register, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            assignedPlanner: accessRequest && accessRequest.administration && accessRequest.administration.assignedPlanner
        }
    });

    useEffect(() => {
        if(comment.length > 0)
            setCommentButtonEnabled(true);
        else
            setCommentButtonEnabled(false);
    }, [comment]);

    const onUpdate = debounce(() => {

        const data = getValues()

        let updatedEventLogItems = [ ...accessRequest.eventLog ];
        updatedEventLogItems.push({
            user: displayName,
            logged: moment().format(),
            event: 'Planner (' + data.assignedPlanner + ') assigned to Access Request' });

        save({ administration: { ...data }, eventLog: updatedEventLogItems }, 'SAVE_ACCESS_REQUEST');
    }, 1000);

    const onSaveComment = useCallback(() => {

        let updatedComments = [];

        if (accessRequest.administration.comments != null)
            updatedComments = [ ...accessRequest.administration.comments ];

            updatedComments.push({
                commentator: displayName,
                logged: moment().format(),
                comment: comment
            });

        save({ administration: { comments: updatedComments } }, 'SAVE_ACCESS_REQUEST');
        setComment('');
        
    }, [comment, displayName, accessRequest, save]);

    return (
        <div>
            <div className='mb-3'>

                {/* Administration section */}
                <div className='form-floating mb-3'>
                    <select className='form-select' id='assignedPlanner' required
                        {...register('assignedPlanner', { required: true, onChange: onUpdate })}>
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
                        <div className='mb-2'>
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
                            (accessRequest && accessRequest.administration && accessRequest.administration.comments) && accessRequest.administration.comments.map((item, index) => (<Comment key={index} comment={item} />))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Administration;