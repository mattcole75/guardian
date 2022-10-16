import React from 'react';

const Approvals = () => {

    return (
        <div className='m-3'>
            <div className='row border rounded mb-2 p-2'>
                <div className='form-floating text-start'>
                    <h3 className='h5 text-muted'>Approvals</h3>
                    <div>
                        <table className='w-100 table table-sm table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Organisation</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Status</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Date</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Operator
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Approved by Matt Cole
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            16 Oct 2022 09:23
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Approve</button></li>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Reject</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Requestor
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Approve</button></li>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Reject</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            TfGM
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Approve</button></li>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Reject</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;