import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import riskConfig from '../../../../configuration/riskConfig';
import { updateObject } from '../../../../shared/utility';

const RiskAssessmentForm = (props) => {

    const { request, index, editable, save, toggle } = props;

    const { register, handleSubmit, formState, setValue, getValues } = useForm({
        mode: 'onChange', 
        defaultValues: request && request.riskAssessmentItems[index] 
    });
    const [likelihood, setLikelihood] = useState(riskConfig.likelihoodImpact.likelihood);
    const [mitigatedLikelihood, setMitigatedLikelihood] = useState(riskConfig.likelihoodImpact.likelihood);
    const [impact, setImpact] = useState(riskConfig.likelihoodImpact.healthSafety);

    const changeImpact = useCallback((event) => {
        setValue('impact', event.target.value);
        setImpact(
            updateObject(impact, {
                value: event.target.value
            })
        );
    },[ setValue, impact ]);

    const changeLikelihood = useCallback((event) => {
        setValue('likelihood', event.target.value);
        setLikelihood(
            updateObject(likelihood, {
                value: event.target.value
            })
        );
    },[ setValue, likelihood ]);

    const changeMitigatedLikelihood = useCallback((event) => {
        setValue('mitigatedLikelihood', event.target.value);
        setMitigatedLikelihood(
            updateObject(mitigatedLikelihood, {
                value: event.target.value
            })
        );
    },[ setValue, mitigatedLikelihood ]);

    const onSave = useCallback((data) => {

        if(request && index === null) {
            let updatedRiskAssessementItems = request.riskAssessmentItems;
            updatedRiskAssessementItems.push({...data, riskAssessmentStatus: 'pending'});
            save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        } else if (request && index !== null) {
            let updatedRiskAssessementItems = request.riskAssessmentItems;
            updatedRiskAssessementItems[index] = {...data, riskAssessmentStatus: 'pending'};
            save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        } else {
            save({riskAssessmentItems: [{...data, riskAssessmentStatus: 'pending'}]}, 'SAVE_RISK_ASSESSMENT');
        }
        toggle();

    }, [index, request, save, toggle]);

    const onAccept = useCallback((data) => {

        let updatedRiskAssessementItems = request.riskAssessmentItems;
        updatedRiskAssessementItems[index] = {...data, riskAssessmentStatus: 'acceptable'};
        save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        toggle();

    }, [index, request.riskAssessmentItems, save, toggle]);

    const onNotAcceptable = useCallback((data) => {

        let updatedRiskAssessementItems = request.riskAssessmentItems;
        updatedRiskAssessementItems[index] = {...data, riskAssessmentStatus: 'not acceptable'};
        save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        toggle();

    }, [index, request.riskAssessmentItems, save, toggle]);

    const onDelete = useCallback(() => {

        request.riskAssessmentItems.splice(index, 1);
        let updatedRiskAssessementItems = request.riskAssessmentItems;
        save({riskAssessmentItems: updatedRiskAssessementItems}, 'SAVE_RISK_ASSESSMENT');
        toggle();

    }, [index, request.riskAssessmentItems, save, toggle]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Risk Assessment</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="riskHazardTitle" placeholder="Hazard title" required minLength={3} maxLength={32} 
                        disabled={!editable}
                        {...register("riskHazardTitle", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="riskHazardTitle" className="form-label">Hazard title</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="riskHazardDescription"  rows="3" style={{height:"auto"}} placeholder="Hazard description" required 
                        disabled={!editable}
                        {...register("riskHazardDescription", { required: true, minLength: 5 })} />
                    <label htmlFor="riskHazardDescription" className="form-label">Hazard Description</label>
                </div>

                <div className="mb-3">
                    <div className="range text-start border rounded border-success form-control">
                        <label htmlFor="impact" className="form-label"> H&S Impact</label>
                        <input 
                            type="range"
                            id="impact"
                            min={impact.min} 
                            max={impact.max}
                            step={impact.step}
                            disabled={!editable}
                            {...register("impact", {})}
                            onChange={(event) => {changeImpact(event)}}
                        />
                        <div className="text-center m-2">
                             <span className="badge bg-info text-dark text-wrap">{impact[getValues().impact].description}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="range text-start border rounded border-success form-control">
                        <label htmlFor="likelihood" className="form-label">Likelihood (unmitigated)</label>
                        <input 
                            type="range"
                            id="likelihood"
                            min={likelihood.min} 
                            max={likelihood.max}
                            step={likelihood.step}
                            disabled={!editable}
                            {...register("likelihood", {})}
                            onChange={(event) => {changeLikelihood(event)}}
                        />
                        <div className="text-center m-2">
                             <span className="badge bg-info text-dark">{likelihood[getValues().likelihood].description}</span>
                        </div>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="riskHazardMitigation"  rows="3" style={{height:"auto"}} placeholder="Hazard mitigation" required 
                        disabled={!editable}
                        {...register("riskHazardMitigation", { required: true })} />
                    <label htmlFor="riskHazardMitigation" className="form-label">Hazard mitigation</label>
                </div>

                <div className="mb-3">
                    <div className="range text-start border rounded border-success form-control">
                        <label htmlFor="mitigatedLikelihood" className="form-label">Likelihood (mitigated)</label>
                        <input 
                            type="range"
                            id="mitigatedLikelihood" 
                            min={likelihood.min} 
                            max={likelihood.max}
                            step={likelihood.step}
                            disabled={!editable}
                            {...register("mitigatedLikelihood", {})}
                            onChange={(event) => {changeMitigatedLikelihood(event)}}
                        />
                        <div className="text-center m-2">
                             <span className="badge bg-info text-dark">{likelihood[getValues().mitigatedLikelihood].description}</span>
                        </div>
                    </div>
                </div>

                <div className="list-group mb-3 text-start">
                    <label htmlFor="riskNearestHospital" className="form-label">Nearest hospital</label>
                    <select className="form-select" id="riskNearestHospital" required
                        disabled={!editable}
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

                {editable
                    ? <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                    </div>
                    : <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onAccept)}>Accept</button>
                    </div>
                }
                
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {editable
                    ? <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                    </div>
                    : <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onNotAcceptable)}>Not acceptable</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default RiskAssessmentForm;