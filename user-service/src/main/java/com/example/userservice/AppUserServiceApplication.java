package com.example.userservice;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;


@EnableDiscoveryClient
@SpringBootApplication
public class AppUserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AppUserServiceApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public Keycloak keycloakClient() {
        return KeycloakBuilder.builder().serverUrl("http://192.168.8.34:8080/auth")
                .realm("springboot")
                .clientId("user-client")
                .clientSecret("d3a9bca3-fed1-4436-8c42-1edb245d433e")
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .build();
    }
}
