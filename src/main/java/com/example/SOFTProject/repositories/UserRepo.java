package com.example.SOFTProject.repositories;

import com.example.SOFTProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
