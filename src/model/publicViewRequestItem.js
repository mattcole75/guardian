class PublicViewRequestItem {

    constructor (organisation, title, locationLimitStartDate, locationLimitEndDate, locationLimitLocations, electricalIsolationRequired, signallingResourceRequired, testTramsRequired, status) {
        this.organisation = organisation;
        this.title = title;
        this.locationLimitStartDate = locationLimitStartDate;
        this.locationLimitEndDate = locationLimitEndDate;
        this.locationLimitLocations = locationLimitLocations;
        this.electricalIsolationRequired = electricalIsolationRequired;
        this.signallingResourceRequired = signallingResourceRequired;
        this.testTramsRequired = testTramsRequired;
        this.status = status;
    }
}

export default PublicViewRequestItem;