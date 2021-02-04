package com.web.freshdate.controller;

import com.web.freshdate.repository.RecipeRepository;
import com.web.freshdate.repository.ItemRepository;
import com.web.freshdate.repository.ProduceRepository;
import com.web.freshdate.repository.RoleRepository;
import com.web.freshdate.repository.UserRepository;
import com.web.freshdate.repository.ExpirationRepository;
import com.web.freshdate.repository.ManualRepository;
import com.web.freshdate.request.LoginRequest;
import com.web.freshdate.request.SignupRequest;
import com.web.freshdate.response.JwtResponse;
import com.web.freshdate.response.MessageResponse;
import com.web.freshdate.security.jwt.JwtUtils;
import com.web.freshdate.security.services.UserDetailsImpl;
import com.web.freshdate.webutils.EmailManager;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.freshdate.model.ERole;
import com.web.freshdate.model.Expirations;
import com.web.freshdate.model.Item;
import com.web.freshdate.model.Produce;
import com.web.freshdate.model.Recipe;
import com.web.freshdate.model.Role;
import com.web.freshdate.model.User;
import com.web.freshdate.model.ItemManual;
import com.web.freshdate.webutils.EmailManager;
@CrossOrigin
@RestController
@RequestMapping("/freshdate/auth")
public class UserController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	EmailManager emailManager;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ExpirationRepository expirationRepository;

	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private ManualRepository manRepository;
	

	@PostMapping(value="/login")
	@ResponseBody
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
				userDetails.getId(), userDetails.getFirstName(), 
				userDetails.getLastName(), userDetails.getEmail(),
				roles));
		
	}

	@PostMapping(value="/signup")
	@ResponseBody
	public ResponseEntity<?> submitNewUserDetails(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already exists!"));
		}

		// Create new user's account
		User user = new User(null, signUpRequest.getFirstName(), 
		signUpRequest.getLastName(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}

			});
		}
		user.setRoles(roles);
		userRepository.save(user);
		
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@GetMapping(value = "/findproduce")
	@ResponseBody
	public ResponseEntity<List<Expirations>> findProduce() {
		List<Expirations> produce = this.expirationRepository.findAll();
		for (Expirations temp : produce) {
			System.out.println(temp);
		}
		return new ResponseEntity<List<Expirations>>(produce, HttpStatus.OK);
	}
	
	@RequestMapping(value="/display-by-name", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<String>> showByName() {
		List<String> nameList = this.expirationRepository.showNamesNonDup();
		return new ResponseEntity<List<String>>(nameList, HttpStatus.OK);		
	}
	
	@RequestMapping(value="/display-by-type", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<String>> showByType() {
		List<String> typeList = this.expirationRepository.showTypesNonDup();
		return new ResponseEntity<List<String>>(typeList, HttpStatus.OK);		
	}
	
	// Get some CRUD done
	@RequestMapping(value = "/add-item", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> addNewItem(@RequestBody Item addItem) {
		System.out.println(addItem.toString());

		UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		System.out.println(principal.getEmail());
		
		Item holdUser = new Item();
		
		Optional<User> user = this.userRepository.findByEmail(principal.getEmail());
		if (user.isPresent()) {
			holdUser.setUser(user.get());
		}
		List<Expirations> send = expirationRepository.findAll();
		Optional<Item> rep = itemRepository.findById(principal.getId());
		if(!rep.isPresent()) {	
				long daysToExpire = 0;
				LocalDateTime time = addItem.getSetDate();
				holdUser.setSetDate(time);
				ZoneId zoneId = ZoneId.systemDefault();
				long epoch = time.atZone(zoneId).toEpochSecond();
				
				Expirations temp = this.expirationRepository.findByNameAndType(addItem.getUserItemName(), addItem.getUserItemType());
				
				if (temp != null) {
					daysToExpire = temp.getExpiration();
					holdUser.setDaysUntil(daysToExpire);
					holdUser.setManInput(false);
					holdUser.getExpDate();
					holdUser.setUserItemName(addItem.getUserItemName());
					holdUser.setUserItemType(addItem.getUserItemType());
					holdUser.setProduceID(temp.getId());
					this.itemRepository.save(holdUser);
				}else {
					return new ResponseEntity<List<Item>>(HttpStatus.NOT_FOUND);
				}		
		}				
		return null;
	}
	
	@RequestMapping(value = "/show-user-list", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Item>> showList() {
		System.out.println("SEARCHING USER LIST");
		UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		
		Optional<User> user = this.userRepository.findByEmail(principal.getEmail());
	
		List<Item> items = itemRepository.findByUserId(user.get());
		
		
		//List<Item> items = this.itemRepository.findAll();
		System.out.println("Logged User List Size: " + items.size());
			

		return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
	}
	
	@RequestMapping(value="/edit-item", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Item> editDate(@RequestBody Item editItem ) {
		Optional<Item> itemToEdit = itemRepository.findById(editItem.getItemID());
		
		if (itemToEdit.isPresent()) {
			Item changeOption = itemToEdit.get();
			changeOption.setSetDate(editItem.getSetDate());
			changeOption.setUserItemName(editItem.getUserItemName());
			changeOption.setUserItemType(editItem.getUserItemType());
			return new ResponseEntity<Item>(itemRepository.save(changeOption), HttpStatus.OK);
		} else {
			return new ResponseEntity<Item>(HttpStatus.NOT_FOUND);
		}
				
	}
	
	@RequestMapping(value="/delete-item", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.DELETE)
	@ResponseBody
	public void deleteItem(Long itemID) {
		System.out.println(itemID);
		this.itemRepository.deleteById(itemID);
		
		
	}
	
//	System.out.println("SEARCHING USER LIST");
//	UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//	
//	
//	Optional<User> user = this.userRepository.findByEmail(principal.getEmail());
//
//	List<Item> items = itemRepository.findByUserId(user.get());
	
	@RequestMapping(value = "expirationlist",produces=MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	@ResponseBody
	public void getExpList() {
	//	System.out.println("itemString " + itemString);
		
		LocalDateTime now = LocalDateTime.now();
		// set yellow & red
		LocalDateTime yellow = now.plusDays(2);
		LocalDateTime red = now.plusDays(1);
		
		for(User user : userRepository.findAll()) {
			String message = "";
			String yellowMessage = "";
			String redMessage = "";
			String aboutMessage = "";
		
			for(Item item : user.getItems()) {
				if(item.getExpDate().toLocalDate().equals(yellow.toLocalDate())) {
					yellowMessage += item.getUserItemName() + "\n";
				}
				if(item.getExpDate().toLocalDate().equals(red.toLocalDate())) {
					redMessage += item.getUserItemName() + "\n";
				}
				if(item.getExpDate().toLocalDate().equals(now.toLocalDate())) {
					aboutMessage += item.getUserItemName() + "\n";
				}
				
			}
			
			message += "Expiring in 1 day: \n" + redMessage + "\n\n Expiring in 2 days: \n" + yellowMessage
					+ "\n\n Are set to expire within 24 hours: \n" + aboutMessage;
			
			try {
				emailManager.sendMail(user.getEmail(), message, "Expiration Updates");
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
					
	}
	

}
