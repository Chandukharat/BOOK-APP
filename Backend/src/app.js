const express = require("express")
const booksdata = require("../model/delta")
const Regi = require('../model/Regi')
const app = express()
const bcrypt = require ("bcryptjs")

require("../db/conn")
const port = 8001;

app.use(express.json())

app.post("/Regi", async (req, res) => {
    const p = req.body.Password
    const cp = req.body.Confirm
    if (p === cp) {

        const xyz = await new Regi(req.body);
        xyz.save().then(() => {
            res.status(201).send(xyz);
        }).catch((e) => { res.send(e) })
    }
    else {
        alert('passwords are not matching')
    }
})


app.post("/login", async (req, res) => {

    try {

        const Email = req.body.Email
        const p = req.body.Password
        const Usermail = await Regi.findOne({ Email: Email })
        const isMatch = await bcrypt.compare(p, Usermail.Password)

        if (isMatch) {
            res.status(200).send({ message: "login Successfuly", Usermail })
        } else {
            res.status(400).send({ message: "login Failed" })

        }

    } catch {
        res.status(400).send({ message: "User Not REgistered" })

    }

})


app.get("/marathi", (async (req, res) => {
    try {
        const tata = await booksdata.find({ language: "Marathi" })
        res.send(tata)
        console.log(tata)
    } catch (e) { console.log(e) }
}))


app.get("/english", (async (req, res) => {
    try {
        const tata = await booksdata.find({ language: "English" })
        res.send(tata)
        console.log(tata)
    } catch (e) { console.log(e) }
}))


app.get("/kannada", (async (req, res) => {
    try {
        const tata = await booksdata.find({ language: "Kannada" })
        res.send(tata)
        console.log(tata)
    } catch (e) { console.log(e) }
}))

app.post("/user", (req, res) => {
    console.log(req.body)
    const xyz = new booksdata(req.body);
    xyz.save().then(() => {
        res.status(201).send(xyz);
    }).catch((e) => { res.send(e) })
})


app.get("/user/:id", async (req, res) => {

    const _id = req.params.id

    const data = await booksdata.findById(_id)
    console.log(_id)
    res.send(data)
    console.log(data)
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})