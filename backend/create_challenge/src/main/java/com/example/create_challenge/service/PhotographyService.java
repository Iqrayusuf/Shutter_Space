package com.example.create_challenge.service;

import java.util.List;

import com.example.create_challenge.dto.PhotographyDto;

public interface PhotographyService {
    PhotographyDto createPhotography(PhotographyDto photographyDto);

    PhotographyDto getPhotographyById(Long photographyId);

    List<PhotographyDto> getAllPhotography();

    PhotographyDto updatePhotography(Long photographyId, PhotographyDto updatePhotography);

    void deletePhotography(Long photographyId);
}
