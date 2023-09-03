const mongoose = require('mongoose');

var schemaBook = mongoose.Schema({

    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
    userId: String
});

const Book = mongoose.model('book', schemaBook);

const url = 'mongodb://localhost:27017/library';

exports.getThreeBooks = async (req, res) => {
    try {
        await mongoose.connect(url);

        const docs = await Book.find();
        console.log(docs);

        return Book.find({}).limit(3)//t5o 3 khw



        await mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};



exports.getAllBooks = async (req, res) => {
    try {
        await mongoose.connect(url);

        const docs = await Book.find();
        console.log(docs);

        return Book.find({})



        await mongoose.disconnect();
        console.log('Disconnected from the database');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};

exports.getOneBooksDetails = async (id) => {
    try {
        await mongoose.connect(url);

        const book = await Book.findById(id);
        console.log('Fetched book details:', book); // Add this line to log the fetched book

        await mongoose.disconnect();
        console.log('Disconnected from the database');

        return book;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



exports.postDataBookModel = (title, description, author, price, image, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            let book = new Book({
                title: title,
                description: description,
                author: author,
                price: price,
                image: image,
                userId: userId
            })
            return book.save()
        }).then(() => {
            mongoose.disconnect()
            resolve('added')
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getmyBooks = (userId) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.find({ userId: userId })

        }).then(books => {
            mongoose.disconnect()
            resolve(books)

        }).catch(err => reject(err))




    })


}

exports.deletebook = (id) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.deleteOne({ _id: id })

        }).then(books => {
            mongoose.disconnect()
            resolve(true)

        }).catch(err => reject(err))




    })


}
exports.getPageUpdateBookModel = (id) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.findById(id)

        }).then(books => {
            mongoose.disconnect()
            resolve(books)

        }).catch(err => reject(err))




    })


}

exports.postUpdateBookModel = (bookId, title, description, author, price, filename, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.updateOne({ _id: bookId }, { title: title, description: description, author: author, price: price, image: filename, userId: userId })
        }).then(() => {
            mongoose.disconnect()
            resolve('Updated')
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

