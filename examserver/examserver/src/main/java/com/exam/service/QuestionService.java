package com.exam.service;

import java.util.List;
import java.util.Set;

import org.apache.poi.ss.usermodel.Row;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

import jakarta.mail.Multipart;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getQuestions();
	
	public Question getQuestion(Long questionId);
	
	public Set<Question> getQuestionsOfQuiz(Quiz quiz);
	
	public void deleteQuestion(Long quesId);
	
	public List<Result> readFile(MultipartFile file);
	
	public ResponseEntity<String> readFile(MultipartFile file,Long qId);
}
