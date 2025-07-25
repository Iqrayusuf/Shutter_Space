//	Interfaces extending JpaRepository to access DB

package com.shutterspace.user_service.repository;

import com.shutterspace.user_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
