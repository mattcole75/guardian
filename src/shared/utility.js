export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const elementDisabled = (roles, requestStatus, isDisrupted, disruptionStatus) => {

    switch (requestStatus) {

        case 'Draft' || 'Denied':
            if(roles.includes('planner', 'coordinator', 'administator')) {
                return true; // disabled
            } else {
                return false; // enabled
            }
        case 'Submitted':
            if(isDisrupted){
                if(disruptionStatus == null || 'rejected') {
                    return false; // enabled
                } else {
                    return true; // disabled
                }
            }
            break;
        case 'Granted':
            return true; // disabled

        default:
            return true; // disabled
    }
}

export const determinStartDate = (arr) => {
    const startDate = new Date(
        Math.min(
          ...arr.map(ele => {
            return new Date(ele.startDate);
          }),
        ),
    );
    return startDate;
}

export const determinEndDate = (arr) => {
    const endDate = new Date(
        Math.max(
          ...arr.map(ele => {
            return Date.parse(ele.endDate);
          }),
        ),
    );
    return endDate;
}