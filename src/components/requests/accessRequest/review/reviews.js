import React from 'react';
import { useSelector } from 'react-redux';
import ReviewItem from './reviewItem';

const Reviews = (props) => {

    const request = useSelector(state => state.requests.request);
    const { toggle, select } = props;
    return (
        <div>
            <h6 className="h6 text-start">Access request review comments:</h6>
            {request && request.requestStatus === 'Submitted for approval'
                ? <div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={toggle} >Add review comment</button>
                </div>
             : null
            }
            
            <div className="list-group mb-3 text-start">
                {request
                    ? request && request.reviewItems.map((item, index) => {
                        return(<ReviewItem key={index} index={index} item={item} toggle={toggle} select={select} />);
                    })
                    : <span>No comments</span>
                }
            </div>
        </div>
    );
}

export default Reviews;