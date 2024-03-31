package com.exam.controller;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.User;
import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import com.exam.service.ResultService;

import io.jsonwebtoken.lang.Collections;

@RestController
@RequestMapping("/question")
//@CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin(origins = {"http://13.49.19.219", "http://localhost:59537","http://localhost:4200"})
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	@Autowired
	private ResultService resultService;
	
//	add Question
	
	@PostMapping("/")
	public ResponseEntity<Question> add(@RequestBody Question question)
	{
		return ResponseEntity.ok(questionService.addQuestion(question));
	}
	
//	update Question
	
	@PutMapping("/")
	public ResponseEntity<Question> update(@RequestBody Question question)
	{
		return ResponseEntity.ok(questionService.updateQuestion(question));
	}
	

	
	@GetMapping("/quiz/{qId}")
	public ResponseEntity<?> getQuestionByQuiz(@PathVariable("qId")Long qId)
	{
//		Quiz quiz = new Quiz();
//		quiz.setqId(qId);
//		return ResponseEntity.ok(questionService.getQuestionsOfQuiz(quiz));
		
		Quiz quiz = quizService.getQuiz(qId);
		
		Set<Question> questions = quiz.getQuestions();
		for(Question ques:questions)
		{
			ques.setAnswer(null);
		}
		List<Question> list = new ArrayList<>(questions);
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions()))
		{
			list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()));
		}
		
		// Shuffling the list
		java.util.Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	
//	get all question of any quiz
	@GetMapping("/quiz/all/{qId}")
	public ResponseEntity<?> getQuestionOfQuizAdmin(@PathVariable("qId")Long qId)
	{
		Quiz quiz = new Quiz();
		quiz.setqId(qId);
		return ResponseEntity.ok(questionService.getQuestionsOfQuiz(quiz));
	}
	
//	get Single question
	
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") Long quesId)
	{
		return questionService.getQuestion(quesId);
	}
	
//	Delete Question
	
	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable("quesId") Long quesId)
	{
		questionService.deleteQuestion(quesId);
	}
	
	
//	Submiting the Quiz
	@PostMapping("/eval_quiz/{userId}")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions,@PathVariable("userId") Long userId)
	{
		String quizTitle = questions.get(0).getQuiz().getTitle();
		Long quizid = questions.get(0).getQuiz().getqId();

		int marksGot =0;
		int correctedAnswer=0;
		int attempted=0;
		int numberOfQuestion=questions.size();
		double quizMarks =0;
		float percentage =0;
		for (Question ques : questions) {
//			single question
			Question question = questionService.getQuestion(ques.getQuesId());
			if (question.getAnswer().equals(ques.getGivenAnswer()))
			{
				correctedAnswer++;
			}
			if(ques.getGivenAnswer()!= null)
			{
				attempted++;
			}
		}
		quizMarks = Integer.parseInt(questions.get(0).getQuiz().getMaxMArks());
		marksGot = (int) (quizMarks / numberOfQuestion * correctedAnswer);
		percentage = (float) ((marksGot / quizMarks) * 100);
		
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("quizTitle", quizTitle);
		map.put("marksGot", marksGot);
		map.put("correctedAnswer", correctedAnswer);
		map.put("attempted", attempted);
		map.put("numberOfQuestion", numberOfQuestion);

		User user = new User();
		user.setId(userId);
		Quiz quiz = new Quiz();
		quiz.setqId(quizid);
		
		Result result = new Result();
		result.setQuiz_type(quizTitle);
		result.setMarksGot(marksGot);
		result.setCorrectedAnswer(correctedAnswer);
		result.setAttempted(attempted);
		result.setNumberOfQuestion(numberOfQuestion);
		result.setUser(user);
		result.setQuiz(quiz);
//		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
//		Date date = new Date();
		LocalDate currentDate = LocalDate.now();
        
        // Format the current date to a string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String dateString = currentDate.format(formatter);
		result.setDate(dateString);
		
		if(percentage>=35F)
		{
			result.setTest_result(true);
		}
		result.setTest_result(result.getTest_result());
		
		this.resultService.addResult(result);
		
		System.out.println("Percentage :"+percentage);
		System.out.println("Result Added Successfully...Hurrreeee");
		
		return ResponseEntity.ok(map);
	}
}
