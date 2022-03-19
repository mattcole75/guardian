class RiskAssessmentItem {

    constructor (title, hazard, score, mitigation, mitigatedScore, hospital, status) {
        this.title = title;
        this.hazard = hazard;
        this.score = score;
        this.mitigation = mitigation;
        this.mitigatedScore = mitigatedScore;
        this.hospital = hospital;
        this.status = status
    }
}

export default RiskAssessmentItem;