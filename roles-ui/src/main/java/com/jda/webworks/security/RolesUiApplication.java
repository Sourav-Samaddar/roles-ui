package com.jda.webworks.security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients("com.jda.webworks.security")
@EnableEurekaClient
public class RolesUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RolesUiApplication.class, args);
	}

}
