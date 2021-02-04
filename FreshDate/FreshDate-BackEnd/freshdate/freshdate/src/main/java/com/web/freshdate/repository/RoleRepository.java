package com.web.freshdate.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.freshdate.model.ERole;
import com.web.freshdate.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByName(ERole name);

}
