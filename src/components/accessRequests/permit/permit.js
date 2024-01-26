import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import QRCode from "react-qr-code";
import { Margin, usePDF } from "react-to-pdf";

import { userGetAccessRequestPermit } from '../../../store/actions/index';
import Spinner from '../../ui/spinner/spinner';
import Backdrop from '../../ui/backdrop/backdropDark';
import logo from '../../../assets/kam.webp';


const Permit = () => {

    const { uid } = useParams();
    const dispatch = useDispatch();

    const { loading, error, permit } = useSelector(state => state.accessRequest);
    
    const { idToken, localId } = useSelector(state => state.auth);

    const onGetAccessRequestPermit = useCallback((idToken, localId, uid, identifier) => dispatch(userGetAccessRequestPermit(idToken, localId, uid, identifier)), [dispatch]);


    useEffect (() => {
        onGetAccessRequestPermit(idToken, localId, uid, 'GET_ACCESS_REQUEST_PERMIT');
    }, [uid, idToken, localId, onGetAccessRequestPermit]);

    const { toPDF, targetRef } = usePDF({
        filename: "Metrolink Permit.pdf",
        page: { margin: Margin.MEDIUM }
      });

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    return (
        <div className='container mt-3'>
            <Backdrop show={ loading } />
            
            { spinner }
            
            {error &&
                <div className='alert alert-danger' role='alert'>
                    { error }
                </div>
            }
            {permit && permit.status === 'Granted'
                ?   <div>
                        <div className='text-center'>
                            <button className='btn btn-primary m-2' onClick={toPDF}>Download PDF</button>
                        </div>

                        <div ref={targetRef}>
                            <ul className='list-group'>

                                <li className='list-group-item d-flex justify-content-between align-items-start'>
                                    
                                    <div className='ms-2 me-auto'>
                                        <h1>Permit to work</h1>
                                        <p>Prepared by <strong>{ permit.current.preparedBy }</strong> on the <strong>{ moment(permit.current.approvedDate).format('DD/MM/YYYY') }</strong></p>
                                        <p><strong>Printed: { moment().format('DD/MM/YYYY') }</strong></p>
                                    </div>
                                    <img src={ logo } alt="Company Logo" />
                                </li>


                                <li className='list-group-item d-flex justify-content-between align-items-start'>
                                    <div className='ms-2 me-auto'>
                                        <div className='fw-bold'>Details</div>
                                        <p className='mb-1'>Department / Contractor: <strong>{ permit.current.organisation }</strong></p>
                                        <p className='mb-1'>Worksite Limits: <strong>{ permit.current.worksiteLimits }</strong></p>
                                        <p className='mb-1'>Nature of Works: <strong>{ permit.current.natureOfWork }</strong></p>
                                    </div>
                                    <div className='p-3'>
                                        <QRCode
                                            size={ 100 }
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value='www.mattcole.uk'
                                            viewBox={`0 0 256 256`}
                                        />
                                    </div>
                                </li>

                                <li className='list-group-item'>
                                    <div className='me-auto'>
                                        <div className='fw-bold'>Permit</div>
                                        <ul className='list-group w-100'>
                                            {   permit.current.locations.map((item, index) => (
                                                    <li className="list-group-item" key={index}>
                                                        <div className='row g-2'>
                                                            <div className='form-floating col-sm-6'>
                                                                <p className='m-0'>Starts: <strong>{ moment(item.startDate + ' ' + item.startTime).format('DD/MM/YYYY HH:mm') }</strong></p>
                                                                <p className='m-0'>Ends: <strong>{ moment(item.endDate + ' ' + item.endTime).format('DD/MM/YYYY HH:mm') }</strong></p>
                                                            </div>
                                                            <div className='form-floating  col-sm-6'>
                                                                <p className='m-0'>Locations: <strong>{ item.locationList.join(', ') }</strong></p>
                                                                <p className='m-0'>Shifts: <strong>{ item.shifts }</strong></p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className="alert alert-warning m-0" role="alert">
                                        <p className='m-0 text-center'>Permit uncontrolled when copied or printed</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                :   <div className="alert alert-info" role="alert">
                        No permit is available. Please contact Metrolink.
                    </div>
            }
        </div>
    );
}

export default Permit;