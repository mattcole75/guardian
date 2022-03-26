import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const MethodStatementForm = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange', defaultValues: props.request.methodStatementItems[props.index] });

    const save = useCallback((data) => {

        if(props.request && props.index === null){
            let updatedMethodStatementItems = props.request.methodStatementItems;
            updatedMethodStatementItems.push({...data, methodStatementStatus: 'pending'});
            props.save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');
        } else if (props.request && props.index !== null) {
            let updatedMethodStatementItems = props.request.methodStatementItems;
            updatedMethodStatementItems[props.index] = {...data, riskAssessmentStatus: 'pending'};
            props.save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');

        } else {
            props.save({methodStatementItems: [{...data, riskAssessmentStatus: 'pending'}]}, 'SAVE_METHOD_STATEMENT');
        }
        props.toggle();

    }, [props]);

    const remove = useCallback(() => {

        props.request.methodStatementItems.splice(props.index, 1);
        let updatedMethodStatementItems = props.request.methodStatementItems;
        props.save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');
        props.toggle();

    }, [props]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Method Statement</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementTitle" placeholder="Task title" required minLength={3} maxLength={32} 
                        {...register("methodStatementTitle", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="methodStatementTitle" className="form-label">Task title</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="methodStatement"  rows="3" style={{height:"auto"}} placeholder="Task description" required 
                        {...register("methodStatement", { required: true, minLength: 5 })} />
                    <label htmlFor="methodStatement" className="form-label">Method statement</label>
                </div>

                <div className="list-group mb-3 text-start">
                    <label htmlFor="methodStatementPPE" className="form-label">Personal protective equipment</label>
                    <select className="form-select" id="methodStatementPPE" required
                        {...register("methodStatementPPE", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Five Point PPE (Minumum)</option>
                    </select>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementEquipment" placeholder="Special Equipment" required
                        {...register("methodStatementEquipment", { required: true, minLength: 3, maxLength: 32})} />
                    <label htmlFor="methodStatementEquipment" className="form-label">Special equipment</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementTrackVehicles" placeholder="Track Vehicles" required
                        {...register("methodStatementTrackVehicles", { required: true, minLength: 3, maxLength: 32})} />
                    <label htmlFor="methodStatementTrackVehicles" className="form-label">Track vehicles</label>
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

export default MethodStatementForm;