import React from 'react';
import { useSelector } from 'react-redux';
import MethodStatementItem from './methodStatementItem';

const MethodStatements = (props) => {

    const request = useSelector(state => state.requests.request);
    const { toggle, select, editable } = props;
    return (
        <div>
            <h6 className="h6 text-start">Method Statements:</h6>
            {editable
                ?<div className="text-start mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={toggle} >Add method statement</button>
                </div>
                : null
            }
            
            <div className="list-group mb-3 text-start">
                {
                    request && request.methodStatementItems.map((item, index) => {
                        return(<MethodStatementItem key={index} index={index} item={item} editable={editable} toggle={toggle} select={select} />);
                    })
                }
            </div>
        </div>
    );
}

export default MethodStatements;