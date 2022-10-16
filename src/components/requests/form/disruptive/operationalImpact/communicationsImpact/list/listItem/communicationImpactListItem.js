import React from 'react';

const CommunicationImpactListItem = (props) => {

    const { select, toggle, item, index } = props;

    const {
        additionalCommunicationTitle, communicationDisruptedSignageRequired, communicationDisruptedCustomerRequired,
        communicationDisruptionDriverRequired, communicationDisruptionCSRRequired, communicationDisruptionEngineeringRequired,
        communicationDisruptionInternalCallsRequired
    } = item;

    const onSelect = () => {
        select(index);
        toggle();
    }

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                    {additionalCommunicationTitle}
                </div>
            </td>
            <td className='ps-3 pe-3'>
                <div>
                    { communicationDisruptedSignageRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3'>
                <div>
                    { communicationDisruptedCustomerRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3 table-item_hide'>
                <div className='table-item_hide'>
                    { communicationDisruptionDriverRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3 table-item_hide'>
                <div className='table-item_hide'>
                    { communicationDisruptionCSRRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3 table-item_hide'>
                <div className='table-item_hide'>
                    { communicationDisruptionEngineeringRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3 table-item_hide'>
                <div className='table-item_hide'>
                    { communicationDisruptionInternalCallsRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>

            <td className='ps-3 pe-3 text-end'>
                <div className='dropdown'>
                    <div className='table-item_col'>
                        <div className='btn' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            <span className='bi-three-dots-vertical fs-7' />
                        </div>
                        <ul className='dropdown-menu fs-7'>
                            <li><button type='button' className='dropdown-item' onClick={ onSelect }>Edit</button></li>
                            <li><button type='button' className='dropdown-item' onClick={ () => {} }>Delete</button></li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default CommunicationImpactListItem;