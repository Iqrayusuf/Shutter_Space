/*package ShutterSpace.LearningPlan_backend.controller;


import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }


    //Build Get User Rest Api
    @GetMapping("{id}")
    public  ResponseEntity<UserDto> getUserById(@PathVariable("id")Long userId){
        UserDto userDto = userService.getUserById(userId);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //Buil Get All User
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    // Build Updates User Rest API
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id")Long userId,@RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(userId,updatedUser);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //Build Delete Employee Rest Api
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("Employee Deleted Successfully!: ");

    }
}
*/
//comment
package ShutterSpace.LearningPlan_backend.controller;

import ShutterSpace.LearningPlan_backend.dto.UserDto;
import ShutterSpace.LearningPlan_backend.service.FileStorageService;
import ShutterSpace.LearningPlan_backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;

    // Keep the original method for backward compatibility or simple JSON requests
    @PostMapping(consumes = "application/json")
    public ResponseEntity<UserDto> createUserJson(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Add new method to handle multipart form data with files
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<UserDto> createUserWithFiles(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("learningPlanData") String learningPlanDataJson) {
        try {
            // Parse the JSON string to UserDto object
            UserDto userDto = objectMapper.readValue(learningPlanDataJson, UserDto.class);

            // Handle the image file if provided
            if (image != null && !image.isEmpty()) {
                String imageUrl = fileStorageService.storeFile(image);
                userDto.setImageUrl(imageUrl);
            }

            // Save the user to the database
            UserDto savedUser = userService.createUser(userDto);

            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Add endpoint for uploading resource files
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileStorageService.storeFile(file);

            Map<String, String> response = new HashMap<>();
            response.put("fileName", file.getOriginalFilename());
            response.put("fileUrl", fileUrl);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Existing methods remain unchanged
    @GetMapping("{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId) {
        UserDto userDto = userService.getUserById(userId);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId, @RequestBody UserDto updatedUser) {
        UserDto userDto = userService.updateUser(userId, updatedUser);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Employee Deleted Successfully!: ");
    }
}