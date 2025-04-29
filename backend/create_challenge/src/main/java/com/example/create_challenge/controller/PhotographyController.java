package com.example.create_challenge.controller;

import java.util.List;

import org.springframework.http .HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.create_challenge.dto.PhotographyDto;
import com.example.create_challenge.service.PhotographyService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/photography")
public class PhotographyController {

    private PhotographyService photographyService;

    //build add Photography Rest API
    @PostMapping
    public ResponseEntity<PhotographyDto> createPhotography(@RequestBody PhotographyDto photographyDto){
        PhotographyDto savePhotography = photographyService.createPhotography(photographyDto);
        return new ResponseEntity<>(savePhotography, HttpStatus.CREATED);
    }

    //Build get Photography REST API
    @GetMapping("/{id}")
    public ResponseEntity<PhotographyDto> getPhotographyById(@PathVariable("id") Long photographyId){
        PhotographyDto photographyDto =  photographyService.getPhotographyById(photographyId);
        return ResponseEntity.ok(photographyDto);
    }

    //build Get All photography REST API
    @GetMapping
    public ResponseEntity<List<PhotographyDto>> getAllPhotography(){
        List<PhotographyDto> photography = photographyService.getAllPhotography();
        return ResponseEntity.ok(photography);
    }

    //build Update Photography Rest API
    @PutMapping("/{id}")
    public ResponseEntity<PhotographyDto> updatePhotography(@PathVariable("id") Long photographyId, @RequestBody PhotographyDto updatedPhotographyDto){
        PhotographyDto photographyDto =  photographyService.updatePhotography(photographyId, updatedPhotographyDto);
        return ResponseEntity.ok(photographyDto);
    }

    // Build Delete REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePhotography(@PathVariable("id") Long photographyId){
        photographyService.deletePhotography(photographyId);
        return ResponseEntity.ok("Photography delete successfully!");
    }
}
// raagul