import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';


const ReviewResponseForm = (props) => {

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

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Review response</h1>

                <div className="form-floating mb-3 text-start">
                    <p className="mb-0 opacity-75"><strong>Section: </strong>{request.reviewItems[index] && request.reviewItems[index].reviewSection}</p>
                    <p className="mb-0 opacity-75"><strong>Comment: </strong>{request.reviewItems[index] &&     request.reviewItems[index].reviewComment}</p>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="reviewResponse"  rows="3" style={{height:"auto"}} placeholder="Review comment" required
                        disabled={index === null}    
                        {...register("reviewResponse", { required: true, minLength: 5 })} />
                    <label htmlFor="reviewReview" className="form-label">Review response</label>
                </div>
                
                <div className="form-floating mb-3">
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                </div>
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewResponseForm;