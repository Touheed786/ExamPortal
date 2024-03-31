package com.exam.service.impl;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.exam.CharDataResponse;
import com.exam.model.exam.ChartData;
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
	
	@Override
	public List<CharDataResponse> getChartData() {
		int totalCount = 0;
		
		List<CharDataResponse> charDataResponses = new ArrayList<>();
		Map<String, ChartData> map = new HashMap<>();
		List<Result> allResult= resultRepository.findAll();
		for(Result result:allResult) {
			String date = result.getDate();
            boolean testResult = result.getTest_result();
            ChartData chartData = map.getOrDefault(date, new ChartData());
            
            if(map.containsKey(date)) {
            	int passcount = map.get(date).getPassCount();
            	
            	if(testResult) {
//				chartData.getPassCount();
            		map.put(date,new ChartData(date,(map.get(date).getPassCount()+1) + (chartData.getFailCount()),"green",map.get(date).getPassCount()+1,chartData.getFailCount()));
            	}else {
//				chartData.getFailCount();
            		map.put(date,new ChartData(date,(chartData.getPassCount()) + (map.get(date).getFailCount()+1),"green",chartData.getPassCount(),map.get(date).getFailCount()+1));
            	}
            	totalCount+=1;
            }else {
            	if(testResult) {
//    				chartData.getPassCount();
                		map.put(date,new ChartData(date,1,"green",1,chartData.getFailCount()));
                	}else {
//    				chartData.getFailCount();
                		map.put(date,new ChartData(date,1,"green",chartData.getPassCount(),1));
                	}
            }
			}
		
		map.forEach((key,val)->{
			charDataResponses.add(new CharDataResponse(key, val));
		});
		
		System.out.println(charDataResponses);
		return charDataResponses;
	}
	
	

}
