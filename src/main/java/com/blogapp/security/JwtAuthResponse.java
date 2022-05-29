package com.blogapp.security;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {
	
	private String token;
	private Date tokenCreationDate;
	private String tokenValidity;
}
