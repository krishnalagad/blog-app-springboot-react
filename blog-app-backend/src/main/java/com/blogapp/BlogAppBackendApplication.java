package com.blogapp;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.blogapp.config.AppConstants;
import com.blogapp.entities.Role;
import com.blogapp.repositories.RoleRepo;

@SpringBootApplication
public class BlogAppBackendApplication implements CommandLineRunner {
	
	@SuppressWarnings("unused")
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepo roleRepo;

	public static void main(String[] args) {
		SpringApplication.run(BlogAppBackendApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		
		System.out.println("Project started...");
		
		try {
			
			Role role1 = new Role();
			role1.setId(AppConstants.ADMIN_USER);
			role1.setName("ROLE_ADMIN");
			
			Role role2 = new Role();
			role2.setId(AppConstants.NORMAL_USER);
			role2.setName("ROLE_NORMAL");
			
			List<Role> roles = List.of(role1, role2);
			
			List<Role> result = this.roleRepo.saveAll(roles);
			result.forEach((role) -> {
				System.out.println(role.getName());
			});
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		System.out.println(this.passwordEncoder.encode("newpass1234"));
		
	}

}
