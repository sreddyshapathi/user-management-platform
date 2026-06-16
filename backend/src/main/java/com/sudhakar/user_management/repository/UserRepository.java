package com.sudhakar.user_management.repository;

import com.sudhakar.user_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByMobile(String mobile);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameAndEmail(
            String username,
            String email);
}