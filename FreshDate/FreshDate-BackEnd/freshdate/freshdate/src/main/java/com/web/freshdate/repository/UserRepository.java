package com.web.freshdate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.freshdate.model.User;

@Repository 

public interface UserRepository extends JpaRepository<User, Long>{
	Optional<User> findByEmail(String email);
	
	Boolean existsByEmail(String email);
	
//	@Query("FROM Accounts WHERE email=?1 OR password=?2")
//	Optional<User> login(String email, String password);
	
	@Query("FROM User WHERE email=?1 OR firstName=?1 OR lastName=?1")
	List<User> searchUser (String keyword);
	
	@Query("SELECT u FROM User u WHERE u.email=:email AND " + 
	"u.firstName LIKE(CONCAT('%',:name,'%')) OR u.lastName =:name")
	List<User>customSearchUser(@Param("name")String name, @Param("email")String email);

	Optional<User> findById(long id);

	void deleteById(String email);
	
}
