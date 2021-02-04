package com.web.freshdate.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.web.freshdate.model.Item;
import com.web.freshdate.model.User;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{

	Item findByProduceID(int produceID);
	
	@Query("FROM Item WHERE user=?1")
	List<Item> findByUserId(User user);
	
}
