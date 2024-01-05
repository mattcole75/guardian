import React from "react";
import ListItem from './listItem/listItem';

const List = (props) => {

    const { locations, save, recordLocked } = props;

    return (
        <div>
            { locations.length > 0
                ?   <div className='list-group mb-2 text-start'>
                        {
                            locations.map((item, index) => {
                                return (
                                    <ListItem
                                        key={ index }
                                        index={ index }
                                        item={ item }
                                        length={ locations.length }
                                        save={ save }
                                        recordLocked={ recordLocked }
                                    />
                                );
                            })
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no locations listed</div>
            }
        </div>
        
    );
}

export default List;