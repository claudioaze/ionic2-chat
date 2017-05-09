import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ChatService {

    constructor(private af: AngularFire) {        
    }

    getChat(): FirebaseListObservable<any> {
        return this.af.database.list('chat');
    }
}