package com.web.freshdate.batch;

import com.web.freshdate.repository.ItemRepository;
import com.web.freshdate.repository.UserRepository;
import com.web.freshdate.security.services.UserDetailsImpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import javax.transaction.Transactional;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.web.freshdate.model.Item;
import com.web.freshdate.model.User;

@Component
@Transactional
@Service
public class CountdownConfig {
	
	/*	Spring Batch Rough:
	 * 
	 * WHAT I WANT IT TO DO:
	 * 
	 * 1. Go through the database Item (tb_user_produce_log)
	 * 
	 * Find all of the items that you have available (itemRepository.findAll())
	 * give back all of the items I will have.
	 * 
	 * I CARE ABOUT WHERE Today's Date + 2 days is equal to the Item Expiration Date.
	 * I CARE ABOUT WHERE Today's Date + 1 day is equal to the Item...
	 * 
	 * WE need to group these by USER (It will be annoying if I get 50 items that are going bad
	 * 1 user has all these items, etc.)
	 * 
	 * DATA STRUCTURES:
	 * MAP<userEmail, ArrayList<Item>>
	 * 
	 * FOR EACH email, I will have a list of the items that are going to go bad.
	 * Subject line: About to expire tomorrow"
	 * 
	 * 2 emails: Items expiring in Day 1 or Day 2.
	 * 
	 * 
	 * QUESTIONS FOR MR. Deeds:
	 * 
	 * Spring Batch Structure for this particular problem
	 * 
	 * What is the Potential for this other than emails? I would rather send a notification message when
	 * a user logs in, other than an email.
	 * 
	 * 
	 * 
	 */
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ItemRepository itemRepo;
	
	public List<Item> getDates(Optional<User> user, Item item) {
		
		Item holdItem = new Item();
		user = userRepo.findById(item.getUser().getId());

		if (user.isPresent()) {
			holdItem.setUser(user.get());
			
			LocalDateTime now = LocalDateTime.now();
			// set yellow & red
			LocalDateTime yellow = now.plusDays(2);
			LocalDateTime red = now.plusDays(1);
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			
			List<Item> holdValue = new ArrayList<Item>();
			if(holdItem.getExpDate().equals(yellow)) {
//				holdValue.add(holdItem.getYellowDate().format(formatter));
			}
			if(holdItem.getExpDate().equals(red)) {
//				holdValue.add(holdItem.getRedDate().format(formatter));
			}
			if(holdItem.getExpDate().equals(now)) {
//				holdValue.add(holdItem.getExpDate().format(formatter));
			}
			
			
			
			
			

		}
		
		
		
		return null;
		
	}
	
//	


}
