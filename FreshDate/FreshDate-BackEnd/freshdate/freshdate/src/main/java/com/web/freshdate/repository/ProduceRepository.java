package com.web.freshdate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.freshdate.model.Produce;

@Repository 

public interface ProduceRepository extends JpaRepository<Produce, Integer>{
	
	
//	@Query("FROM User WHERE email=?1 OR firstName=?1 OR lastName=?1")
//	List<User> searchUser (String keyword);
//	
//	@Query("SELECT u FROM Users u WHERE u.email=:email AND " + 
//	"u.firstName LIKE(CONCAT('%',:name,'%')) OR u.lastName =:name")
//	List<User>customSearchUser(@Param("name")String name, @Param("email")String email);

	@Query("FROM Produce WHERE name=?1 OR type=?1")
	List<Produce> findByNameAndType(String keyword);
	
	@Query("SELECT p FROM Produce p WHERE p.name=:name "
			+ "OR p.type =:type")
	List<Produce> searchByNameType(@Param("name")String name, @Param("type")String type);
}
