
import { Question } from './question';

export class Quiz {
    id: number;
    name: string;
    description: string;
    
    questions: Question[];

    constructor(data: any) {
        //console.log(data);
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            //this.config = new QuizConfig(data.config);
            this.questions = [];
            //console.log(data.qu)
       
            data.forEach(q => {
                this.questions.push(new Question(q));

            });
        }
    }
}
