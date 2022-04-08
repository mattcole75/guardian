import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const ReviewForm = (props) => {

    const { request, index, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange', 
        defaultValues: request && request.reviewItems[index] 
    });

    const onSave = useCallback((data) => {

        if(request && index === null){
            let updatedReviewItems = request.reviewItems;
            updatedReviewItems.push({...data, reviewCommentOpen: false});
            save({reviewItems: updatedReviewItems}, 'SAVE_REVIEW');
        } else if (request && index !== null) {
            let updatedReviewItems = request.reviewItems;
            updatedReviewItems[index] = {...data};
            save({reviewItems: updatedReviewItems}, 'SAVE_REVIEW');

        } else {
            save({reviewItems: [{...data}]}, 'SAVE_REVIEW');
        }
        toggle();

    }, [index, request, save, toggle]);

    // const onDelete = useCallback(() => {

    //     request.methodStatementItems.splice(index, 1);
    //     let updatedMethodStatementItems = request.methodStatementItems;
    //     save({methodStatementItems: updatedMethodStatementItems}, 'SAVE_METHOD_STATEMENT');
    //     toggle();

    // }, [index, request.methodStatementItems, save, toggle]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Review comment</h1>

                <div className="form-floating mb-3">
                    <select className="form-select" id="reviewSection" required
                        disabled={index !== null}
                        {...register("reviewSection", { required: true })}>
                        <option value="">Choose...</option>
                        <option>Your details</option>
                        <option>Project details</option>
                        <option>Access request details</option>
                        <option>Access location - date details</option>
                        <option>Risk assessments</option>
                        <option>Method statements</option>
                    </select>
                    <label htmlFor="reviewSection">Section</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="reviewComment"  rows="3" style={{height:"auto"}} placeholder="Review comment" required 
                        disabled={index !== null}
                        {...register("reviewComment", { required: true, minLength: 5 })} />
                    <label htmlFor="reviewComment" className="form-label">Review comment</label>
                </div>

                {/* <div className="form-floating mb-3">
                    <textarea className="form-control" id="reviewResponse"  rows="3" style={{height:"auto"}} placeholder="Review comment" required
                        disabled={index === null}    
                        {...register("reviewResponse", { minLength: 5 })} />
                    <label htmlFor="reviewReview" className="form-label">Review response</label>
                </div> */}

                <div className="form-floating mb-3 text-start">
                    <p className="mb-0 opacity-75"><strong>Response: </strong>{request.reviewItems[index] && request.reviewItems[index].reviewResponse}</p>
                </div>

                <div className="list-group mx-0 mb-3">
                    <label className="list-group-item d-flex gap-2">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="reviewCommentOpen" 
                                disabled={index === null}
                                {...register("reviewCommentOpen")} />
                        </div>
                        <span className="text-start">
                            Review comment: open / closed
                            <small className="d-block text-muted">Close this comment if you are satisfied you have addressed the concern raised</small>
                        </span>
                    </label>
                </div>
            
                
                
                <div className="form-floating mb-3">
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                </div>
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                {request && request.reviewStatus === 'Submitted for approval'
                    ? <div className="form-floating">
                        <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit()}>Delete</button>
                    </div>
                    : null
                }
                    
            </form>
        </div>
    )
}

export default ReviewForm;