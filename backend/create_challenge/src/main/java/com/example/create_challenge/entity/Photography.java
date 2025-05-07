package com.example.create_challenge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "challenges")
public class Photography {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "challenge_name")
    private String challengeName;

    @Column(name = "challenge_description")
    private String challengeDescription;

    @Column(name = "challenge_rules")
    private String challengeRules;

    @Column(name = "end_date")
    private String endDate;

}
