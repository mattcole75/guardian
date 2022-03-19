class AccessLimitItem {

    constructor (from, to, datetime, accessType, duration) {
        this.from = from;
        this.to = to;
        this.datetime = datetime;
        this.accessType = accessType;
        this.duration = duration;
    }
}

export default AccessLimitItem;