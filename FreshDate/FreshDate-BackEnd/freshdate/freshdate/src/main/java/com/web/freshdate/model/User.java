package com.web.freshdate.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_user",
uniqueConstraints = {
		@UniqueConstraint(columnNames = "user_email"),	
})
public class User {
	
	// get the id for the user and put it on a column for the Items
	// THIS will be the foreign key for Items table
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 20)
	@Column(name="first_name")
	private String firstName;
	
	@NotBlank
	@Size(max = 20)
	@Column(name="last_name")
	private String lastName;

	@NotBlank
	@Size(max = 50)
	@Email
	@Column(name="user_email")
	private String email;
	
	
	@NotBlank
	@Size(max = 120)
	@Column(name="user_code")
	private String password;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_role",
				joinColumns = @JoinColumn(name="user_id"),
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<Item> items;
	
	@OneToMany(mappedBy="userMan", cascade=CascadeType.ALL)
	private List<ItemManual> itemsMan;
	
	public User() {}

	
	
	public User(Integer id, String firstName, String lastName, String email, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}



	public List<Item> getItems() {
		return items;
	}



	public void setItems(List<Item> items) {
		this.items = items;
	}
	


	
}
