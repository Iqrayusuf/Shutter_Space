package com.shutterspace.user_service.controller;

import com.shutterspace.user_service.dto.UserSignupDTO;
import com.shutterspace.user_service.model.User;
import com.shutterspace.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
/*
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/signup", consumes = "multipart/form-data")
    public ResponseEntity<?> registerUser(
            @RequestPart("user") UserSignupDTO userDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            User savedUser = userService.registerUser(userDto, profileImage);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
*/
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Keep your original multipart method for file uploads
    @PostMapping(value = "/signup", consumes = "multipart/form-data")
    public ResponseEntity<?> registerUser(
            @RequestPart("user") UserSignupDTO userDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            User savedUser = userService.registerUser(userDto, profileImage);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Add this new method to handle raw JSON requests
    @PostMapping(value = "/signup", consumes = "application/json")
    public ResponseEntity<?> registerUserJson(@RequestBody UserSignupDTO userDto) {
        try {
            // Call the service method with null for profileImage
            User savedUser = userService.registerUser(userDto, null);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestPart("user") UserSignupDTO userDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            User updatedUser = userService.updateUser(id, userDto, profileImage);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}