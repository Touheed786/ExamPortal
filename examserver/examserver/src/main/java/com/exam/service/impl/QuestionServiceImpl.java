package com.exam.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.apache.poi.sl.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
import com.exam.service.ResultService;

@Service
public class QuestionServiceImpl implements QuestionService{
	
	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public Question addQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepository.save(question);
	}

	@Override
	public Set<Question> getQuestions() {
		return new LinkedHashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		return this.questionRepository.findById(questionId).get();
	}

	@Override
	public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
		return this.questionRepository.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long quesId) {
		this.questionRepository.deleteById(quesId);
		
	}

	
	public List<Result> readFile(MultipartFile file){
		
		List<Result> results = new ArrayList<>();
		
		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
	        org.apache.poi.ss.usermodel.Sheet sheet = workbook.getSheetAt(0);
	        for (Row row : sheet) {
	            if (row.getRowNum() == 0) {
	                // Skip header row
	                continue;
	            }
	            
	            Cell IdCell = row.getCell(0);
	            Result result = new Result();
	            
	            
                if (IdCell != null) {
                    if (IdCell.getCellType() == CellType.NUMERIC) {
        	            result.setId((long) IdCell.getNumericCellValue());
                    } else if (IdCell.getCellType() == CellType.STRING) {
                        try {
                            result.setId((long) Integer.parseInt(IdCell.getStringCellValue()));
                        } catch (NumberFormatException e) {
                            // Handle the case where age is not a valid number
                            System.err.println("Invalid age value in row " + row.getRowNum());
                        }
                    }
                }
	            
	            Cell marksCell = row.getCell(2);
	            
	            if (marksCell != null) {
                    if (marksCell.getCellType() == CellType.NUMERIC) {
        	            result.setMarksGot((long) marksCell.getNumericCellValue());
                    } else if (IdCell.getCellType() == CellType.STRING) {
                        try {
                            result.setMarksGot(Integer.parseInt(marksCell.getStringCellValue()));
                        } catch (NumberFormatException e) {
                            // Handle the case where age is not a valid number
                            System.err.println("Invalid Marks value in row " + row.getRowNum());
                        }
                    }
                }

	            results.add(result);
	        }
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
		return results;
	}

	public ResponseEntity<String> readFile(MultipartFile file,Long qId) {
		
		List<Question> questions = new ArrayList<>();
		
		
		int count = 0;
		
		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
			org.apache.poi.ss.usermodel.Sheet sheet = workbook.getSheetAt(0);
			for(Row row : sheet) {
				Question question = new Question();
				Quiz quiz = new Quiz();
				quiz.setqId(qId);
				question.setQuiz(quiz);
				
				if (row.getRowNum() == 0) {
	                // Skip header row
	                continue;
	            }
				
				Cell questionCell = row.getCell(0);
				if (questionCell != null) {
        	            question.setContent(convertToStringType(questionCell));
                    }
				
				Cell option1Cell = row.getCell(1);
				if (questionCell != null) {
    	            question.setOption1(convertToStringType(option1Cell));
                }
				
				Cell option2Cell = row.getCell(2);
				if (questionCell != null) {
    	            question.setOption2(convertToStringType(option2Cell));
                }
				
				Cell option3Cell = row.getCell(3);
				if (questionCell != null) {
    	            question.setOption3(convertToStringType(option3Cell));
                }
				
				Cell option4Cell = row.getCell(4);
				if (questionCell != null) {
    	            question.setOption4(convertToStringType(option4Cell));
                }
				
				Cell answerCell = row.getCell(5);
				if (questionCell != null) {
    	            question.setAnswer(convertToStringType(answerCell));
                }
				questions.add(question);
				
				count++;
			}
			questionRepository.saveAll(questions);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(count+" Qusetions Has been Imported");
	}
	
	
	public String convertToStringType(Cell cellValue) {
		switch (cellValue.getCellType()) {
		case NUMERIC: return String.valueOf(cellValue.getNumericCellValue());
		case STRING: return cellValue.getStringCellValue();
		case BOOLEAN: return String.valueOf(cellValue.getBooleanCellValue());
		default:
			throw new IllegalArgumentException("Unexpected value: ");
		}
	}

}
