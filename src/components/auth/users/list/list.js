import React from 'react';
import ListItem from '../listItem/listItem';

const Risks = (props) => {

    const { users, toggle } = props;

    const selectUser = (item) => {
        toggle(item);
    }
    
    return (

        <table className='w-100 table table-hover table-borderless table-sm align-middle bg-light border-start border-end shadow-sm fs-7'>
                <thead className='border-bottom'>
                    <tr className='w-auto'>
                        <th className='ps-3 pe-3 table-verticle_cente'><div>Name</div></th>
                        <th className='ps-3 pe-3 table-verticle_center table-item_hide'><div className='table-item_col'>Email</div></th>
                        <th className='ps-3 pe-3'>Status</th>
                        <th className='ps-3 pe-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map((item, index) => {
                            console.log(item);
                            return <ListItem key={index} item={item} selectUser={selectUser} />
                        })
                    }
                </tbody>
            </table>

        // <div className='container'>
        //     <hr className='mb-3' />
        //     <div className='row mb-2'>
        //         <table className='table table-striped table-hover cursor-pointer'>
        //             <thead>
        //                 <tr>
        //                     <th scope="col">Display Name</th>
        //                     <th scope="col">Email</th>
        //                     <th scope="col">Status</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {users && users.map((item, index) => (
        //                     <tr key={item.uid} onClick={() => selectUserItem(item)}>
        //                         <td>{item.displayName}</td>
        //                         <td>{item.email}</td>
        //                         <td>{item.disabled 
        //                                 ? <span className='badge text-nowrap bg-danger'>Disabled</span>
        //                                 : <span className='badge text-nowrap bg-success'>Active</span>
        //                             }
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
                
        //     </div>
        // </div>
    );
}

export default Risks;