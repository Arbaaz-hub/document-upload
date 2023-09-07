// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment  = {
  production: false,
  authURL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
  serverURL: 'https://documents-save-default-rtdb.firebaseio.com',
  firebaseConfig: {
    apiKey: "AIzaSyBgVNJUqAVERCd8oywT0-mJTn0pTNi_L8M",
    authDomain: "documents-save.firebaseapp.com",
    databaseURL: "https://documents-save-default-rtdb.firebaseio.com",
    projectId: "documents-save",
    storageBucket: "documents-save.appspot.com",
    messagingSenderId: "563461462624",
    appId: "1:563461462624:web:ce8a2dbfe964f786314105",
    measurementId: "G-8GHBEX9WY7"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
