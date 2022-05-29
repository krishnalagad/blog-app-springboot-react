package com.blogapp.exceptions;

@SuppressWarnings("serial")
public class InvalidUserDetailsException extends Exception {

	public InvalidUserDetailsException() {
		super("User entered invalid username or password !!");
	}
}
