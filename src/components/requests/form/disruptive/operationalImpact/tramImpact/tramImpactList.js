import React from 'react';
import TramImpactItem from './listItem/tramImpactListItem';

const TramImpactList = (props) => {

    const { save, roles, request, recordLocked } = props;

    const { tramServiceDisruptionItems, disruptionSubmittedStatus } = request;

    const isPlanner = roles.includes('planner');

    let isLocked = false;
    if(disruptionSubmittedStatus === 'Submitted' || disruptionSubmittedStatus === 'Approved' || recordLocked){
        isLocked = true;
    }

    const addTramImpactItem = () => {
        // local mutable array
        let updatedTramImpactItems = [];
        // copy exisint items if they exist
        if(tramServiceDisruptionItems != null) {
            updatedTramImpactItems = [ ...tramServiceDisruptionItems ];
        }
        // add new item
        updatedTramImpactItems.push({
            routeDisrupted: '',
            timetableDisrupted: false,
            peakServiceDisrupted: false,
            busReplacement: false,
            frequency: '12'
        });
        //update state with new item
        save({ tramServiceDisruptionItems: updatedTramImpactItems });
    };

    const deleteTramImpactItem = (index) => {
        // create local copy
        const updatedTramImpactItems = [ ...tramServiceDisruptionItems ];
        // remove element by index
        updatedTramImpactItems.splice(index, 1);
        // update state
        save({ tramServiceDisruptionItems: updatedTramImpactItems });
    };

    const updateTramImpactItem = (data, index) => {
        // create a local copy
        const updatedTramImpactItems = [ ...tramServiceDisruptionItems ];
        // update the item at the specified array index with the given data
        updatedTramImpactItems[index] = data;        
        // update database
        save({ tramServiceDisruptionItems: updatedTramImpactItems });
    };
    
    return (
        <div>
            <div className='row g-2 p-1'>
                <div className='form-floating w-75'>
                    <h3 className='h5 text-muted'>Tram Service Impact</h3>
                </div>
                    
                { (isPlanner === true && isLocked === false)
                    ?   <div className='form-floating w-25'>
                            <div className='btn-group float-end' role="group" aria-label='Basic example'>
                                <button type='button' className='btn btn-sm btn-primary' onClick={ addTramImpactItem }>Add</button>
                            </div>
                        </div>
                    : null
                }
            </div> 
           
            { tramServiceDisruptionItems
                ?   <div className='table-responsive'>
                        <table className='w-100 table table-hover table-borderless align-middle bg-light border-start border-end border-top shadow-sm fs-7'>
                            <thead className='border-bottom'>
                                <tr>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Route</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Timetable</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Peak</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Bus</div></th>
                                    <th className='ps-3 pe-3'><div className='table-item_col'>Freq</div></th>
                                    <th className='ps-3 pe-3'></th>
                                </tr>
                            </thead>
                            <React.Fragment>
                            <tbody>
                                {
                                    tramServiceDisruptionItems.map((item, index) => {
                                        return(<TramImpactItem
                                                    key={(item.routeDisrupted + String(index))}
                                                    index={index}
                                                    item={item}
                                                    isPlanner={isPlanner}
                                                    isLocked={isLocked}
                                                    deleteTramImpactItem={deleteTramImpactItem}
                                                    updateTramImpactItem={updateTramImpactItem}
                                                />);
                                    })
                                }
                            </tbody>
                            </React.Fragment>
                        </table>
                    </div>
                : <div className='alert alert-warning text-sm-center' role='alert'>You have no tram service disruptions</div>
            }
        </div>
    );
}

export default TramImpactList;