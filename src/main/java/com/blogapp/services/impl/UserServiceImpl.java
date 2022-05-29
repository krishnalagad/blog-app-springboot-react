package com.blogapp.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogapp.entities.User;
import com.blogapp.payload.UserDto;
import com.blogapp.repositories.UserRepo;
import com.blogapp.services.UserService;
import com.blogapp.exceptions.*;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto createUser(UserDto userDto) {
		
		User user = this.userDtoToUser(userDto);
		User savedUser = this.userRepo.save(user);
		return this.userToUserDto(savedUser);
	}

	@Override
	public UserDto updateeUser(UserDto userDto, Integer userId) {
		
		User user  = this.userRepo.findById(userId)
				.orElseThrow((() -> new ResourceNotFoundException("User", " Id ", userId)));
		
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());
		
//		User user2 = this.modelMapper.map(userDto, User.class);
		
		User updatedUser = this.userRepo.save(user);
		return this.userToUserDto(updatedUser);
	}

	@Override
	public UserDto getUserById(Integer userId) {
		
		User user = this.userRepo.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User", " Id ", userId));
		
		return this.userToUserDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		
		List<User> users = this.userRepo.findAll();
		
		List<UserDto> userDtos = users.stream().map(user -> this.userToUserDto(user)).collect(Collectors.toList());
		return userDtos;
	}

	@Override
	public void deleteUserById(Integer userId) {
		
		User user = this.userRepo.findById(userId).
				orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		
		this.userRepo.delete(user);

	}
	
	private User userDtoToUser(UserDto userDro) {
		
//		User user = new User();
		
//		user.setId(userDro.getId());
//		user.setName(userDro.getName());
//		user.setEmail(userDro.getEmail());
//		user.setPassword(userDro.getPassword());
//		user.setAbout(userDro.getAbout());
		
		User user = this.modelMapper.map(userDro, User.class);
		
		return user;
	}
	
	private UserDto userToUserDto(User user) {
		
//		UserDto userDto = new UserDto();
//		
//		userDto.setId(user.getId());
//		userDto.setName(user.getName());
//		userDto.setEmail(user.getEmail());
//		userDto.setPassword(user.getPassword());
//		userDto.setAbout(user.getAbout());
		
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		
		return userDto;
	}

}
