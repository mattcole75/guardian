import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as action from '../../../../store/actions/index';

const Filter = React.memo(() => {

    // const { loadUsers } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    const dispatch = useDispatch();

    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);

    const onLoadUsers = useCallback((idToken, localId, query, identifier) => {
        dispatch(action.authGetUsers(idToken, localId, query, identifier))
    },[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value) {
            const query =
                enteredFilter.length === 0
                ? ''
                : enteredFilter;
            onLoadUsers(idToken, localId, query, 'GET_USERS')
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
    }, [enteredFilter, inputRef, idToken, localId, onLoadUsers]);

    

    return (

        <div className='border-top border-start border-end rounded-top-1 mt-4 bg-light shadow-sm'>
            <div className='container-fluid d-grid gap-3 align-items-center'>
                <div className='d-flex align-items-center p-2'>

                <div className='form-floating  col-sm-4'>
                    <div className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none'>
                        <div className='form-floating'>
                            <h3 className='h3 text-muted'>Users</h3>
                        </div>
                    </div>
                </div>

                <form className='flex-grow-1 me-3 form-control-sm' role='search'>
                    <div className='row g-2'>
                        

                        <div className='form-floating w-100 col-sm-4'>
                            <form className='col-12 col-lg-auto mb-3 mb-lg-0'>
                                <input
                                    type="search"
                                    className='form-control'
                                    ref={inputRef}
                                    placeholder='Search email...'
                                    aria-label='Search'
                                    value={enteredFilter}
                                    onChange={event => setEnteredFilter(event.target.value)}
                                />
                            </form>
                        </div>
                    </div>
                </form>

                <div className='form-floating text-end col-sm-4'>
                    <button type='button' className='btn btn-light rounded-5 p-0'onClick={ () => onLoadUsers(idToken, localId, enteredFilter.length === 0 ? '' : enteredFilter, 'GET_USERS') }><span className='bi-arrow-clockwise fs-3' /></button>
                </div>
                </div>
            </div>
        </div>
    );
});

export default Filter;