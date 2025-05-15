package com.shutterspace.user_service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String password;
    private String profileImageUrl;

    @ElementCollection
    private List<Skill> skills = new ArrayList<>();
}
