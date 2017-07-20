import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from './message.model';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.messageService.messageIsEdit.subscribe(
           (message: Message) => this.message = message
        );
    }

    onClear(form:NgForm) {
        this.message = null;
        form.resetForm();
    }

    onSubmit(form:NgForm) {
     if(this.message) {
         //Edit
         this.message.content = form.value.content;
         this.messageService.updateMessage(this.message);
         this.message = null;
     } else {
         //Create
        const message = new Message(form.value.content, 'Max');
        this.messageService.addMessage(message)
            .subscribe(
                data => console.log(data),
                error => console.error(error),              
            );         
     }
      form.resetForm();
    }
}