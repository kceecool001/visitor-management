package com.visitordesk.repository;

import com.visitordesk.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    List<Visitor> findAllByOrderByCheckinTimeDesc();
    
    @Query("SELECT v FROM Visitor v WHERE DATE(v.checkinTime) = :date ORDER BY v.checkinTime DESC")
    List<Visitor> findByCheckinDate(@Param("date") LocalDate date);
}
