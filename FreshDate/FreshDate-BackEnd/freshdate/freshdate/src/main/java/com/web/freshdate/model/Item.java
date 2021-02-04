package com.web.freshdate.model;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.web.freshdate.repository.ExpirationRepository;
import com.web.freshdate.repository.ProduceRepository;

@Entity
@Table(name = "tb_user_produce_log")
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "item_id")
	private long itemID;
	
	@Column(name = "user_item_name")
	private String userItemName;
	
	@Column(name = "user_item_type")
	private String userItemType;
	
	@Column(name = "man_input")
	private boolean manInput;

	@Column(name = "user_produce_id")
	private long produceID;

	@Column(name = "user_set_date")
	private LocalDateTime setDate;

	@Column(name = "user_days_until_exp")
	private long daysUntil;

	@ManyToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User user;

	public long getItemID() {
		return itemID;
	}

	public void setItemID(long itemID) {
		this.itemID = itemID;
	}

	public LocalDateTime getSetDate() {
		return setDate;
	}

	public long getDaysUntil() {
		return daysUntil;
	}

	public void setDaysUntil(long daysUntil) {// long check to see if custom produce input or drop down produce input
		
//		if (this.manInput) {
//			this.daysUntil = daysUntil;
//			return true;
//		}
// 
//		long daysToExpire = 0;
//		if(expirationRepository.findById(this.produceID).isPresent()) {
//			daysToExpire = expirationRepository.findById(this.produceID).get().getExpiration();	
//		} else {
//			System.out.println("invalid produce id" + this.produceID);
//			return false;
//		}
		
		this.daysUntil = daysUntil;
			
	}

	public long getProduceID() {
		return produceID;
	}

	public void setProduceID(long produceID) {
		this.produceID = produceID;
	}

	public void setSetDate(LocalDateTime setDate) {
		
		this.setDate = setDate;
	}

	public LocalDateTime getYellowDate() {
		return this.setDate.plusDays(daysUntil - 2);
	}

	public LocalDateTime getRedDate() {
		return this.setDate.plusDays(daysUntil - 1);
	}

	public LocalDateTime getExpDate() {
		return this.setDate.plusDays(daysUntil);
	}
	
	
	public boolean isManInput() {
		return manInput;
	}

	public boolean setManInput(boolean manInput) {
		return this.manInput = manInput;
	}

	public String getUserItemName() {
		return userItemName;
	}

	public void setUserItemName(String userItemName) {
		this.userItemName = userItemName;
	}

	public String getUserItemType() {
		return userItemType;
	}

	public void setUserItemType(String userItemType) {
		this.userItemType = userItemType;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Item [itemID=" + itemID + ", produceID=" + produceID + ", setDate=" + setDate + ", daysUntil="
				+ daysUntil + ", manInput=" + manInput + "]";
	}
}
