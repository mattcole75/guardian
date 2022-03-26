import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const RiskAssessmentForm = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange', defaultValues: props.request.riskAssessmentItems[props.index] });

    const save = useCallback((data) => {

        if(props.request && props.index === null) {
            let updatedRiskAssessementItems = props.request.riskAssessmentItems;
            updatedRiskAssessementItems.push({...data, riskAssessmentStatus: 'pending'});
            props.save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        } else if (props.request && props.index !== null) {
            let updatedRiskAssessementItems = props.request.riskAssessmentItems;
            updatedRiskAssessementItems[props.index] = {...data, riskAssessmentStatus: 'pending'};
            props.save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        } else {
            props.save({riskAssessmentItems: [{...data, riskAssessmentStatus: 'pending'}]}, 'SAVE_RISK_ASSESSMENT');
        }
        props.toggle();

    }, [props]);

    const remove = useCallback(() => {

        props.request.riskAssessmentItems.splice(props.index, 1);
        let updatedRiskAssessementItems = props.request.riskAssessmentItems;
        props.save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        props.toggle();

    }, [props]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Risk Assessment</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="riskHazardTitle" placeholder="Hazard title" required minLength={3} maxLength={32} 
                        {...register("riskHazardTitle", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="riskHazardTitle" className="form-label">Hazard title</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="riskHazardDescription"  rows="3" style={{height:"auto"}} placeholder="Hazard description" required 
                        {...register("riskHazardDescription", { required: true, minLength: 5 })} />
                    <label htmlFor="riskHazardDescription" className="form-label">Hazard Description</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="riskScore" placeholder="Risk score" required
                        {...register("riskScore", { required: true})} />
                    <label htmlFor="riskScore" className="form-label">Risk score</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="riskHazardMitigation"  rows="3" style={{height:"auto"}} placeholder="Hazard mitigation" required 
                        {...register("riskHazardMitigation", { required: true })} />
                    <label htmlFor="riskHazardMitigation" className="form-label">Hazard mitigation</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="riskMitigatedScore" placeholder="Mitigated risk score" required
                        {...register("riskMitigatedScore", { required: true})} />
                    <label htmlFor="riskMitigatedScore" className="form-label">Mitigated risk score</label>
                </div>

                <div className="list-group mb-3 text-start">
                    <label htmlFor="riskNearestHospital" className="form-label">Nearest hospital</label>
                    <select className="form-select" id="riskNearestHospital" required
                        {...register("riskNearestHospital", { required: true})}>
                        <option value="">Choose...</option>
                        <option>Royal Oldham Hospital, Rochdale Rd, OL1 2JH</option>
                        <option>North Manchester General Hospital, Delaunuys Rd, Crumpsall, M8 5RB</option>
                        <option>Manchester Royal Infirmary, Grafton Street, M13 9WL</option>
                        <option>Salford Royal, Stott Lane, Salford, M6 8HD</option>
                        <option>Wythenshawe Hospital, Southmoor Road, M23 9LT</option>
                        <option>Royal Oldham Hospital, Rochdale Road, Oldham, OL1 2JH</option>
                        <option>Tameside Hospital, Fountain Street, Ashton Under Lyne, OL6 9RW</option>
                        <option>Stepping Hill Hospital, Poplar Grove, Hazel Grove, Stockport, SK2 7JE</option>
                        <option>Fairfield General Hospital, Rochdale Old Road, Bury, BL9 7TD</option>
                        <option>Royal Bolton Hospital, Minerva Road, Farnworth, Bolton, BL4 0JR</option>
                    </select>
                </div>

                <div className="form-floating mb-3">
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(save)}>Save changes</button>
                </div>
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={props.toggle}>Close</button>
                </div>
                <div className="form-floating">
                    <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(remove)}>Delete</button>
                </div>
                
            </form>
        </div>
    )
}

export default RiskAssessmentForm;