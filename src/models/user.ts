
import { Trip } from '../models/trip';

export class User {

  constructor(public uid: string, public email: string, public displayName?: string, public photoURL?: string, public trips?: Trip[]) { }

}