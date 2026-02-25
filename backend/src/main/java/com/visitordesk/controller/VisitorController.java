package com.visitordesk.controller;

import com.visitordesk.dto.CheckinRequest;
import com.visitordesk.dto.CheckinResponse;
import com.visitordesk.model.Visitor;
import com.visitordesk.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class VisitorController {
    
    @Autowired
    private VisitorService visitorService;
    
    @PostMapping("/checkin")
    public ResponseEntity<CheckinResponse> checkin(@RequestBody CheckinRequest request) {
        if (request.getVisitorName() == null || request.getVisitorName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (request.getVisitingDepartment() == null || request.getVisitingDepartment().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        CheckinResponse response = visitorService.checkin(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/visitors")
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        List<Visitor> visitors = visitorService.getAllVisitors();
        return ResponseEntity.ok(visitors);
    }
}
