package com.blogapp.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(value = {"password"})  // not to send password field in responce obj.
public class UserDto {
	
	private int id;
	
	@NotEmpty
	@Size(min=2, message = "User's name must be min 2 characters.")
	private String name;
	
	@Email(message = "Email ID is not valid.")
	private String email;
	
	@NotEmpty
	@Size(min = 8, max = 20, message = "Password must be min 8 and max 20 characters.")
	private String password;
	
	@NotEmpty
	private String about;

} 
