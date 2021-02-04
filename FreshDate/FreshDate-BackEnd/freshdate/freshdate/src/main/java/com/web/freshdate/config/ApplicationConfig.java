package com.web.freshdate.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

	@Configuration
	@EnableJpaRepositories(basePackages="com.web.freshdate.repository")
	@EntityScan(basePackages="com.web.freshdate.model")
	public class ApplicationConfig {
		
	}
	
