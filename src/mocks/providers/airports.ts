// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

// import { Airport } from '../../models/airport';

// @Injectable()
// export class Airports {
//   airports: Airport[] = [];

//   defaultAirport: any = {
//     "name": "Airport to Montreal",
//   };

//   constructor(public http: Http) {
//     let airports = [
//       {
//         "name": "Airport to Montreal",
//       },
//       {
//         "name": "Airport to Portland",
//       }
//     ];

//     for (let airport of airports) {
//       this.airports.push(new Airport(airport));
//     }
//   }

//   query(params?: any) {
//     if (!params) {
//       return this.airports;
//     }

//     return this.airports.filter((airport) => {
//       for (let key in params) {
//         let field = airport[key];
//         if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
//           return airport;
//         } else if (field == params[key]) {
//           return airport;
//         }
//       }
//       return null;
//     });
//   }

// }
