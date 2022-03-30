class AccessRequestItem {

    constructor (id, requestorName, requestorPhone, requestorEmail, requestorOrganisation,
                    projectTitle, projectOrganisation, projectChangeRequestID,
                    accessTypeDisruptive, accessRequestTitle, accessRequestDescription, accessRequestCompetentPerson, accessRequestSiteContactPhone,
                    locationLimitItems, riskAssessmentItems, methodStatementItems, requestStatus, created, updated) {
        this.id = id
        this.requestorName = requestorName;
        this.requestorPhone = requestorPhone;
        this.requestorEmail = requestorEmail;
        this.requestorOrganisation = requestorOrganisation;
        this.projectTitle = projectTitle;
        this.projectOrganisation = projectOrganisation;
        this.projectChangeRequestID = projectChangeRequestID;
        this.accessTypeDisruptive = accessTypeDisruptive;
        this.accessRequestTitle = accessRequestTitle;
        this.accessRequestDescription = accessRequestDescription;
        this.accessRequestCompetentPerson = accessRequestCompetentPerson;
        this.accessRequestSiteContactPhone = accessRequestSiteContactPhone;
        this.locationLimitItems = locationLimitItems;
        this.riskAssessmentItems = riskAssessmentItems;
        this.methodStatementItems = methodStatementItems;
        this.requestStatus = requestStatus;
        this.created = created;
        this.updated = updated;
    }
}

export default AccessRequestItem;