import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(private http: Http) { }

    getUsers() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get('assets/users.json', { headers: headers })
            .map(res => res.json()).catch((err => err.json()));
    }
}
