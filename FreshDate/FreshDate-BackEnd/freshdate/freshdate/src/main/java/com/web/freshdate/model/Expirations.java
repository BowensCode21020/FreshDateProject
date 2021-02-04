package com.web.freshdate.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;

import com.web.freshdate.repository.ExpirationRepository;
import com.web.freshdate.repository.ProduceRepository;

@Entity
@Table(name = "tb_exp_reference")

public class Expirations {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private long id;
	
	@Column(name="refer_name")
	private String itemName;
	
	@Column(name="refer_storage")
	private String itemType;
	
	@Column(name="refer_expiration")
	private long expiration;
	
	@Transient
	private boolean isYellow = false;
	
	@Transient
	private boolean isRed = false;

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	public long getExpiration() {
		return expiration;
	}

	public void setExpiration(long l) {
		this.expiration = l;
	}

	
	
	
	

}
