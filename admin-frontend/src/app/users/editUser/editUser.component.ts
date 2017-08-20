import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user.model';

declare const $: any;
@Component({
    selector: 'app-users-edit',
    templateUrl: './editUser.component.html',
})
export class EditUserComponent implements OnInit {
    @Input() user: User;
    @Output() updatedUser: EventEmitter<User> = new EventEmitter<User>();
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstname: [this.user.firstname],
            lastname: [this.user.lastname],
            username: [this.user.username],
            password: [this.user.password],
            email: [this.user.email]
        });
        $('#modal').modal('show');
    }

    saveUser() {
        if (this.form.valid) {
            $('#modal').modal('hide');
            this.updatedUser.emit(this.form.value);
        }
    }

    closeModal() {
        $('#modal').modal('hide');
        this.updatedUser.emit(null);
    }
}
