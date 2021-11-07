package ru.mirea.news.agency.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.news.agency.backend.entity.Role;
import ru.mirea.news.agency.backend.model.ERole;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(ERole name);

    Boolean existsByName(ERole name);
}
