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

export const determineStartDate = (arr) => {
    const startDate = new Date(
        Math.min(
          ...arr.map(ele => {
            return new Date(ele.startDate);
          }),
        ),
    );
    return startDate;
}

export const determineEndDate = (arr) => {
    const endDate = new Date(
        Math.max(
          ...arr.map(ele => {
            return Date.parse(ele.endDate);
          }),
        ),
    );
    return endDate;
}

export const datediff = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}