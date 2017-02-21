'use strict';

angular
	.module('app.config', ['firebase'])
	.config(config);

function config() {
	var conf = {
	    apiKey: "AIzaSyA4qsHaA0K3i6xe2L64_MOpnUoAcL_jrCc",
	    authDomain: "todo-cbb8c.firebaseapp.com",
	    databaseURL: "https://todo-cbb8c.firebaseio.com",
	    storageBucket: "todo-cbb8c.appspot.com",
		messagingSenderId: "959119166709"
	};
	firebase.initializeApp(conf);
}