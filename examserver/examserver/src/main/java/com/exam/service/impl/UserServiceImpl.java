package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
//	creating user
	@Override
	public User createUser(User user, Set<UserRole> userRole) throws Exception {
		User local = userRepository.findByUsername(user.getUsername());
		if( local != null)
		{
			System.out.println("User is already there");
			throw new Exception("User Already Present!!");
		}else {
//			create user 
			for(UserRole ur:userRole) {
				roleRepository.save(ur.getRole());
			}
			user.getUserRole().addAll(userRole);
			local = this.userRepository.save(user);
		}
	return local;
	}

	@Override
	public User getUser(String username) {
		// TODO Auto-generated method stub
		User user =  this.userRepository.findByUsername(username);
		return user;
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}

	@Override
	public User updateUser(User user) {
		return this.userRepository.save(user);
//		// TODO Auto-generated method stub
//		User user1 = this.userRepository.findByUsername(userName);
//		user1.setFirstName(user.getFirstName());
//		user1.setUsername(user.getUsername());
//		user1.setEmail(user.getEmail());
//		user1.setLastName(user.getLastName());
//		user1.setPassword(user.getPassword());
//		user1.setPhone(user.getPhone());
//		user1.setProfile(user.getProfile());
//		user1.setEnable(user.isEnable());
//		userRepository.save(user1);
//		return user1;
	}

	@Override
	public User getUserById(long userId) {
		// TODO Auto-generated method stub
		return userRepository.findById(userId).get();
	}
	

}
