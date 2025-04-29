package com.example.user_create_challenge.mapper;

import com.example.user_create_challenge.dto.UserPhotographyDto;
import com.example.user_create_challenge.entity.UserPhotography;

public class UserPhotographyMapper {

    public static UserPhotographyDto mapToUserPhotographyDto(UserPhotography userPhotography){
        return new UserPhotographyDto(
                userPhotography.getId(),
                userPhotography.getDescription(),
                userPhotography.getPhoto()
        );

    }

    public static UserPhotography mapToUserPhotography(UserPhotographyDto userPhotographyDto){
        return new UserPhotography(
                userPhotographyDto.getId(),
                userPhotographyDto.getDescription(),
                userPhotographyDto.getPhoto()
        );
    }
}
