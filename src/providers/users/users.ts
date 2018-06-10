import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Query, CollectionReference } from '@firebase/firestore-types';

import { User } from '../../models/user';
import { Trip } from '../../models/trip';
import { Api } from '../api/api';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { FirestoreProvider } from '../firestore/firestore';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UsersProvider {
  readonly collectionName: string = 'users';
  readonly tripsCollectionName: string = 'trips';
  private _currentUserTrips: Trip[];

  _user: any;

  constructor(public api: Api, private firestore: FirestoreProvider, private auth: AuthServiceProvider) {
  }

  getTripsForCurrentUser(): Observable<Trip[]> {
    return this.auth.userLoggedIn? this.getTripsForUser(this.auth.getCurrentUser().uid): null;
  }

  getTripsForUser(userId: string): Observable<Trip[]> {
    console.log('Fetching all the trips from Google Firestore for user: ' + userId);
    return this.firestore.getObservableCollection<Trip>(`${this.collectionName}/${userId}/${this.tripsCollectionName}`);
  }

  queryTripsForCurrentUser(params?: {field: string, type: string, value: string | number }[]): Observable<Trip[]> {
    return this.auth.userLoggedIn? this.queryTrips(this.auth.getCurrentUser().uid, params): null;
  }

  queryTrips(userId: string, params?: {field: string, type: string, value: string | number }[]): Observable<Trip[]> {
    return this.firestore.queryObservable<Trip>(`${this.collectionName}/${userId}/${this.tripsCollectionName}`, ref => {
      let query: CollectionReference | Query = ref;
      params.forEach((param) => {
        console.log(param);
        switch (param.type) {
          case "substr":
            query = query.orderBy(param.field);
            break;

          case ">=":
            query = query.orderBy(param.field);
            break;

          case "<":
            query = query.orderBy(param.field, 'desc');
            break;

          case "startAt":
            query = query.orderBy(param.field);
            break;

          case "endBefore":
            query = query.orderBy(param.field);
            break;

          default:
            break;
        }
      });
      params.forEach((param) => {
        switch (param.type) {
          case "substr":
            query = query.startAt(param.value).endAt(param.value + 'z');
            // query.where(key, '>=', params[key].value).where(key, '<=', params[key].value + 'z');
            break;

          case ">=":
            query = query.where(param.field, '>=', param.value);
            break;

          case "<":
            query = query.where(param.field, '<', param.value);
            break;

          case "==":
            query = query.where(param.field, '==', param.value);
            break;

          case "startAt":
            query = query.startAt(param.value);
            break;

          case "endBefore":
            query = query.endBefore(param.value);
            break;

          default:
            break;
        }
      });
      return query;
    });
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq
      .subscribe(res =>
        // If the API returned a successful response, mark the user as logged in
          this._loggedIn(res)
      , err => console.error('ERROR', err)
      );

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq
      .subscribe(data =>
        // If the API returned a successful response, mark the user as logged in
        this._loggedIn(data)
      , err => console.error('ERROR', err)
      );

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
