package com.example.create_challenge.service.impl;

import com.example.create_challenge.dto.PhotographyDto;
import com.example.create_challenge.entity.Photography;
import com.example.create_challenge.entity.exception.ResourceNotFoundException;
import com.example.create_challenge.mapper.PhotographyMapper;
import com.example.create_challenge.repository.PhotographyRepository;
import com.example.create_challenge.service.PhotographyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhotographyServiceImpl implements PhotographyService {

    private final PhotographyRepository photographyRepository;

    public PhotographyServiceImpl(PhotographyRepository photographyRepository) {
        this.photographyRepository = photographyRepository;
    }

    @Override
    public PhotographyDto createPhotography(PhotographyDto photographyDto) {
        Photography photography = PhotographyMapper.mapToPhotography(photographyDto);
        Photography savedPhotography = photographyRepository.save(photography);
        return PhotographyMapper.mapToPhotographyDto(savedPhotography);
    }

    @Override
    public PhotographyDto getPhotographyById(Long photographyId) {
        Photography photography = photographyRepository.findById(photographyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Photography does not exist with given ID: " + photographyId));
        return PhotographyMapper.mapToPhotographyDto(photography);
    }

    @Override
    public List<PhotographyDto> getAllPhotography() {
        return photographyRepository.findAll()
                .stream()
                .map(PhotographyMapper::mapToPhotographyDto)
                .collect(Collectors.toList());
    }

    @Override
    public PhotographyDto updatePhotography(Long photographyId, PhotographyDto updatedDto) {
        Photography photography = photographyRepository.findById(photographyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Photography does not exist with ID: " + photographyId));

        // Set updated fields
        photography.setChallengeName(updatedDto.getChallengeName());
        photography.setChallengeDescription(updatedDto.getChallengeDescription());
        photography.setChallengeRules(updatedDto.getChallengeRules());
        photography.setEndDate(updatedDto.getEndDate());

        // Save and return updated entity
        Photography updatedPhotography = photographyRepository.save(photography);
        return PhotographyMapper.mapToPhotographyDto(updatedPhotography);
    }

    @Override
    public void deletePhotography(Long photographyId) {
        Photography photography = photographyRepository.findById(photographyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Photography does not exist with given ID: " + photographyId));

        photographyRepository.delete(photography);
    }
}
