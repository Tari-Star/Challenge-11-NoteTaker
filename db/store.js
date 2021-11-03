const util = require('util');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
read(){
    return readFileAsync('./db/db.json', 'utf8');

}
write(note){
   return writeFileAsync('./db/db.json', JSON.stringify(note)); 
}
getNotes(){
    return this.read().then((notes) => {
        var parseNotes;
        try {
            parseNotes = [].concat(JSON.parse(notes));
        }
        catch(err) {
            parseNotes = [];
        }
        return parseNotes;
    })
}
addNote(note){
    const {title, text} = note;
    if (!title || !text){
        throw new Error('Must include title or text!');
    }
    const newNote = {
        title, text, id: uuidv4()
    }
    return this.getNotes().then((notes) => [...notes, newNote]
    )
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote)
}
}


module.exports = new Store();