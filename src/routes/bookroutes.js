const {Router} = require("express");
const bookRouter = Router();
const {addBook, addMultipleBooks, listAllBooks, updatePublisher, updateAuthor, updateGenre, deleteBook, deleteAllBooks, findByAuthor} = require("../controllers/bookcontrollers");
const { tokenCheck } = require('../middleware/index');

// ROUTES

bookRouter.post("/addBook", tokenCheck, addBook);
bookRouter.post("/addMultipleBooks", tokenCheck, addMultipleBooks);
bookRouter.get("/listAllBooks", tokenCheck, listAllBooks);
bookRouter.get("/findByAuthor", tokenCheck, findByAuthor);
bookRouter.put("/updatePublisher", tokenCheck, updatePublisher);
bookRouter.put("/updateAuthor", tokenCheck, updateAuthor);
bookRouter.put("/updateGenre", tokenCheck, updateGenre);
bookRouter.delete("/deleteBook", tokenCheck, deleteBook);
bookRouter.delete("/deleteAllBooks", tokenCheck, deleteAllBooks);

module.exports = bookRouter;