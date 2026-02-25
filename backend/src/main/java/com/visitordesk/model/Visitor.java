package com.visitordesk.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
public class Visitor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "visitor_name", nullable = false, length = 100)
    private String visitorName;
    
    @Column(name = "visitor_company", length = 100)
    private String visitorCompany;
    
    @Column(name = "visiting_department", nullable = false, length = 100)
    private String visitingDepartment;
    
    @Column(name = "checkin_time")
    private LocalDateTime checkinTime;
    
    @Column(name = "status", length = 20)
    private String status;
    
    @Column(name = "metadata", columnDefinition = "jsonb")
    private String metadata;
    
    @PrePersist
    protected void onCreate() {
        if (checkinTime == null) {
            checkinTime = LocalDateTime.now();
        }
        if (status == null) {
            status = "checked-in";
        }
    }
    
    public Visitor() {
    }
    
    public Visitor(String visitorName, String visitorCompany, String visitingDepartment) {
        this.visitorName = visitorName;
        this.visitorCompany = visitorCompany;
        this.visitingDepartment = visitingDepartment;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public LocalDateTime getCheckinTime() {
        return checkinTime;
    }
    
    public void setCheckinTime(LocalDateTime checkinTime) {
        this.checkinTime = checkinTime;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMetadata() {
        return metadata;
    }
    
    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }
}
