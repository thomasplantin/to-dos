function signOut() {
  gapi.auth2.getAuthInstance().signOut().then( function() {
    console.log('User signed out');
  });
}