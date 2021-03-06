import { Message } from './message.model';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
    private messages: Message[] = []; //create empty array
    messageIsEdit = new EventEmitter<Message>();
    
    //private url = 'https://angular2-nodejs-test.herokuapp.com/message';
    private url = 'http://localhost:4000/message';

    constructor(private http:Http) {}

    addMessage(message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
               return this.http.post(this.url, body, {headers:headers}) //return Observable
                        .map((response: Response) => response.json()) //map function automatically throw Observable
                        .catch((error:Response) => Observable.throw(error.json()));
    }

    getMessages() {
        return this.http.get(this.url)
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'Dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1); //Remove one message in the index of messages array.
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        
    }
}