import React, { Component } from 'react';
import './App.css';
import { Router, Route, hashHistory } from 'react-router'

import Navigation from "./Navigation";
import Home from "./Home";
import Login from "./Login";
import ReviewPage from "./ReviewPage";
import * as firebase from "firebase";

const Home = () => <div><h1>welcome to harker courses</h1><a href="/#/login">login</a></div>

export default class App extends Component {
    constructor(props){
        super(props);

        // Init firebase
        var config = {
			apiKey: "AIzaSyDGzHdJ-4B35kuShuJCgmHhkbBy_nMCvy4",
			authDomain: "harker-courses.firebaseapp.com",
			databaseURL: "https://harker-courses.firebaseio.com",
			storageBucket: "harker-courses.appspot.com",
			messagingSenderId: "125151666633"
		};
		firebase.initializeApp(config);
    }
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/review' component={ReviewPage} />
      </Router>
    );
  }
}

