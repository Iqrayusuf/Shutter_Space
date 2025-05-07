package com.example.user_create_challenge.controller;

import com.example.user_create_challenge.dto.UserPhotographyDto;
import com.example.user_create_challenge.service.UserPhotographyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/userPhotography")
public class UserPhotographyController {

    private final UserPhotographyService userPhotographyService;

    //Build Add UserPhotography Rest API

    @PostMapping
    public ResponseEntity<UserPhotographyDto> uploadPhoto(
            @RequestParam("description") String description,
            @RequestParam("photo") MultipartFile photoFile) {

        try {
            UserPhotographyDto dto = new UserPhotographyDto();
            dto.setDescription(description);
            dto.setPhoto(photoFile.getBytes());

            UserPhotographyDto savedDto = userPhotographyService.createUserPhotography(dto);

            return new ResponseEntity<UserPhotographyDto>(savedDto, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<UserPhotographyDto>((UserPhotographyDto) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Build Get UserPhotography Rest API
    @GetMapping("/{id}")
    public ResponseEntity<UserPhotographyDto> getUserPhotographyById(@PathVariable("id") Long userPhotographyId){
        UserPhotographyDto userPhotographyDto = userPhotographyService.getUserPhotographyById(userPhotographyId);
        return new ResponseEntity<UserPhotographyDto>(userPhotographyDto,HttpStatus.OK);

    }

    //Build Get All UserPhotography
    @GetMapping
    public ResponseEntity<List<UserPhotographyDto>> getAllUserPhotography(){
        List<UserPhotographyDto> userPhotograpies = userPhotographyService.getAllUserPhotography();
        return new ResponseEntity<List<UserPhotographyDto>>(userPhotograpies, HttpStatus.OK);
    }
}
