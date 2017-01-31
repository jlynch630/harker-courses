import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export default class Login extends Component {

	constructor(props){
		super(props);
		this.state_props = {
			loggedIn: false
		};

		// Init auth
		var config = {
			apiKey: "AIzaSyDGzHdJ-4B35kuShuJCgmHhkbBy_nMCvy4",
			authDomain: "harker-courses.firebaseapp.com",
			databaseURL: "https://harker-courses.firebaseio.com",
			storageBucket: "harker-courses.appspot.com",
			messagingSenderId: "125151666633"
		};
		firebase.initializeApp(config);
		this.authenticateUser();
	}

	setState(d){
		for(var k in d){
			this.state_props[k] = d[k];
		}
		this.forceUpdate();
	}

	authenticateUser() {
		// Install state change handler
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var displayName = user.displayName;
	            var email = user.email;
	            var emailVerified = user.emailVerified;
	            var photoURL = user.photoURL;
	            var uid = user.uid;
	            var providerData = user.providerData;
	            user.getToken().then(function(accessToken) {
					var login_info = {
	  	                displayName: displayName,
	  	                email: email,
	  	                emailVerified: emailVerified,
	  	                photoURL: photoURL,
	  	                uid: uid,
	  	                accessToken: accessToken,
	  	                providerData: providerData
					};
					console.log(JSON.stringify(login_info, null, '  '));
					this.setState({
						loggedIn: true,
						userInfo: login_info
					});
					/*
	              document.getElementById('sign-in-status').textContent = 'Signed in';
	              document.getElementById('sign-in').textContent = 'Sign out';
	              document.getElementById('account-details').textContent = JSON.stringify({
	                displayName: displayName,
	                email: email,
	                emailVerified: emailVerified,
	                photoURL: photoURL,
	                uid: uid,
	                accessToken: accessToken,
	                providerData: providerData
	              }, null, '  ');
					*/
	            }.bind(this));
			} else {
				this.setState({
					loggedIn: false
				})
				/*
				// User is signed out.
				document.getElementById('sign-in-status').textContent = 'Signed out';
				document.getElementById('sign-in').textContent = 'Sign in';
				document.getElementById('account-details').textContent = 'null';
				*/
			}
		}.bind(this), function(error) {
			console.log(error);
		}).bind(this);
	}

	handleSubmit(event) {

	}

	signOut(){
		firebase.auth().signOut().then(() => {
			this.setState({
				loggedIn: false
			});
			// TODO: Re-init firebase ui sign in
			// Define UI Config.
	        var uiConfig = {
	            signInSuccessUrl: '/',
	            signInOptions: [
	                // Leave the lines as is for the providers you want to offer your users.
	                firebase.auth.GoogleAuthProvider.PROVIDER_ID
	                //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	                //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	                //firebase.auth.GithubAuthProvider.PROVIDER_ID,
	                //firebase.auth.EmailAuthProvider.PROVIDER_ID
	            ],
	            // Terms of service url.
	            tosUrl: 'google.com'
	        };

	        // Initialize the FirebaseUI Widget using Firebase.
	        var ui = new firebaseui.auth.AuthUI(firebase.auth());

	        // The start method will wait until the DOM is loaded.
	        ui.start('#firebaseui-auth-container', uiConfig);
		}, (err) => {
			console.log(err);
		});
	}

	html_gen() {
		console.log(this.state_props.loggedIn);
		if(!this.state_props.loggedIn){
			return (
				<form className='loginForm' onSubmit={this.handleSubmit.bind(this)}>
					<h3>Login</h3>
					<label htmlFor="uid">Username:</label>
					<div className="input-group">
					  <input type="text" className="form-control" placeholder="Username" ref='uid' />
					  <span className="input-group-addon" id="basic-addon1">@students.harker.org</span>
					</div>
					<div className="form-group">
					  <label htmlFor="pwd">Password:</label>
					  <input type="password" className="form-control" placeholder="Password" ref='pwd' />
					</div>
					<div id="firebaseui-auth-container"></div>
	        	</form>
			);
		} else {
			return (
				<div>
					{ JSON.stringify(this.state_props.userInfo) }
					<br />
					<button type="button" className="btn btn-primary" onClick={this.signOut.bind(this)}>
						Sign Out
					</button>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				{ this.html_gen() }
			</div>
		);
	}
}