import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import moment from 'moment';

import Requester from './requester/requester';
import SiteDetails from './siteDetails/siteDetails';
import Locations from './location/locations';
import LocationForm from './location/form/locationForm'
import WorkStages from './workStages/workStages';
import WorkStageForm from './workStages/form/workStageForm';
import PermitRequirements from './permitRequirements/permitRequirements';
import ElectricalIsolationRequirements from './electricalIsolationRequirements/electricalIsolationRequirements';
import AdditionalInformation from './additionalInformation/additionalInformation';

import { userCreateAccessRequest } from '../../../store/actions/index';
import { determinStartDate, determinEndDate } from '../../../shared/utility';

import Modal from '../../ui/modal/modal';
import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';

const NewAccessRequest = () => {

    const dispatch = useDispatch();

    const { idToken, localId, displayName, phoneNumber, email, organisation } = useSelector(state => state.auth);
    const {loading, error, identifier }= useSelector(state => state.accessRequest);

    const onCreateAccessRequest = useCallback((idToken, localId, data, identifier) => dispatch(userCreateAccessRequest(idToken, localId, data, identifier)), [dispatch]);

    const [editLocation, setEditLocation] = useState(false);
    const [editWorkStage, setEditWorkStage] = useState(false);

    const [ redirect, setRedirect ] = useState(null);
    const [ siteDetails, setSiteDetails ] = useState(null);
    const [ locations, setLocations ] = useState([]);
    const [ selectedLocationIndex, setSelectedLocationIndex ] = useState(null);
    const [ selectedLocation, setSelectedLocation ] = useState(null);
    const [ workStages, setWorkStages ] = useState([]);
    const [ permitRequirements, setPermitRequirements] = useState(null);
    const [ electricalIsolationRequirements, setElectricalIsolationRequirements ] = useState(null);
    const [ additionalInformation, setAdditionalInformation ] = useState(null);
    const [ saveButtonDisabled, setSaveButtonDisabled ] = useState(true);

    // once the access request has been saved then navigate back to the access request list
    useEffect(() => {
        if(identifier === 'CREATE_ACCESS_REQUEST')
            setRedirect(<Navigate to='/accessrequests' />);
    }, [identifier]);

    const onSave = useCallback(() => {
        onCreateAccessRequest(idToken, localId, {
            requester: {
                localId: localId,
                displayName: displayName,
                phoneNumber: phoneNumber,
                email: email,
                organisation: organisation
            },
            siteDetails: {
                ...siteDetails,
                accessFirstDay: moment(determinStartDate(locations)).format('YYYY-MM-DD'),
                accessLastDay: moment(determinEndDate(locations)).format('YYYY-MM-DD')
            },
            locations: [
                 ...locations
            ],
            workStages: [
                ...workStages
            ],
            permitRequirements: {
                ...permitRequirements
            },
            electricalIsolationRequirements: {
                ...electricalIsolationRequirements
            },
            additionalInformation: {
                ...additionalInformation,
            },
            eventLog: [{
                user: displayName,
                logged: moment().format(),
                event: 'Access Request Created'
            }]
            }, 'CREATE_ACCESS_REQUEST');
    }, [onCreateAccessRequest, idToken, localId, displayName, phoneNumber, email, organisation, siteDetails, locations, workStages, permitRequirements, electricalIsolationRequirements, additionalInformation]);

    const onCancel = () => {
        setRedirect(<Navigate to='/accessrequests' />);
    }

    const toggleLocationEdit = () => {
        setEditLocation(prevState => !prevState);
    }

    const toogleWorkStageEdit = () => {
        setEditWorkStage(prevState => !prevState);
    }

    const locationSelectHandler = useCallback((index, item) => {
        setSelectedLocationIndex(index);
        setSelectedLocation(item);
        toggleLocationEdit();
    }, []);

    const locationAddHandler = () => {
        setSelectedLocation(null);
        setSelectedLocationIndex(null);
        toggleLocationEdit();
    }

    const locationCloseHandler = () => {
        toggleLocationEdit();
    }

    const onSetSiteDetails = (data) => {
        setSiteDetails(data);
    }

    const onSetSiteDetailsValidation = (isValid) => {
        setSaveButtonDisabled(!isValid);
    }

    const onSetLocation = (action, index, location) => {

        const updatedLocations = [ ...locations ];

        switch (action) {
            case 'ADD':
                updatedLocations.push(location);
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            case 'UPDATE':
                updatedLocations[index] = location;
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            case 'DELETE':
                updatedLocations.splice(index, 1);
                setLocations(updatedLocations);
                toggleLocationEdit();
                break;
            default:
                return;
        }
        
    }

    const onSetWorkStage = (action, index, workStage) => {
        const updatedWorkStages = [ ...workStages ];

        switch (action) {
            case 'ADD':
                updatedWorkStages.push(workStage);
                setWorkStages(updatedWorkStages);
                toogleWorkStageEdit();
                break;
            case 'DELETE':
                updatedWorkStages.splice(index, 1);
                setWorkStages(updatedWorkStages);
                break;
            case 'UP':
                //arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                updatedWorkStages.splice((index - 1), 0, updatedWorkStages.splice(index, 1)[0]);
                setWorkStages(updatedWorkStages);
                break;
            case 'DOWN':
                updatedWorkStages.splice((index + 1), 0, updatedWorkStages.splice(index, 1)[0]);
                setWorkStages(updatedWorkStages);
                break;
            default:
                return;
        }
    }

    const onSetPermitRequirement = (data) => {
        setPermitRequirements(data);
    }
    
    const onSetElectricalIsolationRequirements = (data) => {
        setElectricalIsolationRequirements(data);
    }

    const onSetAdditionalInformation = (data) => {
        setAdditionalInformation(data);
    }

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    let modal = null;
    if(editLocation) {
        modal = <Modal 
            show={ editLocation } 
            modalClosed={ toggleLocationEdit } 
            content={
                <LocationForm 
                    close={ locationCloseHandler }
                    save={ onSetLocation }
                    recordLocked={ false }
                    index={ selectedLocationIndex }
                    location={ selectedLocation }
                />
            }/>
    }
    if(editWorkStage) {
        modal = <Modal 
            show={ editWorkStage } 
            modalClosed={ toogleWorkStageEdit } 
            content={
                <WorkStageForm 
                    toggle={ toogleWorkStageEdit }
                    save={ onSetWorkStage }
                    recordLocked={ false }
                />
            }/>
    }

    return (
        <div className='form-request my-5 shadow'>
            { redirect }
            <Backdrop show={ loading } />
            
            { spinner }
            
            { error &&
                <div className='alert alert-danger' role='alert'>
                    { error }
                </div>
            }

            { modal }

            <div className='text-sm-center'>
                <i className='bi-calendar2-plus form-auth-icon'></i>
                <h3 className='h3 mb-3 fw-normal'>New Access Request</h3>
            </div>
            
            <div className='mb-3'>
                {/* requestor details */}
                <Requester  displayName={ displayName } phoneNumber={ phoneNumber } email={ email } organisation={ organisation } />
                {/* Site details */}
                <SiteDetails siteDetails={ siteDetails } update={ onSetSiteDetails } siteDetailsIsValid={ onSetSiteDetailsValidation } />
                {/* locations */}
                <Locations locations={ locations } add={ locationAddHandler } toggle={ locationCloseHandler } select={ locationSelectHandler } />
                {/* work plan */}
                <WorkStages workStages={ workStages } toggle={ toogleWorkStageEdit } save={ onSetWorkStage } />
                {/* Permit Requirements */}
                <PermitRequirements permitRequirements={ permitRequirements} update={ onSetPermitRequirement } />
                {/* Electrical Isolation Requirements */}
                <ElectricalIsolationRequirements electricalIsolationRequirements={ electricalIsolationRequirements } update={ onSetElectricalIsolationRequirements } />
                {/* Aditional Information */}
                <AdditionalInformation additionalInformation={ additionalInformation } update={ onSetAdditionalInformation } />
            </div>

            <div>
                <div className='form-floating mb-2'>
                    <button className='w-100 btn btn-lg btn-primary' type='button' onClick={ onSave } disabled={ saveButtonDisabled }>Save as draft</button>
                </div>
                <div className='form-floating'>
                    <button className='w-100 btn btn-lg btn-danger' type='button' onClick={ onCancel }>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default NewAccessRequest;