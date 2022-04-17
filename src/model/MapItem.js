class MapItem {

    constructor (projectOrganisation, projectTitle, accessTypeDisruptive, accessRequestTitle, requestStatus, locationLimitItems) {
        this.projectOrganisation = projectOrganisation;
        this.projectTitle = projectTitle;
        this.accessTypeDisruptive = accessTypeDisruptive;
        this.accessRequestTitle = accessRequestTitle;
        this.locationLimitItems = locationLimitItems;
        this.requestStatus = requestStatus;
    }
}

export default MapItem;