package com.example.SOFTProject.controllers;

import com.example.SOFTProject.model.Role;
import com.example.SOFTProject.model.User;
import com.example.SOFTProject.model.UserForm;
import com.example.SOFTProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping(value = "/api/read")
    public ResponseEntity<List<User>> read() {
        final List<User> users = userService.readAllUsers();

        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/api/read/{id}")
    public ResponseEntity<User> readUser(@PathVariable(name = "id") long id) {
        final User user = userService.readUser(id);

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/api/read/{id}/roles")
    public ResponseEntity<List<Role>> readRoles(@PathVariable(name = "id") long id) {
        final List<Role> roles = userService.getRolesByUserId(id);

        return roles != null && !roles.isEmpty()
                ? new ResponseEntity<>(roles, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/api/save")
    public ResponseEntity<?> create(@RequestBody UserForm userForm) {
        userService.createUser(userForm);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PutMapping(value = "/api/update")
    public ResponseEntity<?> update(@RequestBody UserForm userForm) {
        userService.updateUser(userForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/api/authorizedUser")
    public ResponseEntity<User> authorizedUser() {
        final User user = userService.getUserByEmail(userService.curUserEmail());

        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
