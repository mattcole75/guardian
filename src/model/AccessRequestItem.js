class AccessRequestItem {

    constructor (id, requestorName, requestorPhone, requestorEmail, requestorOrganisation,
                    projectTitle, projectOrganisation, projectChangeRequestID,
                    accessRequestIsDisruptive, accessRequestTitle, accessRequestDescription, accessRequestCompetentPerson, accessRequestSiteContactPhone,
                    status) {
        this.id = id
        this.requestorName = requestorName;
        this.requestorPhone = requestorPhone;
        this.requestorEmail = requestorEmail;
        this.requestorOrganisation = requestorOrganisation;
        this.projectTitle = projectTitle;
        this.projectOrganisation = projectOrganisation;
        this.projectChangeRequestID = projectChangeRequestID;
        this.accessRequestIsDisruptive = accessRequestIsDisruptive;
        this.accessRequestTitle = accessRequestTitle;
        this.accessRequestDescription = accessRequestDescription;
        this.accessRequestCompetentPerson = accessRequestCompetentPerson;
        this.accessRequestSiteContactPhone = accessRequestSiteContactPhone;
        this.status = status;
    }
}

export default AccessRequestItem;