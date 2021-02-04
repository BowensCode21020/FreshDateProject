package com.web.freshdate.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonIgnoreProperties(ignoreUnknown = true)

@Entity
@Table(name = "tb_expiration_data")
public class Produce {
	
	 
	// reference a column on the item side
	// mappedby="id"
	// on this side should be a primary key
	// referencing a column from the other side
	
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		@Column(name="id")
		private int id;
		
		@Column(name="produce_name")
		private String name;
		
		@Column(name="produce_status")
		private String type;
		
		@Column(name= "set_date" )
		private Timestamp setDate;
		
		@Column(name= "yellow_date" )
		private Timestamp yellowDate;
		
		@Column(name= "red_date" )
		private Timestamp redDate;
		
		@Column(name="expiration")
		private Timestamp expire;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public Timestamp getSetDate() {
			return setDate;
		}

		public void setSetDate(Timestamp setDate) {
			this.setDate = setDate;
		}

		public Timestamp getYellowDate() {
			return yellowDate;
		}

		public void setYellowDate(Timestamp yellowDate) {
			this.yellowDate = yellowDate;
		}

		public Timestamp getRedDate() {
			return redDate;
		}

		public void setRedDate(Timestamp redDate) {
			this.redDate = redDate;
		}

		public Timestamp getExpire() {
			return expire;
		}

		public void setExpire(Timestamp expire) {
			this.expire = expire;
		}

		@Override
		public String toString() {
			return "Produce [id=" + id + ", name=" + name + ", type=" + type + ", setDate=" + setDate + ", yellowDate="
					+ yellowDate + ", redDate=" + redDate + ", expire=" + expire + "]";
		}

		
}


	
