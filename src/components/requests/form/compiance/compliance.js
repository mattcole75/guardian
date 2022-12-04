import React from 'react';
import moment from 'moment';

const Approvals = (props) => {

    const { disruptive } = props;

    const { requestorName, accessRequestCreated, disruptionSubmittedDate, accessFirstDay } = disruptive;

    return (
        <div className='m-3'>
            <div className='row border rounded mb-2 p-2'>
                <div className='form-floating text-start'>
                    <h3 className='h5 text-muted'>Approvals</h3>

                    
                    <div>
                        <table className='w-100 table table-sm table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Task</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>User</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Date</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Compliance</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* first row access request created compliance */}
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Access request raised
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            {requestorName}
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            {moment(accessRequestCreated).format('YYYY-MM-DD HH:mm')}
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            { moment(accessFirstDay).diff(moment(accessRequestCreated), 'week') < 14
                                                ?   `Not compliant by ${14 - moment(accessFirstDay).diff(moment(accessRequestCreated), 'week')} weeks`
                                                :   `Compliant`
                                            }
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                    </td>
                                </tr>

                                {/* second row disruptive notification compliance */}
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Disruptive request raised
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            {requestorName}
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            {moment(disruptionSubmittedDate).format('YYYY-MM-DD HH:mm')}
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            { moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week') < 14
                                                ?   `Not compliant by ${14 - moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week')} weeks`
                                                :   `Compliant`
                                            }
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                    </td>
                                </tr>
                                {/* <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            KAM proposes operational plan
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Submitted by John Doe
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            15 Nov 2022 13:45
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Compliant
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Plan Submitted</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            TfGM Review and Approve Plan
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Approved by Joe Bloggs
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            17 Nov 2022 17:34
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Compliant
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Plan Approved</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className='border-bottom'>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Plan Enforced
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Confirmed by John Doe
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            20 Nov 2022 17:34
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            Compliant
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3 text-end'>
                                        <div className='dropdown'>
                                            <div className='table-item_col'>
                                                <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                                    <span className='bi-three-dots-vertical fs-7' />
                                                </div>
                                                <ul className='dropdown-menu fs-7'>
                                                    <li><button type='button' className='dropdown-item' onClick={ () => {} }>Plan Enforced</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr> */}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approvals;