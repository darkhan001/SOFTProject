package com.example.SOFTProject.repositories;

import com.example.SOFTProject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepo extends JpaRepository<Role, Long> {

    Role getRoleByName(String name);

    @Query("select r from User u join u.roles r where u.id = :userId")
    List<Role> getRolesByUserId(@Param("userId") long id);

}
