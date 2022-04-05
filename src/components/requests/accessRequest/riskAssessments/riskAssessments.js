import React from 'react';
import { useSelector } from 'react-redux';
import RiskAssessmentItem from './riskAssessmentItem';

const RiskAssessments = (props) => {

    const request = useSelector(state => state.requests.request);
    const { editable, toggle, select } = props;
    return (
        <div>
            <h6 className="h6 text-start">Risk Assessments:</h6>
            {editable
                ? <div className="text-start mb-3" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" onClick={toggle}>Add risk item</button>
                </div>
                : null
            }

            <div className="list-group mb-3 text-start">
                {
                    request && request.riskAssessmentItems.map((item, index) => {
                        return(<RiskAssessmentItem key={index} index={index} item={item} editable={editable} toggle={toggle} select={select} />);
                    })
                }
            </div>
        </div>
    );
}

export default RiskAssessments;