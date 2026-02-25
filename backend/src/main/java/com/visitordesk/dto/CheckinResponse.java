package com.visitordesk.dto;

import java.time.LocalDateTime;

public class CheckinResponse {
    private String message;
    private String visitorCompany;
    private LocalDateTime checkinTime;
    private Long id;
    
    public CheckinResponse() {
    }
    
    public CheckinResponse(String message, String visitorCompany, LocalDateTime checkinTime, Long id) {
        this.message = message;
        this.visitorCompany = visitorCompany;
        this.checkinTime = checkinTime;
        this.id = id;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getVisitorCompany() {
        return visitorCompany;
    }
    
    public void setVisitorCompany(String visitorCompany) {
        this.visitorCompany = visitorCompany;
    }
    
    public LocalDateTime getCheckinTime() {
        return checkinTime;
    }
    
    public void setCheckinTime(LocalDateTime checkinTime) {
        this.checkinTime = checkinTime;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
}
