import React from 'react';

const Risks = (props) => {

    const { users, toggle } = props;

    const selectUserItem = (item) => {
        toggle(item);
    }
    
    return (
        <div className='container'>
            <hr className='mb-3' />
            <div className='row mb-2'>
                <table className='table table-striped table-hover cursor-pointer'>
                    <thead>
                        <tr>
                            <th scope="col">Display Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((item, index) => (
                            <tr key={item.uid} onClick={() => selectUserItem(item)}>
                                <td>{item.displayName}</td>
                                <td>{item.email}</td>
                                <td>{item.disabled 
                                        ? <span className='badge text-nowrap bg-danger'>Disabled</span>
                                        : <span className='badge text-nowrap bg-success'>Active</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default Risks;