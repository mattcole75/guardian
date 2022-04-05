import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const MethodStatementForm = (props) => {

    const { request, index, save, toggle, editable } = props;

    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange', 
        defaultValues: request && request.methodStatementItems[index] 
    });

    const onSave = useCallback((data) => {

        if(request && index === null){
            let updatedMethodStatementItems = request.methodStatementItems;
            updatedMethodStatementItems.push({...data, methodStatementStatus: 'pending'});
            save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');
        } else if (request && index !== null) {
            let updatedMethodStatementItems = request.methodStatementItems;
            updatedMethodStatementItems[index] = {...data, riskAssessmentStatus: 'pending'};
            save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');

        } else {
            save({methodStatementItems: [{...data, riskAssessmentStatus: 'pending'}]}, 'SAVE_METHOD_STATEMENT');
        }
        toggle();

    }, [index, request, save, toggle]);

    const onDelete = useCallback(() => {

        request.methodStatementItems.splice(index, 1);
        let updatedMethodStatementItems = request.methodStatementItems;
        save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');
        toggle();

    }, [index, request.methodStatementItems, save, toggle]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Method Statement</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementTitle" placeholder="Task title" required minLength={3} maxLength={32} 
                        disabled={!editable}
                        {...register("methodStatementTitle", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="methodStatementTitle" className="form-label">Task title</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="methodStatement"  rows="3" style={{height:"auto"}} placeholder="Task description" required 
                        disabled={!editable}
                        {...register("methodStatement", { required: true, minLength: 5 })} />
                    <label htmlFor="methodStatement" className="form-label">Method statement</label>
                </div>

                <div className="list-group mb-3 text-start">
                    <label htmlFor="methodStatementPPE" className="form-label">Personal protective equipment</label>
                    <select className="form-select" id="methodStatementPPE" required
                        disabled={!editable}
                        {...register("methodStatementPPE", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Five Point PPE (Minumum)</option>
                    </select>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementEquipment" placeholder="Special Equipment" required
                        disabled={!editable}
                        {...register("methodStatementEquipment", { required: true, minLength: 3, maxLength: 32})} />
                    <label htmlFor="methodStatementEquipment" className="form-label">Special equipment</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="methodStatementTrackVehicles" placeholder="Track Vehicles" required
                        disabled={!editable}
                        {...register("methodStatementTrackVehicles", { required: true, minLength: 3, maxLength: 32})} />
                    <label htmlFor="methodStatementTrackVehicles" className="form-label">Track vehicles</label>
                </div>

                {editable
                    ? <div className="form-floating mb-3">
                        <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                    </div>
                    : null
                }
                
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {editable
                    ? <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                    </div>
                    : null
                }
            </form>
        </div>
    )
}

export default MethodStatementForm;