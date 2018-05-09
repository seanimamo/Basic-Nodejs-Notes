// var obj ={
//     name:'Sean'
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name" : "Sean", "age" : 22}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
    title: 'Some Title',
    body: 'Some Body'
};
var originalNoteString = JSON.stringify(originalNote);
console.log("running write file");
fs.writeFileSync('notes.json', originalNoteString);

console.log('reading object(s) from notes.json')
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log("the type of the note variable is: ",typeof note);
console.log("the title of the note object is: ",note.title);

