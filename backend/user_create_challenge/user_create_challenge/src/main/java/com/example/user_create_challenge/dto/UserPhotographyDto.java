package com.example.user_create_challenge.dto;

import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPhotographyDto {

    private long id;
    private String description;
    private byte[] photo;
}
