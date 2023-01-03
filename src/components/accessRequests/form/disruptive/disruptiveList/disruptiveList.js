import React from 'react';
import DisruptiveListItem from './disruptiveListItem/disruptiveListItem';

const DisruptiveList = (props) => {

    const { disruptives, toggle, select, roles } = props;

    const isPlanner = roles.includes('planner');

    return (
        <div>
            <div className='row g-2'>
                <div className='form-floating  col-sm-6'>
                    { disruptives && disruptives.length > 1
                        ?   <p className='text-start text-muted'>There are { disruptives.length } disruptives</p>
                        :   disruptives.length === 1
                            ?   <p className='text-start text-muted'>There is 1 disruptive</p>
                            :   <p className='text-start text-muted'>Review request and add disruptive details</p>
                    }
                   
                </div>
                <div className='form-floating col-sm-6 mb-1'>
                    {isPlanner
                        ?   <div className='text-end mb-3' role='group' aria-label='Basic example'>
                                <button type='button' className='btn btn-primary' onClick={ toggle }>Add Disruptive</button>
                            </div>
                        :   null
                    }
                </div>
            </div>

            { disruptives && disruptives.length > 0
                ?   <div className='list-group mb-3 text-start'>
                        {
                            disruptives && disruptives.map((item, index) => {
                                return(<DisruptiveListItem
                                            key={index}
                                            index={index}
                                            toggle={toggle}
                                            select={select}
                                            item={item}
                                        />);
                            })
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no disruptives registered</div>
           }
        </div>
    );
}

export default DisruptiveList;