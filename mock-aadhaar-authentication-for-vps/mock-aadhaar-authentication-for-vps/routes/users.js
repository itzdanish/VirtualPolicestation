const database = require("../services/database");
const {rawToJson} = require("../utils/common")
const {validate} = require("../validators/user")
const { generateAuthToken } = require("../services/auth");
const permission = require("../middleware/permission");
const auth = require("../middleware/auth");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash")
const router = express.Router();

router.get('/', [auth, permission.checkGet], async (req, res) => {
    const queryResult = await database.find("user");
    const data = rawToJson(queryResult);
    res.send(data);
});


router.get('/:username', [auth, permission.checkGet], async (req, res) => {
    const queryResult = await database.findById("user", "username", req.params.username);

    const data = rawToJson(queryResult);

    if(!data.length) return res.status(404).send("User not found with given username.");
    else res.send(data);
        
});

router.post('/', async(req, res) => {
    const newUser = req.body;
    
    const { error } = validate(newUser,"POST"); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await database.findById("user", "username", newUser.username);
    if (user.length) return res.status(400).send('User already registered.');

    
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await database.insert("user", newUser);
    
    res.send("Your request has been submitted. You will notify when your request verified.");
    
});

router.put('/:username', [auth, permission.checkPut], async(req, res) => {
    const { error } = validate(req.body, "PUT"); 
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await database.findById("user", "username", req.params.username);
    if (!user.length) return res.status(404).send('User with the given id is not found.');

    await database.update("user", req.body, "username", req.params.username);

    res.status(200).send("User updated successfully.");

});

router.delete('/:username', [auth, permission.checkDelete], async(req, res) => {

    let user = await database.findById("user", "username", req.params.username);
    if (!user.length) return res.status(404).send('User with the given id is not found.');

    await database.remove("user", "username", req.params.username);

    res.send("User deleted succesfully.");
});


module.exports = router;
