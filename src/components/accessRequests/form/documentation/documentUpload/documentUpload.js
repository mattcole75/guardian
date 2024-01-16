import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userUploadDocument } from '../../../../../store/actions/index';

const DocumentUpload = (props) => {

    const { toggle, uid } = props;
    const dispatch = useDispatch();
    const identifier = useSelector(state => state.accessRequest.identifier)

    const [ doc, setDoc ] = useState(null);

    const onUploadDocument = useCallback((uid, document, identifier) => dispatch(userUploadDocument(uid, document, identifier)), [dispatch]);

    const uploadDoc = () => {
        if(doc === null)
            return;

        onUploadDocument(uid, doc, 'USER_UPLOAD_DOCUMENT');
    }

    useEffect(() => {
        if(identifier === 'USER_UPLOAD_DOCUMENT')
            toggle();
    }, [identifier, toggle]);

    return (
        <div className='mb-3 form-location my-1 shadow rounded'>
            <div className='d-flex gap-2 w-100 justify-content-between'>
                <div className='mb-3'>
                    <h4 className='h4 fw-normal'>Upload Documents</h4>
                </div>
            </div>

            <div>
                <input
                    type='file'
                    className='form-control form-control-lg'
                    id='fileName'
                    accept='application/pdf'
                    onChange={ event => setDoc(event.target.files[0])} />
            </div>
            <div className='alert alert-warning' role='alert'>
                You can only upload PDF documents types
            </div>

            <div className='form-floating mb-2'>
                <button className='w-100 btn btn-lg btn-primary' type='button' onClick={ uploadDoc }>Upload</button>
            </div>
            <div className='form-floating mb-3'>
                <button className='w-100 btn btn-lg btn-secondary' type='button' onClick={ toggle }>Close</button>
            </div>
            
        </div>
    )
}

export default DocumentUpload;