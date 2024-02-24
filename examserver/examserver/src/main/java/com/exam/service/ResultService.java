package com.exam.service;

import java.util.Set;

import com.exam.model.User;
import com.exam.model.exam.Result;

public interface ResultService {
	
	public Result addResult(Result result);
	
	public Set<Result> getResultByUser(User user);
	
	public Set<Result> gellAllResult();
}
