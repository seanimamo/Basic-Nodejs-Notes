console.log('starting app');

//the ./ is a relative filepath, it tells us to look in the current folder. 
// **NOTE that required files can send information back using the module object
const notes = require('./notes.js')
//fs is a built in module for creating and reading files
const fs = require('fs');
//os is a built in module for getting info about the current user and their os
const os = require('os');
//lodash is a external module to help with manipulating data and objects
const _ = require('lodash');
//yargs is a external module to help get data from command line arguements 
const yargs = require('yargs');

//yargs.argv is the yarg parsed version of process.argv, it is automatically created by yarg
const argv = yargs.argv;
var command = argv._[0];
// console.log('Yargs version of argv: ',argv);
// console.log('--------------------------------------------------------------------')
// console.log('Normal version of argv: ',process.argv);
// var command = process.argv[2];


console.log(`Running app.js with the command: ${command}`);

//using the lodash module function isString method to type check a string
// console.log(_.isString(true));
// console.log(_.isString('Sean'));

//Based on what arguement was given when running app.js we perform a different action
if (command === 'add'){
	console.log('running add function');
	var res = notes.addNote(argv.title, argv.body);
	if (res){
		console.log("Note Created.");
		console.log("-------------");
		notes.logNote(res);
	}
	else{
		console.log("-------------");
		console.log("Note was not created");
	}
}
else if(command === 'list'){
	console.log("Listing all notes");
	notes.getAllNotes();
}
else if(command === 'read'){
	console.log('reading notes');
	var res = notes.getNote(argv.title);
	console.log("-----------------------------------------");
	if (res == undefined){
		console.log(`Could not find note with title "${argv.title}".`);
	}
	else{
		console.log("Found the note!");
		notes.logNote(res);
	}
}
else if(command === 'remove'){
	console.log('removing note');
	var res = notes.removeNote(argv.title);
	//note this is the shorthand version of an if statement
	var message = res ? `Notes with title "${argv.title}" Removed.` : `Note with title "${argv.title}" was not Removed.`;
	console.log("-----------------------------------------");
	console.log(message);
}
else{
	console.log('Command not recognized');
}




//using lodash uniq method to remove duplicates from an array
	// var filteredArray = _.uniq(['Mike',1,'Sean',1,2,3,4]);
	// console.log(filteredArray);

//using the addNote method we created in the notes.js file 
	// var res = notes.addNote();
	// console.log(res);

//using the add method we created in the notes.js file 
	// var res2 = notes.add(7,4);
	// console.log(`the sum is ${res2}.`);

//using the os module function userInfo to get the current username
	// var user = os.userInfo();

//using the fs module function appendFile to append text to a file, if it doesnt exist it gets created.
	// fs.appendFile('greetings.txt', ` Hello ${user.username}! You are ${notes.age} years old. `, function(err){
		// 	if(err){
		// 		console.log("something went wrong appending to file!");
		// 	}
	// });