const Book = require("../models/bookmodel");
const tokenCheck = require("../middleware/index")

async function addBook(req, res) {
    try {
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                genre: req.body.genre
            }

            const dbresponse = await Book.create(newBook);
            console.log(dbresponse.Book);

            res.status(201).json({
                message: "Book added to table successfully",
                book: dbresponse
            });
        }
        catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function addMultipleBooks(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const booksToAdd = req.body.books;

            const createdBooks = await Promise.all(
                booksToAdd.map(async (bookData) => {
                    const newBook = {
                        title: bookData.title,
                        author: bookData.author,
                        publisher: bookData.publisher,
                        genre: bookData.genre
                    };

                    return await Book.create(newBook);
                })
            );

            res.status(201).json({
                message: "Books added to table successfully",
                books: createdBooks
            });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function listAllBooks(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const listOfBooks = await Book.findAll();
            res.status(200).json(listOfBooks);
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function findByAuthor(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const { author } = req.body;

            if (!author) {
                return res.status(400).json({ message: 'Please provide author for search' });
            }

            const authorBook = await Book.findAll({ where: { author: author } });

            if (!authorBook || authorBook.length === 0) {
                return res.status(404).json({ message: 'Book by this author not found' });
            }

            res.status(200).json(authorBook);
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function updatePublisher(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const { title, newPublisher } = req.body;

            const [rowsAffected] = await Book.update(
                { publisher: newPublisher }, { where: { title: title } }
            );

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const updatedBook = await Book.findOne({ where: { title: title } });

            res.status(200).json({ message: 'Publisher updated successfully', updatedBook });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function updateAuthor(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const { title, newAuthor } = req.body;

            const [rowsAffected] = await Book.update(
                { author: newAuthor }, { where: { title: title } }
            );

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const updatedBook = await Book.findOne({ where: { title: title } });

            res.status(200).json({ message: 'Author updated successfully', updatedBook });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function updateGenre(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const { title, newGenre } = req.body;

            const [rowsAffected] = await Book.update(
                { genre: newGenre }, { where: { title: title } }
            );

            if (rowsAffected === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            const updatedBook = await Book.findOne({ where: { title: title } });

            res.status(200).json({ message: 'Genre updated successfully', updatedBook });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function deleteBook(req, res) {
    try {
        tokenCheck(req, res, async () => {
            const { title } = req.body;

            const deletedBook = await Book.destroy({
                where: { title: title }
            });

            if (deletedBook === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json({ message: 'Book deleted successfully' });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

async function deleteAllBooks(req, res) {
    try {
        tokenCheck(req, res, async () => {
            await Book.destroy({ where: {} });
            res.status(200).json({ message: 'All books deleted successfully' });
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            error: error
        });
    }
}

module.exports = {addBook, addMultipleBooks, listAllBooks, updatePublisher, updateAuthor, deleteBook, deleteAllBooks, updateGenre, findByAuthor};