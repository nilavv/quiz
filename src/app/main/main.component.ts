import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import{Quiz,Question,Option} from '../models/index';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';


  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizName = "http://localhost:3000/questions";
    this.loadQuiz(this.quizName);
  }


  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      
      // this.startTime = new Date();
      // this.ellapsedTime = '00:00';
      //this.timer = setInterval(() => { this.tick(); }, 1000);
      //this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    //.slice(this.pager.index, this.pager.index + this.pager.size)
    //console.log(this.quiz.questions);
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      //console.log(question.answered);
      question.options.forEach((x) => {
         if (x.id !== option.id) x.selected = false;else{x.selected=true;}}
         );

    }
    

   
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    //console.log(question.options.every(x => x.selected));
    
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
