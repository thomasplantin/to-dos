function onGoogleSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  // window.location.replace('/home');
  console.log(window.location.pathname);
  console.log("Google User = " + JSON.stringify(googleUser));
  document.querySelector("#content").innerText = profile.getName();
  document.querySelector("#avatar").setAttribute('src', profile.getImageUrl());
}

function signOut() {
  gapi.auth2.getAuthInstance().signOut().then( function() {
    console.log('User signed out');
  });
}