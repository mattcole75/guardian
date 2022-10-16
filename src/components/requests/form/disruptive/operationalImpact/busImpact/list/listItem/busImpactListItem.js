import React from 'react';

const BusImpactItem = (props) => {

    const { select, toggle, item, index } = props;

    const {busReplacementServiceTitle, busCoordinatorRequired, standbyBusesRequired, alternateBusStops} = item;

    const onSelect = () => {
        select(index);
        toggle();
    }

    return (
        <tr className='border-bottom'>
            <td className='ps-3 pe-3'>
                <div className='table-item_col'>
                    {busReplacementServiceTitle}
                </div>
            </td>
            <td className='ps-3 pe-3'>
                <div>
                    { busCoordinatorRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3'>
                <div>
                    { standbyBusesRequired
                        ?   <span className='badge rounded-pill bg-warning text-dark table-item_col'>Yes</span>
                        :   <span className='badge rounded-pill bg-success text-bg-success table-item_col'>No</span>
                    }
                </div>
            </td>
            <td className='ps-3 pe-3 table-item_hide'>
                <div className='table-item_hide'>
                    { alternateBusStops
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

export default BusImpactItem;