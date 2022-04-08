import React from 'react';

const reviewItem = (props) => {

    const { index, item, select, toggle } = props;

    const action = () => {
        if(item.reviewCommentOpen === false) {
            select(index);
            toggle();
        }
    }

    let iconStyle = ['access-icon'];
    let badgeStyle = ['badge rounded-pill'];

    if(item.reviewCommentOpen === true) {
        iconStyle.push('bi-check-circle access-icon-approved');
        badgeStyle.push('bg-success');
    }
    else {
        iconStyle.push('bi-x-circle access-icon-decline');
        badgeStyle.push('bg-danger');
    }

    return (
        <div className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={action}>
            <i className={iconStyle.join(' ')}></i>
            <div className="d-flex gap-2 w-100 justify-content-between" role="button">
                <div>
                    <p className="mb-0 opacity-75"><strong>Section: </strong>{item.reviewSection}</p>
                    <p className="mb-0 opacity-75"><strong>Comment: </strong>{item.reviewComment}</p>
                    <p className="mb-0 opacity-75"><strong>Response: </strong>{item.reviewResponse}</p>
                </div>
                <div className="p-1">
                     <small className={badgeStyle.join(' ')}>{item.reviewCommentOpen === false ? 'Open' : 'Closed'}</small>
                </div>
               
            </div>
        </div>
    );
}

export default reviewItem;