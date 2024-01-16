import React from 'react';
import Backdrop from '../../backdrop/backdrop';
import NavigationListItem from '../navigationListItem/navigationListItem';
import './sidebar.css';

const Sidebar = (props) => {

    const { showSidebar, toggleShowSidebar, isAuthenticated, roles} = props;
    const isAdministrator = roles.includes('administrator', 0);
    const isPlanner = roles.includes('planner', 0);

    let attachedStyles = null;
    if(showSidebar)
        attachedStyles = ['sidebar', 'open'];
    else
        attachedStyles = ['sidebar', 'close'];

    return (
            <React.Fragment>
                <Backdrop show={ showSidebar } clicked={ toggleShowSidebar } />
                <div className={ attachedStyles.join(' ')}>
                    <nav>
                        <ul className='nav flex-column mb-auto menu-margin_top'>
                            <NavigationListItem link='/' icon='bi-house-door' click={ toggleShowSidebar }> Home</NavigationListItem>
                            { isAuthenticated
                                ?   <NavigationListItem link='/accessrequests' icon='bi-calendar2-x' click={ toggleShowSidebar }> Access Requests</NavigationListItem>
                                :   null
                            }
                            { isAuthenticated && isPlanner
                                ?   <NavigationListItem link='/planning' icon='bi-calendar2-week' click={ toggleShowSidebar }> Planning</NavigationListItem>
                                :   null
                            }
                            { isAuthenticated && isPlanner
                                ?   <NavigationListItem link='/dailysummary' icon='bi-calendar-event' click={ toggleShowSidebar }> Daily Summary</NavigationListItem>
                                :   null
                            }
                            { isAuthenticated
                                ?   <li><hr /></li>
                                :   null
                            }
                            { isAuthenticated
                                ?	<NavigationListItem link='/profile' icon='bi-person' click={ toggleShowSidebar }> Profile</NavigationListItem>
                                :	null
                            }
                            { isAuthenticated && isAdministrator
                                ?   <NavigationListItem link='/users' icon='bi-people' click={ toggleShowSidebar }> User Admin</NavigationListItem>
                                :   null
                            }
                            <li><hr /></li>
                            { isAuthenticated
                                ?   <NavigationListItem link='/logout' icon='bi-person-x' click={ toggleShowSidebar }> Logout</NavigationListItem>
                                :   <NavigationListItem link='/login' icon='bi-person-check' click={ toggleShowSidebar }> Login</NavigationListItem>
                            }
                        </ul>
                    </nav>
                </div>
            </React.Fragment>
    );
}

export default Sidebar;