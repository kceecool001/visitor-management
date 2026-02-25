package com.visitordesk.dto;

public class CheckinRequest {
    private String visitorName;
    private String visitorCompany;
    private String visitingDepartment;
    
    public CheckinRequest() {
    }
    
    public CheckinRequest(String visitorName, String visitorCompany, String visitingDepartment) {
        this.visitorName = visitorName;
        this.visitorCompany = visitorCompany;
        this.visitingDepartment = visitingDepartment;
    }
    
    public String getVisitorName() {
        return visitorName;
    }
    
    public void setVisitorName(String visitorName) {
        this.visitorName = visitorName;
    }
    
    public String getVisitorCompany() {
        return visitorCompany;
    }
    
    public void setVisitorCompany(String visitorCompany) {
        this.visitorCompany = visitorCompany;
    }
    
    public String getVisitingDepartment() {
        return visitingDepartment;
    }
    
    public void setVisitingDepartment(String visitingDepartment) {
        this.visitingDepartment = visitingDepartment;
    }
}
