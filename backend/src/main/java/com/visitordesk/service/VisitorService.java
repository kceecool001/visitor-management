package com.visitordesk.service;

import com.visitordesk.dto.CheckinRequest;
import com.visitordesk.dto.CheckinResponse;
import com.visitordesk.model.Visitor;
import com.visitordesk.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorService {
    
    @Autowired
    private VisitorRepository visitorRepository;
    
    @Value("${app.host.company:Our Company}")
    private String hostCompany;
    
    public CheckinResponse checkin(CheckinRequest request) {
        Visitor visitor = new Visitor(
            request.getVisitorName(),
            request.getVisitorCompany(),
            request.getVisitingDepartment()
        );
        
        Visitor savedVisitor = visitorRepository.save(visitor);
        
        String message = String.format("Welcome, %s! to %s", 
            savedVisitor.getVisitorName(), 
            hostCompany);
        
        return new CheckinResponse(
            message,
            savedVisitor.getVisitorCompany(),
            savedVisitor.getCheckinTime(),
            savedVisitor.getId()
        );
    }
    
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAllByOrderByCheckinTimeDesc();
    }
}
