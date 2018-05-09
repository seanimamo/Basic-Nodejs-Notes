//fs is a built in module for creating and reading files
const fs = require('fs');
const _ = require('lodash');
console.log("starting notes.js");

//module is a large built in object for sending and recieving information from external files that are required into your app.js
//console.log(module);

module.exports.age = 25;

//non arrow version of the addNotes function
// module.exports.addNote = function(){
// 	console.log("addNote running");
// 	return 'New notes';
// }



//the arrow version of a function does not bind the arguement or this keyword
var addNote = (title, body) =>{
	var notes = [];
	console.log('notes.js: addNote running');
	//console.log('Adding Note', title, body);
	//**please note that with javascript ES6, we can eliminate some syntax when creating the object
	var note = {
		title,
		body
	};

	//if the file currently exists, pull the json data.
	var notes = JsonIsExist('notes-data.json');

	//go though the notes array, if you find a particular note where the title is the same as the one you are trying to insert, return false
	//**note NON es6 version
	// var duplicateNotes = notes.filter((note) => {
	// 	return note.title === title;
	// });

	//**note using javascript ES6 we can remove the curly brackets and do this in 1 line.
	//go though the notes array, if you find a particular note where the title is the same as the one you are trying to insert, add that note to the array named duplicateNotes
	var duplicateNotes = notes.filter((note) => note.title === title);

	//only update json with new array of objects if this is not a duplicate note
	if(duplicateNotes.length === 0){
		console.log("notes.js: This is not a duplicate note within notes-data.json! " );
		notes.push(note);
		//write array to json file
		saveNote('notes-data.json',notes);
		return note;
	}
	else{
		console.log("notes.js: This IS a duplicate note, will not add this note the notes-data.json " );
		return undefined;
	}	
	
}

var getAllNotes = () =>{
	 console.log('notes.js: getAllNotes() running');

	// console.log('reading object(s) from notes.json')
	var noteString = fs.readFileSync('notes-data.json');
	var noteObjectsArray = JSON.parse(noteString);
	for (var i = 0; i < noteObjectsArray.length; i++){
		console.log("notes.js: Note Title - ",noteObjectsArray[i].title," Note Body - ",noteObjectsArray[i].body );
	}

}

var getNote = (title) =>{
	console.log('notes.js: getNote() running on note with title: ', title);

	//attempt to read data from json file
	var noteObjectsArray = readNotes('notes-data.json');

	//attempt to find note with given title within object array
	try{
		var note = _.find(noteObjectsArray, {'title': title});
		console.log("notes.js: successfuly attempted to find note!");
	}
	catch(e){
		console.log("notes.js: Something went wrong trying to find note!");
	}

	//if undefined, no match for the note was found.
	return note;
	
}

var removeNote = (title) =>{
	console.log('notes.js: removeNote() running on note with title: ', title);

	//attempt to read data from json file
	var noteObjectsArray = readNotes('notes-data.json');

	//removes all notes with given title
	if(findNote(noteObjectsArray,title)){
		try{
			//get array with notes with given title removed
			var new_noteObjectsArray = deleteNotefromArray(noteObjectsArray, title);

			//write array to json file
			saveNote('notes-data.json',new_noteObjectsArray);
			
			//check if the note was actually deleted
			var noteObjectsArray = readNotes('notes-data.json');
			//get array of notes where you filter out the deleted note (if we succesfully deleted the note, then the length will be the same since there would be no note to filter out)
			var duplicateNotes = noteObjectsArray.filter((note) => note.title !== title);
			if (noteObjectsArray.length == duplicateNotes.length){
				console.log(`notes.js: Data was correctly removed within notes-data.json`);
				return true;
			}
			else{
				console.log(`notes.js: Data was NOT correctly removed within notes-data.json`);
				return false;
			}	
		}
		catch(e){
			console.log(`notes.js: Something went wrong removing data from notes-data.json where title is ${title}`);
			return false;
		}
	}
	else{
		return false;
	}

	

}

//returns true if it finds note with given title in object array
var findNote = (noteObjectsArray, noteTitle) => {

	if ( _.find(noteObjectsArray, {"title": noteTitle}) ){
		console.log(`notes.js: findNote(): there is a note with the title: ${noteTitle}`);
		return true;
	}
	else{
		console.log(`notes.js: findNote(): there is NOT a note with the title: ${noteTitle}`);
		return false;
	}

}

//returns modified notesarray with note with given title deleted
var deleteNotefromArray = (noteObjectsArray, noteTitle) => {

	//removes all notes with given title
	console.log(`notes.js: there is a note with the title: ${noteTitle}`);
	try{
		var new_noteObjectsArray = _.remove(noteObjectsArray, item => item.title !== noteTitle);
		console.log(`notes.js: Successfully removed data from notes-data.json where title is ${noteTitle}`);
		return new_noteObjectsArray;
	}
	catch(e){
		console.log(`notes.js: Something went wrong removing data from notes-data.json where title is ${noteTitle}`);
		return undefined;
	}

}

var readNotes = (fileName) =>{

	//attempt to read data from json file
	try{
		var noteString = fs.readFileSync(fileName);
		var noteObjectsArray = JSON.parse(noteString);
		console.log(`notes.js: successfully read data from ${fileName} and parsed data into array`);
		return noteObjectsArray;
	}
	catch(e){
		console.log(`notes.js: Something went wrong reading data from ${fileName} and parsed data into array`);
		return undefined;
	}

}
var saveNote = (fileName, notes) =>{
	try{
		fs.writeFileSync(fileName, JSON.stringify(notes));
		console.log(`notes.js: Successfully wrote to ${fileName} `);
	}
	catch(e){
		console.log(`notes.js: Something went wrong writing to ${fileName} `);
	}
}

var logNote = (note) =>{
	console.log(`Note Title: ${note.title}`);
	console.log(`Note Body: ${note.body}`);
}

//returns json data (parsed version) if json file exists, otherwise returns undefined
var JsonIsExist = (fileName) =>{
	//if the file currently exists, pull the json data and return it.
	notes = []
	try{
		var relativeFilePath = `./${fileName}`;
		if (fs.existsSync(relativeFilePath)) {
			// get currently existing json data
			var notesString = fs.readFileSync(fileName);
			console.log(`notes.js: old data exists -- grabbing currently existing json data from ${fileName}`);
			return JSON.parse(notesString);
		}	
	}
	catch(e){
		console.log(`notes.js: Something went wrong checking if ${fileName} exists and grabbing existing data: `, e);
	}
	return undefined;
}

var add = (x,y) => {
	console.log('notes.js: running add function')
	var sum = x + y;
	return sum;
}

module.exports = {
	addNote,
	getNote,
	removeNote,
	getAllNotes,
	logNote
}