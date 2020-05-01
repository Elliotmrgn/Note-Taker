const db = require('../db/db.json');
const fs = require('fs');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.json(db);
    });

    app.post('/api/notes', (req, res) => {
        const note = req.body;
        db.push(note);
        //writes to database
        dbWrite();
        //need a response or the express app will hang
        res.send('done!');
    })

    app.delete('/api/notes/:id', (req, res) => {
        //index of array to delete
        let index = req.params.id - 1;
        db.splice(index, 1);
        dbWrite();
        res.send('done!');
    })
}

const dbWrite = () => {
    //updating id's
    db.forEach((note, i) => {
        //cant start id at 0 or it cant be viewed
        note.id = i + 1;
    });

    fs.writeFile('./db/db.json', JSON.stringify(db), err => {
        if (err) console.error(err)
        else console.log("successful rewrite")
    })
}