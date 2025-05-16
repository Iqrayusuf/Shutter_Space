package com.hamooth.progress.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
public class ProgressUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String templateType;
    private String title;
    private String description;
    private String tags;
    private String privacy;
    private LocalDateTime createdAt;
    private String priority; // Add this line


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
