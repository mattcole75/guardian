import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DisruptiveListItem from '../listItems/disruptiveListItem';

const DisruptiveAuthorityList = (props) => {

    const { disruptives } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');

    return (
        <div className='mb-2 mt-3'>
            <div className='row g-2 border-bottom mb-3'>
                <div className='form-floating  col-sm-6'>
                    <h3 className='h3 text-muted'>Disruptives for Review</h3>
                </div>
            </div>
        
            { disruptives.length > 0
                ?   <div className='list-group shadow'>
                        {disruptives.map((item, index) => (
                            <DisruptiveListItem key={index} item={item} isPlanner={isPlanner} />
                        ))}
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no disruptives to review</div>
            }
        </div>
    );
}

export default DisruptiveAuthorityList;