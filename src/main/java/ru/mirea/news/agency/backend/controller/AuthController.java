package ru.mirea.news.agency.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.mirea.news.agency.backend.entity.Role;
import ru.mirea.news.agency.backend.entity.User;
import ru.mirea.news.agency.backend.model.ERole;
import ru.mirea.news.agency.backend.payload.request.LoginRequest;
import ru.mirea.news.agency.backend.payload.request.SignupRequest;
import ru.mirea.news.agency.backend.payload.response.JwtResponse;
import ru.mirea.news.agency.backend.payload.response.MessageResponse;
import ru.mirea.news.agency.backend.repository.RoleRepository;
import ru.mirea.news.agency.backend.repository.UserRepository;
import ru.mirea.news.agency.backend.security.jwt.JwtUtils;
import ru.mirea.news.agency.backend.security.services.UserDetailsImpl;

import javax.validation.Valid;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @GetMapping("/preauthorize")
    public Collection<?> preauthorize(Authentication authentication) {
        return authentication.getAuthorities();
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, Authentication authentication) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            if (!roleRepository.existsByName(ERole.ROLE_USER))
                roleRepository.save(new Role(ERole.ROLE_USER));
            Role userRole = roleRepository.findByName(ERole.ROLE_USER);
            roles.add(userRole);
        } else {
            if (authentication != null && (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_MODERATOR")) ||
                    authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))))
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            if (!roleRepository.existsByName(ERole.ROLE_ADMIN))
                                roleRepository.save(new Role(ERole.ROLE_ADMIN));
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN);
                            roles.add(adminRole);

                            break;
                        case "mod":
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
            else {
                if (!roleRepository.existsByName(ERole.ROLE_USER))
                    roleRepository.save(new Role(ERole.ROLE_USER));
                Role userRole = roleRepository.findByName(ERole.ROLE_USER);
                roles.add(userRole);
            }
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
