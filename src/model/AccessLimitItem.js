class AccessLimitItem {

    constructor (from, to, datetime, accessType, duration, status) {
        this.from = from;
        this.to = to;
        this.datetime = datetime;
        this.accessType = accessType;
        this.duration = duration;
        this.status = status;
    }
}

export default AccessLimitItem;