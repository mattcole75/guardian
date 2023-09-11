import React from 'react';
// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListItem from '../listItem/listItem';

const List = (props) => {

    const { accessRequests, displayName } = props;
    const roles = useSelector(state => state.auth.roles);

    const isPlanner = roles.includes('planner');

    return (
        <div>
            <table className='w-100 table table-hover table-borderless table-sm align-middle bg-light border-start border-end shadow-sm fs-7'>
                <thead className='border-bottom'>
                    <tr className='w-auto'>
                        <th className='ps-3 pe-3 table-verticle_cente'><div className='table-item_col'>Title</div></th>
                        <th className='ps-3 pe-3 table-verticle_center table-item_hide'><div className='table-item_col'>Organistion</div></th>
                        <th className='ps-3 pe-3 table-verticle_center table-item_hide'><div className='table-item_col'>Requestor</div></th>
                        <th className='ps-3 pe-3 table-verticle_center'><div className='table-item_col'>First Day</div></th>
                        <th className='ps-3 pe-3'>Status</th>
                        <th className='ps-3 pe-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {   accessRequests.map((item, index) => (
                            <ListItem key={index} item={item} isPlanner={isPlanner} displayName={displayName} />
                        ))
                    }
                </tbody>
                
            </table>

            { accessRequests.length === 0
                ?   <div className='alert alert-warning text-sm-center' role='alert'>There are no Access Requests</div>
                :   null
            }
        </div>

        // <div className='mb-2 mt-3'>
        //     {/* <div className='row g-2 border-bottom mb-3'> */}
        //     <div className='d-flex gap-2 w-100 justify-content-between mb-3'>
        //         <div className=''>
        //             <h3 className='h3 text-muted'>Access Requests</h3>
        //         </div>
        //         <div className=''>
        //             <div className='btn-group float-end' role="group" aria-label='Basic example'>
        //                 <Link className='btn btn-primary rounded-2 me-3' to={`/accessrequest/new`}>New</Link>
        //             </div>
        //         </div>
        //     </div>
        
        //     { accessRequests.length > 0
        //         ?   <div className='list-group shadow'>
        //                 {accessRequests.map((item, index) => (
        //                     <ListItem key={index} item={item} isPlanner={isPlanner} displayName={displayName} />
        //                 ))}
        //             </div>
        //         :   <div className='alert alert-warning text-sm-center' role='alert'>There are no Access Requests</div>
        //     }
        // </div>
    );
}

export default List;