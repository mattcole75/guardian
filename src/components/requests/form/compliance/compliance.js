import React from 'react';
import moment from 'moment';

const Compliance = (props) => {

    const { disruptive } = props;

    const { disruptiveStatus, requestorName, accessRequestCreated, disruptionSubmittedDate, accessFirstDay, disruptionSubmittedBy, disruptiveAuthorityUpdatedBy, disruptionAuthorityUpdatedDate } = disruptive;

    return (
        <div className='m-3'>
            <div className='row border rounded mb-2 p-2'>
                <div className='form-floating text-start'>
                    <h3 className='h5 text-muted'>Compliance</h3>

                    
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
                                            { requestorName }
                                        </div>
                                    </td>
                                    <td className='ps-3 pe-3'>
                                        <div className='table-item_col'>
                                            { moment(accessRequestCreated).format('YYYY-MM-DD HH:mm') }
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
                                { disruptionSubmittedDate
                                    ?   <tr className='border-bottom'>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    Disruptive Request Submitted
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {disruptionSubmittedBy}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {moment(disruptionSubmittedDate).format('YYYY-MM-DD HH:mm')}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    { moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week') < 13
                                                        ?   `Not compliant by ${13 - moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week')} weeks`
                                                        :   `Compliant`
                                                    }
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3 text-end'>
                                            </td>
                                        </tr>
                                    :   null
                                }
                                { disruptionAuthorityUpdatedDate && disruptiveStatus === 'Approved'
                                    ?   <tr className='border-bottom'>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    Disruptive Approved
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {disruptiveAuthorityUpdatedBy}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {moment(disruptionAuthorityUpdatedDate).format('YYYY-MM-DD HH:mm')}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    { moment(accessFirstDay).diff(moment(disruptionAuthorityUpdatedDate), 'week') < 13
                                                        ?   `Not compliant by ${13 - moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week')} weeks`
                                                        :   `Compliant`
                                                    }
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3 text-end'>
                                            </td>
                                        </tr>
                                    :   null
                                }
                                { disruptionAuthorityUpdatedDate && disruptiveStatus === 'Declined'
                                    ?   <tr className='border-bottom'>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    Disruptive Denied
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {disruptiveAuthorityUpdatedBy}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    {moment(disruptionAuthorityUpdatedDate).format('YYYY-MM-DD HH:mm')}
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3'>
                                                <div className='table-item_col'>
                                                    { moment(accessFirstDay).diff(moment(disruptionAuthorityUpdatedDate), 'week') < 13
                                                        ?   `Not compliant by ${13 - moment(accessFirstDay).diff(moment(disruptionSubmittedDate), 'week')} weeks`
                                                        :   `Compliant`
                                                    }
                                                </div>
                                            </td>
                                            <td className='ps-3 pe-3 text-end'>
                                            </td>
                                        </tr>
                                    :   null
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compliance;