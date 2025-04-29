package com.example.user_create_challenge.service;

import com.example.user_create_challenge.dto.UserPhotographyDto;
import com.example.user_create_challenge.entity.UserPhotography;
import com.example.user_create_challenge.exception.ResourceNotFoundException;
import com.example.user_create_challenge.mapper.UserPhotographyMapper;
import com.example.user_create_challenge.repository.UserPhotographyRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserPhotographyServiceImpl implements UserPhotographyService{

    private UserPhotographyRepository userPhotographyRepository;

    @Override
    public UserPhotographyDto createUserPhotography(UserPhotographyDto userPhotographyDto){
        UserPhotography userPhotography = UserPhotographyMapper.mapToUserPhotography(userPhotographyDto);
        UserPhotography createUserPhotography = userPhotographyRepository.save(userPhotography);
        return UserPhotographyMapper.mapToUserPhotographyDto(createUserPhotography);
    }

    @Override
    public UserPhotographyDto getUserPhotographyById(Long userPhotographyId) {
        UserPhotography userPhotography = userPhotographyRepository.findById(userPhotographyId)
                .orElseThrow(() -> new ResourceNotFoundException("Photography does not exist with given id: " + userPhotographyId));
        return UserPhotographyMapper.mapToUserPhotographyDto(userPhotography);
    }

    @Override
    public List<UserPhotographyDto> getAllUserPhotography() {
        List<UserPhotography> userPhotographies = userPhotographyRepository.findAll();
        return userPhotographies.stream()
                .map(UserPhotographyMapper::mapToUserPhotographyDto)
                .collect(Collectors.toList());
    }


}
