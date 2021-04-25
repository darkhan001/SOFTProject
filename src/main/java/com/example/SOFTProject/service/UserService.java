package com.example.SOFTProject.service;

import com.example.SOFTProject.model.Role;
import com.example.SOFTProject.model.User;
import com.example.SOFTProject.model.UserForm;

import java.util.List;

public interface UserService {

    /* CRUD */
    void createUser(UserForm userForm);

    List<User> readAllUsers();

    User readUser(long id);

    void updateUser(UserForm userForm);

    void deleteUser(long id);

    boolean validateUser(User user);

    List<Role> getRolesByUserId(long id);

    User getUserByEmail(String email);

    /* For authorized user */
    String curUserEmail();

}
