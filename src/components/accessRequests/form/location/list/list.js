import React from "react";
import ListItem from './listItem/listItem';

const List = (props) => {

    const { locations, toggle, select } = props;

    return (

        <div>
            { locations?.length > 0
                ?   <div className='list-group mb-3 text-start'>
                        {
                            locations?.map((item, index) => {
                                return(<ListItem
                                    key={ index }
                                    index={ index }
                                    item={ item }
                                    toggle={ toggle }
                                    select={ select }
                                />);
                            })
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no locations registered</div>
        }
        </div>
        
    );
}

export default List;