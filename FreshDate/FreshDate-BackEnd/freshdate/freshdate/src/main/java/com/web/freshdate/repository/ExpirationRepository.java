package com.web.freshdate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.web.freshdate.model.Expirations;

@Repository
public interface ExpirationRepository extends JpaRepository<Expirations, Long>{
	
	@Query("FROM Expirations WHERE itemType = ?1")
	Optional<Expirations> showByType(String itemType);
	
	@Query("FROM Expirations WHERE itemName=?1 AND itemType=?2")
	Expirations findByNameAndType(String itemName, String itemType);
	
	@Query(value="SELECT DISTINCT refer_name FROM eatfreshproduce.tb_exp_reference ORDER BY refer_name", nativeQuery=true)
	List<String> showNamesNonDup();
	
	@Query(value="SELECT DISTINCT refer_storage FROM eatfreshproduce.tb_exp_reference ORDER BY refer_storage", nativeQuery=true)
	List<String> showTypesNonDup();
	
	
	
}
