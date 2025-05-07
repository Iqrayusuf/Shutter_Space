package com.example.user_create_challenge.service;

import com.example.user_create_challenge.dto.UserPhotographyDto;

import java.util.List;

public interface UserPhotographyService {
    UserPhotographyDto createUserPhotography(UserPhotographyDto userPhotographyDto);

    UserPhotographyDto getUserPhotographyById(Long UserPhotographyId);

    List<UserPhotographyDto> getAllUserPhotography();
}
