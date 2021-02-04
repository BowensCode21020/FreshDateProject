package com.web.freshdate.repository;

import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.web.freshdate.model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long>{

	
	List<Recipe> findByTitleContaining(String title);
	
	List<Recipe> findByIngredients(String ingredients);
	
}
