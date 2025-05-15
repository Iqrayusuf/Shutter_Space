//Business logic layer; interface + implementation pattern

package com.shutterspace.user_service.service;

import com.shutterspace.user_service.dto.UserSignupDTO;
import com.shutterspace.user_service.model.User;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;

public interface UserService {
    User registerUser(UserSignupDTO dto, MultipartFile profileImage) throws IOException;
    User updateUser(Long id, UserSignupDTO dto, MultipartFile profileImage) throws IOException;

}
