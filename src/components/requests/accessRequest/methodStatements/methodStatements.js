import React from 'react';
import { useSelector } from 'react-redux';
import MethodStatementItem from './methodStatementItem';

const MethodStatements = (props) => {

    const request = useSelector(state => state.requests.request);

    return (
        <div>
            <h6 className="h6 text-start">Method Statements:</h6>
            <div className="text-start mb-3" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-success" onClick={props.toggle} >Add method statement</button>
            </div>
            <div className="list-group mb-3 text-start">
                {
                    request && request.methodStatementItems.map((item, index) => {
                        return(<MethodStatementItem key={index} index={index} item={item} toggle={props.toggle} select={props.select} />);
                    })
                }
            </div>
        </div>
    );
}

export default MethodStatements;