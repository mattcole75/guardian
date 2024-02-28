import React from "react";
import ListItem from './listItem/listItem';

const List = (props) => {

    const { workStages, save, recordLocked } = props;

    return (

        <div>
            { workStages.length > 0
                ?   <div className='list-group mb-3 text-start'>
                        {
                            workStages?.map((item, index) => {
                                return (<ListItem
                                    key={ index }
                                    index={ index }
                                    item={ item }
                                    length={ workStages.length }
                                    save={ save }
                                    recordLocked={ recordLocked }
                                />);
                            })
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no work stages registered</div>
        }
        </div>
        
    );
}

export default List;