package com.web.freshdate.model;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="tb_set_manual_date")
public class ItemManual {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="manual_input_id")
	private long id;
	
	@Column(name="manual_input_name")
	private String manualNameInput;
	
	@Column(name="manual_input_date")
	private LocalDate manualDate;
	
	@Column(name="manual_input_expiration")
	private LocalDate manualExpire;
	
	@Column(name="difference_between")
	private long differenceBetwDates;
	
	@ManyToOne(cascade=CascadeType.DETACH)
	@JoinColumn(name="user_id")
	@JsonIgnore
	private User userMan;

	public User getUser() {
		return userMan;
	}

	public void setUser(User user) {
		this.userMan = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getManualNameInput() {
		return manualNameInput;
	}

	public void setManualNameInput(String manualNameInput) {
		this.manualNameInput = manualNameInput;
	}

	public LocalDate getManualDate() {
		return manualDate;
	}

	public void setManualDate(LocalDate manualDate) {
		this.manualDate = manualDate;
	}

	public LocalDate getManualExpire() {
		return manualExpire;
	}

	public void setManualExpire(LocalDate manualExpire) {
		this.manualExpire = manualExpire;
	}
	
	public long getDifferenceBetwDates() {
		return differenceBetwDates;
	}

	public void setDifferenceBetwDates(long differenceBetwDates) {
		
		LocalDate tempInp = this.manualDate;
		LocalDate tempExp = this.manualExpire;
		if(!tempInp.isEqual(tempExp)) {
			long days = ChronoUnit.DAYS.between(tempInp, tempExp);
			this.differenceBetwDates = days;
		} else {
			System.out.println("This item has already expired! "+ this.id);
		}
	}

	@Override
	public String toString() {
		return "ItemManual [id=" + id + ", manualNameInput=" + manualNameInput + ", manualDate=" + manualDate
				+ ", manualExpire=" + manualExpire + ", differenceBetwDates=" + differenceBetwDates + "]";
	}


}
