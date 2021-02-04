package com.web.freshdate.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.freshdate.model.Recipe;
import com.web.freshdate.repository.RecipeRepository;

@CrossOrigin
@RestController
@RequestMapping("freshdate/api")

public class RecipeController {
	
	@Autowired
	private RecipeRepository recipeRepository;
	
	@GetMapping("/recipes")
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipes(@RequestParam(required = false) String title) {
		 try {
		      List<Recipe> recipes = new ArrayList<Recipe>();

		      if (title == null)
		    	  recipeRepository.findAll().forEach(recipes::add);
		      else
		    	  recipeRepository.findByTitleContaining(title).forEach(recipes::add);

		      if (recipes.isEmpty()) 
		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		      
		      return new ResponseEntity<List<Recipe>>(recipes, HttpStatus.OK);
		    } catch (Exception e) {
		      return new ResponseEntity<List<Recipe>>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }

		  
	}
	
	@RequestMapping(value = "/recipes/{id}", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	 public ResponseEntity<Recipe> getRecipeById(@PathVariable("id") long id) {
	    Optional<Recipe> recipeData = recipeRepository.findById(id);

	    if (recipeData.isPresent()) {
	      return new ResponseEntity<>(recipeData.get(), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	
	@RequestMapping(value = "/recipes", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
		try {
		      Recipe _recipe = recipeRepository
		          .save(new Recipe(recipe.getTitle(), recipe.getDirections(), recipe.getIngredients()));
		      return new ResponseEntity<>(_recipe, HttpStatus.CREATED);
		    } catch (Exception e) {
		      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
	}
	
	
	@PutMapping("/recipes/{id}")
	@ResponseBody
	public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") long id, @RequestBody Recipe recipe) {
		Optional<Recipe> recipeData = recipeRepository.findById(id);

	    if (recipeData.isPresent()) {
	    	Recipe _recipe = recipeData.get();
	    	_recipe.setTitle(recipe.getTitle());
	    	_recipe.setDirections(recipe.getDirections());
	    	_recipe.setIngredients(recipe.getIngredients());
	      return new ResponseEntity<>(recipeRepository.save(_recipe), HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	  @DeleteMapping("/recipes/{id}")
	  @ResponseBody
	  public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") long id) {
		  try {
		      recipeRepository.deleteById(id);
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    } catch (Exception e) {
		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }
	  }

	  @DeleteMapping("/recipes")
	  public ResponseEntity<HttpStatus> deleteAllRecipes() {
		  try {
		      recipeRepository.deleteAll();
		      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		    } catch (Exception e) {
		      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		    }
	  }
	  
	  @GetMapping("/recipes/ingredients")
	  public ResponseEntity<List<Recipe>> findByIngredients(@RequestParam(required = false) String ingredients) {
	    try {
	    	 List<Recipe> ingredient = new ArrayList<Recipe>();

		      if (ingredients == null)
		    	  recipeRepository.findAll().forEach(ingredient::add);
		      else
		    	  recipeRepository.findByIngredients(ingredients).forEach(ingredient::add);

		      if (ingredient.isEmpty()) {
		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		      }
		      return new ResponseEntity<>(ingredient, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }
	
}
