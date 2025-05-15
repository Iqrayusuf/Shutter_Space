package com.shutterspace.user_service.dto;

import com.shutterspace.user_service.model.Skill;
import lombok.Data;
import java.util.List;

@Data
public class UserSignupDTO {
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String password;
    private List<Skill> skills;
}
