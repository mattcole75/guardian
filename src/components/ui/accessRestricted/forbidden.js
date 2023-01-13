import React from 'react';

const forbidden = () => (
    <div className='container py-5'>
          <div className='row'>

               <div className='col-md-6 text-md-end'>
                    <p className='text-md-center'><i className='bi-exclamation-triangle forbiddenIcon'></i><br/>Status Code: 403</p>
               </div>

               <div className='col-md-6 text-md-start align-middle p-5'>
                    <h3>Forbidden</h3>
                    <p>Sorry, your access to this resource is forbidden.</p>
               </div>
          </div>
     </div>
)

export default forbidden