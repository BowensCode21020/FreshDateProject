package com.web.freshdate.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages="com.web")
public class SpringBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBackEndApplication.class, args);
	}
}
