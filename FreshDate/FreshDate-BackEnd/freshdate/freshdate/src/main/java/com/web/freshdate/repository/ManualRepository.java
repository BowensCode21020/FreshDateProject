package com.web.freshdate.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.web.freshdate.model.ItemManual;
import com.web.freshdate.model.User;

@Repository

public interface ManualRepository extends JpaRepository<ItemManual, Long>{

	@Query("FROM ItemManual WHERE user=?1")
	List<ItemManual> findByUserId(User user);
	
}
