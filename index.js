const db = require('./data/db');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 8000;
server.use(bodyParser());

server.listen(port, () => console.log(`API running on port ${port}`))

server.route('/api/users')
    .post((req, res) => {
        console.log(req.body);
        let user = req.body;
        if(!user.name || !user.bio){
            res.status(400).json({ errorMessage: "Name or bio missing - please try again."});
        }
        else{
            db.insert(user)
            .then(response => {
                console.log(response);
                res.status(201).json(response);
            })
            .catch(e => {
              console.log(e);
              res.status(500).json({ error: "Error inserting user into database." })
            });
        }
      });
    
    app.route('/api/users/:id')
      .get((req, res) => {
        console.log(req.params.id);
        let id = req.params.id;
        db.findById(id)
          .then(response => {
            console.log(response);
            if(response) res.status(200).json(response);
            else res.status(404).json({ message: "User unavailable." });
          })
          .catch(e => {
            console.log(e);
            res.status(500).json({ error: "User unavailable." });
          })
      })
      .delete((req, res) => {
        console.log(req.params.id);
        let id = req.params.id;
        db.remove(id)
          .then(response => {
            console.log(response);
            if(response) res.status(200).json({ message: "User deleted." });
            else res.status(404).json({ message: "User unavailable." });
          })
          .catch(e => {
            console.log(e);
            res.status(500).json({ error: "User unable to be removed." });
          });
      })
      .put((req, res) => {
        console.log(req.body);
        let user = req.body;
        if(!user.name || !user.bio) res.status(400).json({ errorMessage: "Name or bio missing - please try again."});
        else db.update(req.params.id, user)
          .then(response => {
            console.log(response);
            if(response) res.status(200).json({ message: "User updated."});
            else res.status(404).json({ message: "User unavailable."});
          })
          .catch(e => {
            console.log(e);
            res.status(500).json({ error: "User unable to be edited." });
          })
      });