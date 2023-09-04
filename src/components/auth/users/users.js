import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/actions/index';
import Filter from './filter/filter';
import Users from './list/list';
import Backdrop from '../../ui/backdrop/backdrop';
import Modal from '../../ui/modal/modal';
import Spinner from '../../ui/spinner/spinner';
import AdminForm from './adminForm/adminForm';

const user = React.memo(() => {

    const dispatch = useDispatch();

    const [ user, setUser ] = useState(null);

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const idToken = useSelector(state => state.auth.idToken);
    const localId = useSelector(state => state.auth.localId);
    const users = useSelector(state => state.auth.users);

    const [editingUser, setEditingUser] = useState(false);

    // editing toggles
    const toggleUserEditing = (user) => {
        setUser(user);
        setEditingUser(prevState => !prevState);
    };

    const onSave = useCallback((data, identifier) => {
        dispatch(action.authAdminPatch(idToken, localId, data, identifier))
    }, [dispatch, idToken, localId]);

    const saveHandler = useCallback((data) => {
        onSave(data, 'ADMIN_UPDATE');
    }, [onSave]);

    let spinner = null;
    if(loading)
        spinner = <Spinner />;

    // modal edit user
    let modal = null;
    if(editingUser) {
        modal = <Modal
            show={ editingUser }
            modalClosed={ toggleUserEditing }
            content={
                <AdminForm
                    toggle={ toggleUserEditing }
                    save={ saveHandler }
                    user={ user }
                />
            } />;
    }
    
    return (
        <section className='container'>
            <Backdrop show={ loading } />
            { spinner }
            { error &&
                <div className='alert alert-danger' role='alert'>
                    {error}
                </div>
            }
            { modal }

            <div className='u-margin-bottom-small'>
                <Filter />
            </div>

            <div>
                <Users users={users} toggle={toggleUserEditing} />
            </div>

        </section>
    )

});

export default user;