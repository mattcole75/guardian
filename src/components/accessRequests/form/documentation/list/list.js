import React from "react";
import ListItem from './listItem/listItem';

const List = (props) => {

    const { uid, documents, permit, deleteDocument, recordLocked } = props;

    return (

        <div>
            { documents && documents.length > 0
                ?   <div className='list-group'>
                        {
                            documents.map((item, index) => {
                                return(<ListItem
                                    key={ index }
                                    index={ index }
                                    uid={ uid }
                                    item={ item }
                                    deleteDocument= { deleteDocument }
                                    recordLocked={ recordLocked }
                                />);
                            })
                        }
                        { permit
                            ?   <ListItem
                                    key="permit"
                                    uid={ uid }
                                />
                            :   null
                        }
                    </div>
                :   <div className='alert alert-warning text-sm-center' role='alert'>There are no documents registered</div>
        }
        </div>
        
    );
}

export default List;