var express = require('express');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Book.find({}, function(err, books) {
    if (err) throw err;
    
    // console.log(books);
    res.render('index', { title: 'Express', books: books });
  });
});

router.get('/add', function(req, res, next) {
  res.render('addbook', { title: 'Express' });
});

router.post('/add', upload.single('image'), (req, res) => {
  var newBook = Book({
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
    author: req.body.author,
    price: req.body.price
  });
  
  // save the user
  newBook.save(function(err) {
    if (err) throw err;
  
    console.log('Book created!');
    res.redirect('/books');
  });
	// var book = req.body;
	// Book.addBook(book, (err, book) => {
	// 	if(err){
	// 		throw err;
	// 	}
	// 	res.redirect('/');
	// });
});

router.get('/show/:id', function(req, res, next) {
  Book.findOne({ _id: req.params.id }, function(err, book) {
    if (err) throw err;
    
    // console.log(book);
    res.render('details', {title: 'Node book store', book:book});
  });
});


module.exports = router;
