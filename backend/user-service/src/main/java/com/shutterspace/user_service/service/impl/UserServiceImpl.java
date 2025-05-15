/*package com.shutterspace.user_service.service.impl;

import com.shutterspace.user_service.dto.UserSignupDTO;
import com.shutterspace.user_service.model.User;
import com.shutterspace.user_service.repository.UserRepository;
import com.shutterspace.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        String imagePath = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            String fileName = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            imagePath = "/uploads/" + fileName;
        }

        User user = new User();
        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setSkills(dto.getSkills());
        user.setProfileImageUrl(imagePath);

        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        user.setSkills(dto.getSkills());

        if (profileImage != null && !profileImage.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();
            Path uploadPath = Paths.get("uploads/" + filename);
            Files.createDirectories(uploadPath.getParent());
            Files.write(uploadPath, profileImage.getBytes());
            user.setProfileImageUrl("/uploads/" + filename);
        }

        return userRepository.save(user);
    }

}
*/

/*
package com.shutterspace.user_service.service.impl;

import com.shutterspace.user_service.dto.UserSignupDTO;
import com.shutterspace.user_service.model.User;
import com.shutterspace.user_service.repository.UserRepository;
import com.shutterspace.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        String imagePath = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                Path uploadDir = Paths.get("uploads");
                Files.createDirectories(uploadDir);

                String fileName = UUID.randomUUID() + "_" + profileImage.getOriginalFilename();
                Path filePath = uploadDir.resolve(fileName);
                Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                imagePath = "/uploads/" + fileName;
                logger.info("Saved registration profile image to: {}", filePath.toAbsolutePath());
            } catch (IOException e) {
                logger.error("Failed to save profile image during registration", e);
                throw e;
            }
        }

        User user = new User();
        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setSkills(dto.getSkills());
        user.setProfileImageUrl(imagePath);

        User savedUser = userRepository.save(user);
        logger.info("User registered with ID: {} and profile image: {}", savedUser.getId(), savedUser.getProfileImageUrl());
        return savedUser;
    }

    @Override
    public User updateUser(Long id, UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        logger.info("Updating user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Update user information
        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        user.setSkills(dto.getSkills());

        // Handle profile image update
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                logger.info("Processing new profile image: {}, size: {} bytes",
                        profileImage.getOriginalFilename(), profileImage.getSize());

                // Create a unique filename
                String filename = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();

                // Ensure the upload directory exists
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                    logger.info("Created uploads directory: {}", uploadDir.toAbsolutePath());
                }

                // Save the file
                Path uploadPath = uploadDir.resolve(filename);
                Files.write(uploadPath, profileImage.getBytes(), StandardOpenOption.CREATE);

                // Set the new profile image URL
                String imageUrl = "/uploads/" + filename;
                logger.info("Saved new profile image to: {}", uploadPath.toAbsolutePath());
                logger.info("Setting profile image URL to: {}", imageUrl);

                // Update the user's profile image URL
                user.setProfileImageUrl(imageUrl);
            } catch (IOException e) {
                logger.error("Failed to save profile image during update", e);
                throw new IOException("Failed to save profile image: " + e.getMessage(), e);
            }
        } else {
            logger.info("No new profile image provided, keeping existing image: {}",
                    user.getProfileImageUrl());
        }

        // Save the updated user
        User updatedUser = userRepository.save(user);
        logger.info("User updated successfully. ID: {}, Profile Image URL: {}",
                updatedUser.getId(), updatedUser.getProfileImageUrl());

        return updatedUser;
    }
}*/
package com.shutterspace.user_service.service.impl;

import com.shutterspace.user_service.dto.UserSignupDTO;
import com.shutterspace.user_service.model.User;
import com.shutterspace.user_service.repository.UserRepository;
import com.shutterspace.user_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        String imagePath = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            // Generate a unique filename with timestamp to prevent caching issues
            String fileName = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();

            // Ensure upload directory exists
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);

            // Save the file
            Path filePath = uploadDir.resolve(fileName);
            Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Set the image URL path for the API endpoint
            imagePath = "/uploads/" + fileName;
            logger.info("Saved profile image: {}", filePath.toAbsolutePath());
        }

        User user = new User();
        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setSkills(dto.getSkills());
        user.setProfileImageUrl(imagePath);

        User savedUser = userRepository.save(user);
        logger.info("User registered with ID: {} and profile image: {}", savedUser.getId(), savedUser.getProfileImageUrl());
        return savedUser;
    }

    @Override
    public User updateUser(Long id, UserSignupDTO dto, MultipartFile profileImage) throws IOException {
        logger.info("Updating user with ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Update user information
        user.setFullName(dto.getFullName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        user.setSkills(dto.getSkills());

        // Handle profile image update
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                logger.info("Processing new profile image: {}, size: {} bytes",
                        profileImage.getOriginalFilename(), profileImage.getSize());

                // Create a unique filename with timestamp to prevent caching
                String filename = System.currentTimeMillis() + "_" + profileImage.getOriginalFilename();

                // Ensure the upload directory exists
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                    logger.info("Created uploads directory: {}", uploadDir.toAbsolutePath());
                }

                // Save the file
                Path uploadPath = uploadDir.resolve(filename);
                Files.write(uploadPath, profileImage.getBytes(), StandardOpenOption.CREATE);

                // Set the new profile image URL
                String imageUrl = "/uploads/" + filename;
                logger.info("Saved new profile image to: {}", uploadPath.toAbsolutePath());
                logger.info("Setting profile image URL to: {}", imageUrl);

                // Update the user's profile image URL
                user.setProfileImageUrl(imageUrl);
            } catch (IOException e) {
                logger.error("Failed to save profile image during update", e);
                throw new IOException("Failed to save profile image: " + e.getMessage(), e);
            }
        } else {
            logger.info("No new profile image provided, keeping existing image: {}",
                    user.getProfileImageUrl());
        }

        // Save the updated user
        User updatedUser = userRepository.save(user);
        logger.info("User updated successfully. ID: {}, Profile Image URL: {}",
                updatedUser.getId(), updatedUser.getProfileImageUrl());

        return updatedUser;
    }
}
