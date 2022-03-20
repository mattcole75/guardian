import React from 'react';
import { useForm } from 'react-hook-form';


const LocationLimit = (props) => {

    const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Location limit</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="locationLimitFrom" placeholder="From" required minLength={3} maxLength={32} 
                        {...register("locationLimitFrom", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="locationLimitFrom" className="form-label">From</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="locationLimitTo" placeholder="To" required minLength={3} maxLength={32} 
                        {...register("locationLimitTo", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="locationLimitTo" className="form-label">To</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="locationLimitDate" placeholder="Date" required 
                        {...register("locationLimitDate", { required: true })} />
                    <label htmlFor="locationLimitDate" className="form-label">Date</label>
                </div>
                <div className="form-floating mb-3">
                <input type="time" className="form-control" id="locationLimitTime" placeholder="Time" required 
                        {...register("locationLimitTime", { required: true })} />
                    <label htmlFor="locationLimitTime" className="form-label">Time</label>
                </div>

                <div className="list-group mb-3 text-start">
                    <label htmlFor="locationLimitAccessType" className="form-label">Access Type</label>
                    <select className="form-select" id="locationLimitAccessType" required>
                        <option value="">Choose...</option>
                        <option>Occupation (no issolation)</option>
                        <option>Occupation (issolation)</option>
                        <option>Posession (no issolation)</option>
                        <option>Posession (issolation)</option>
                        <option>Maintenance (no issolation)</option>
                        <option>Maintenance (issolation)</option>
                    </select>
                </div>

                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="locationLimitDuration" placeholder="Duration" required 
                        {...register("locationLimitDuration", { required: true })} />
                    <label htmlFor="locationLimitDuration" className="form-label">Duration</label>
                </div>
                <div className="form-floating mb-3">
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={() => {}}>Save changes</button>
                </div>
                <div className="form-floating">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={props.toggle}>Cancel</button>
                </div>
                
            </form>
        </div>
    )
}

export default LocationLimit;