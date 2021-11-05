package ru.mirea.news.agency.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.mirea.news.agency.backend.entity.Role;
import ru.mirea.news.agency.backend.entity.User;
import ru.mirea.news.agency.backend.exception.ResourceNotFoundException;
import ru.mirea.news.agency.backend.model.ERole;
import ru.mirea.news.agency.backend.payload.request.SignupRequest;
import ru.mirea.news.agency.backend.repository.RoleRepository;
import ru.mirea.news.agency.backend.repository.UserRepository;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(@PathVariable Long userId,
                           @Valid @RequestBody User userRequest) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setUsername(userRequest.getUsername());
                    user.setEmail(userRequest.getEmail());
                    if (!user.getPassword().equals(userRequest.getPassword()))
                        user.setPassword(encoder.encode(userRequest.getPassword()));
                    return userRepository.save(user);
                }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    @PutMapping("/{userId}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUserRoles(@PathVariable Long userId, @RequestBody SignupRequest rolesRequest) {
        return userRepository.findById(userId)
                .map(user -> {
                    Set<Role> roles = new HashSet<>();
                    rolesRequest.getRole().forEach(role -> {
                        switch (role) {
                            case "ROLE_ADMIN":
                                if (!roleRepository.existsByName(ERole.ROLE_ADMIN))
                                    roleRepository.save(new Role(ERole.ROLE_ADMIN));
                                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
                                roles.add(adminRole);

                                break;
                            case "ROLE_MODERATOR":
                                if (!roleRepository.existsByName(ERole.ROLE_MODERATOR))
                                    roleRepository.save(new Role(ERole.ROLE_MODERATOR));
                                Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR);
                                roles.add(modRole);

                                break;
                            default:
                                if (!roleRepository.existsByName(ERole.ROLE_USER))
                                    roleRepository.save(new Role(ERole.ROLE_USER));
                                Role userRole = roleRepository.findByName(ERole.ROLE_USER);
                                roles.add(userRole);
                        }
                    });
                    user.setRoles(roles);
                    return userRepository.save(user);
                }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Article not found with id " + userId));
    }
}
