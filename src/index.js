const express = require('express');
const fs = require('fs');

require('./db/mongooose')

const Note = require('./models/note')

const app = express();

app.use(express.json())

//CRUD
//READ
app.get('/notes',async (req, res) => {
    try {
        const notes = await Note.find({})
        res.send(notes)
    } catch (err) {
        res.status(500).send(err)
    }

})

//CREATE
app.post('/notes',async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(200).send(note)
    } 
    catch (err) {
        res.status(400).send(err)
    }
    
})

//UPDATE

app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send()
        }
        note.note = req.body.note
        await note.save()
        res.status(200).send(note)
    } catch (err) {
        res.status(404).send(err)
    }
})

//DELETE

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if (!note) {
            return res.status(404).send()
        }
        res.send("The note has been deleted!!")
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("Server is Live on Port 3000")
})