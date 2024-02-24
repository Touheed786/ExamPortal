package com.exam.service.impl;


import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.exam.Result;
import com.exam.repo.ResultRepository;
import com.exam.service.ResultService;

@Service
public class ResultServiceImpl implements ResultService {

	@Autowired
	private ResultRepository resultRepository;
	
	@Override
	public Result addResult(Result result) {
		// TODO Auto-generated method stub
		return this.resultRepository.save(result);
	}

	@Override
	public Set<Result> getResultByUser(User user) {
		// TODO Auto-generated method stub
		return resultRepository.findByUser(user);
	}

	@Override
	public Set<Result> gellAllResult() {
		// TODO Auto-generated method stub
		
		return new HashSet<>(resultRepository.findAll());
	}
	
	
	
	

}
