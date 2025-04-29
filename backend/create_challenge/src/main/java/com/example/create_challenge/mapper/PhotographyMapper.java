package com.example.create_challenge.mapper;

import com.example.create_challenge.dto.PhotographyDto;
import com.example.create_challenge.entity.Photography;

public class PhotographyMapper {

    public static PhotographyDto mapToPhotographyDto(Photography photography){
        return new PhotographyDto(
                photography.getId(),
                photography.getChallengeName(),
                photography.getChallengeDescription(),
                photography.getChallengeRules(),
                photography.getEndDate()
        );
    }

    public static Photography mapToPhotography(PhotographyDto photographyDto){
        return new Photography(
                photographyDto.getId(),
                photographyDto.getChallengeName(),
                photographyDto.getChallengeDescription(),
                photographyDto.getChallengeRules(),
                photographyDto.getEndDate()
        );
    }

}
