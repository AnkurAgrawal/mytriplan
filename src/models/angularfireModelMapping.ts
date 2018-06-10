import { ModelType } from 'angular-firestype';
import { Trip } from './trip';
import { User } from './user';
import { Itinerary } from './itinerary';

export const modelMapping: {[key: string]: ModelType<any>} = {    // {[key: string]: ModelType<any>} for TypeScript type check
  trips: {
    type: Trip,
    arguments: ['name', 'destination', 'dateFrom', 'dateTo', 'tripPic', 'description', 'itinerary', 'destinations'],
    structure: {
      itinerary: {
        type: Itinerary,
        arguments: ['plans']
      }
    },
    options: {
      timestampOnCreate: 'createdAt',
      timestampOnUpdate: 'updatedAt'
    }
  },
  users: {
    type: User,
    arguments: ['uid', 'email', 'displayName', 'photoURL', 'trips'],
    subcollections: {
      trips : {
        type: Trip,
        arguments: ['name', 'destination', 'dateFrom', 'dateTo', 'picture', 'description'],
      }
    },
    options: {
      timestampOnCreate: 'createdAt',
      timestampOnUpdate: 'updatedAt'
    }
  }
};