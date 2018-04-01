import { ModelType } from 'angular-firestype';
import { Trip } from './trip';
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
  }
};