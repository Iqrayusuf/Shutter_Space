package com.example.create_challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PhotographyDto {
    private Long id;
    private String challengeName;
    private String challengeDescription;
    private String challengeRules;
    private String endDate;

}
