"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class MediaManControllerImpl {
    constructor(view, bookService, movieService) {
        this._bookCollections = new Map();
        this._movieCollections = new Map();
        if (!view) {
            throw new Error('The view is mandatory!');
        }
        if (!bookService) {
            throw new Error('The book service is mandatory!');
        }
        if (!movieService) {
            throw new Error('The movie service is mandatory!');
        }
        this._view = view;
        this._bookService = bookService;
        this._movieService = movieService;
        this.reloadBookCollections(); // reload saved data when the application starts
    }
    reloadBookCollections() {
        console.log('Reloading the book collections');
        this._bookService.getMediaCollectionIdentifiersList().then(keys => {
            this._bookCollections.clear(); // clear the current state
            this._view.clearBookCollections(); // remove the DOM nodes
            keys.forEach(key => {
                this._bookService.loadMediaCollection(key).then(collection => {
                    this._bookCollections.set(key, collection);
                    this._view.renderBookCollection(collection);
                });
            });
        });
    }
    createBookCollection() {
        console.log('Creating a book collection');
        const newBookCollectionName = this._view.getNewBookCollectionName();
        console.log('Creating a new book collection: ', newBookCollectionName);
        const newBookCollection = new model_1.MediaCollection(model_1.Book, newBookCollectionName);
        this._bookCollections.set(newBookCollection.identifier, newBookCollection);
        this._bookService.saveMediaCollection(newBookCollection).then(() => {
            console.log('New book collection called ', newBookCollection.name, ' saved successfully. Identifier: ', newBookCollection.identifier);
            this._view.clearNewBookCollectionForm();
            this._view.renderBookCollection(newBookCollection);
        }).catch(_ => {
            this._view.displayErrorMessage(`Failed to save the new book collection called: ${newBookCollectionName}`);
        });
    }
    removeBookCollection(identifier) {
        console.log('Removing book collection with id: ', identifier);
        if (!identifier) {
            throw new Error('An identifier must be provided!');
        }
        this._bookCollections.delete(identifier);
        this._view.removeBookCollection(identifier);
        this._bookService.removeMediaCollection(identifier).then(() => {
            console.log('Removed the collection with identifier: ', identifier);
        }).catch(_ => {
            this._view.displayErrorMessage('Falied to remove the collection!');
        });
    }
    createBook(collectionIdentifier) {
        console.log('Creating book collection called: ', collectionIdentifier);
        if (!collectionIdentifier) {
            throw new Error('The collection identifier is required to create a new book!');
        }
        console.log('Retrieving the details about the new book to create...');
        const bookDetailsResult = this._view.getNewBookDetails(collectionIdentifier);
        if (bookDetailsResult.error) {
            console.error('Failed to retrieve the book details: ', bookDetailsResult.error);
            return;
        }
        if (!this._bookCollections.has(collectionIdentifier) || !this._bookCollections.get(collectionIdentifier)) {
            console.error('Tried to add a book to an unkown collection. Identifier: ', collectionIdentifier);
            this._view.displayErrorMessage('Failed to create the new book!');
            return;
        }
        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection || !bookDetailsResult.book) {
            throw new Error('The collection couldn`t be retrieved or we could not get the book details from the view!');
        }
        const newBook = bookDetailsResult.book;
        existingCollection.addMedia(newBook);
        this._bookService.saveMediaCollection(existingCollection).then(() => {
            console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
            this._view.clearNewBookForm(collectionIdentifier);
            this._view.renderBook(existingCollection.identifier, newBook); // here we are sure that the book property is set
        }).catch(error => {
            console.error('Error while updating an existing book collection: ', error);
            this._view.displayErrorMessage(`Failed to update the existing book collection called ${existingCollection.name}`);
        });
    }
    removeBook(collectionIdentifier, bookIdentifier) {
        console.log('Removing book [', bookIdentifier, '] from collection [', collectionIdentifier, ']');
        if (!collectionIdentifier) {
            throw new Error('The collection identifier is required to remove a book!');
        }
        if (!bookIdentifier) {
            throw new Error('The book identifier is required to remove a book!');
        }
        console.log(`Removing book ${bookIdentifier} which should be part of collection ${collectionIdentifier}`);
        const existingCollection = this._bookCollections.get(collectionIdentifier);
        if (!existingCollection) {
            throw new Error('The collection couldn`t be retrieved or we could not get the book details from the view!');
        }
        existingCollection.removeMedia(bookIdentifier);
        this._bookService.saveMediaCollection(existingCollection).then(() => {
            console.log(`Book collection called "${existingCollection.name}" updated successfully.`);
            this._view.removeBook(collectionIdentifier, bookIdentifier);
        }).catch(error => {
            console.error('Error while updating an existing book collection: ', error);
            this._view.displayErrorMessage(`Failed to save the modifications made to the ${existingCollection.name} book collection (removal of the following book: ${bookIdentifier})`);
        });
    }
}
exports.MediaManControllerImpl = MediaManControllerImpl;
