var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var data = [
//   { item: 'get milk' },
//   { item: 'walk dog' },
//   { item: 'click some coding ass' },
//   { item: 'drink coffe' }
// ];

// CREATE DB CONNECTION
const db = require('../config/keys').mongoURI;

mongoose.connect(db, (req, res) => {
    console.log("\x1b[36m", `Connected to MongoDB`)
});

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = app => {
  app.get('/todo', (req, res) => {

    Todo.find({}, (err, data) => {
      if (err)
        throw err;

      res.render('todo', { todos: data });
    })

  });

  app.post('/todo', urlencodedParser, (req, res) => {

    const newTodo = new Todo(req.body);
    
    newTodo.save()
    .then(todo => res.json(todo));

  });

  app.delete('/todo/:item', (req, res) => {
    
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
      if(err)
        throw err;
      res.json(data);
    })
    // data = data.filter(todo => {
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // })
    // res.json(data);
  });
};