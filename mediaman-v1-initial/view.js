"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class HTMLMediaManView {
    constructor() {
        this._genreOptions = '';
        this._newBookCollectionForm = document.getElementById('newBookCollection');
        this._newBookCollectionName = document.getElementById('newBookCollectionName');
        this._bookCollectionsContainer = document.getElementById('bookCollections');
        if (!this._newBookCollectionForm) {
            throw new Error('Could not initialize the view.\n' +
                'The "newBookCollection" element id was not found.\n' +
                'Was the template changed?');
        }
        if (!this._newBookCollectionName) {
            throw new Error('Could not initialze the view.\n' +
                'The "newBookCollectionName" element id was not found.\n' +
                'Was the template changed?');
        }
        if (!this._bookCollectionsContainer) {
            throw new Error('Could not initialize the view.\n' +
                'The "bookCollections" element id was not found.\n' +
                'Was the template changed?');
        }
        for (let genreKey in model_1.Genre) {
            this._genreOptions += `<option value="${genreKey}">${model_1.Genre[genreKey]}</option>`;
        }
    }
    getNewBookCollectionName() {
        // buildupon standard HTML DOM validation
        if (this._newBookCollectionName.checkValidity() === false) {
            this._newBookCollectionName.reportValidity();
            throw new Error('Invalid collection name!');
        }
        return this._newBookCollectionName.value;
    }
    clearNewBookCollectionForm() {
        this._newBookCollectionForm.reset();
    }
    renderBookCollection(bookCollection) {
        this._bookCollectionsContainer.innerHTML += `
            <div id="bookCollection-${bookCollection.identifier}" class="collection">
                <h3 class="collectionName">${bookCollection.name}</h3>

                <div class="containerGroup">
                    <div class="container">
                        <h3>New book</h3>

                        <form id="newBook-${bookCollection.identifier}" action="#">
                            <ul>
                                <li>
                                    <input id="newBookName-${bookCollection.identifier}" 
                                        type="text" title="Name" placeholder="Name" required>
                                    <input id="newBookAuthor-${bookCollection.identifier}"
                                        type="text" placeholder="Author" required>
                                </li>
                                <li>
                                    <select id="newBookGenre-${bookCollection.identifier}" required>
                                        ${this._genreOptions}
                                    </select>
                                    <input id="newBookPages-${bookCollection.identifier}"
                                        type="number" placeholder="Pages" required>
                                </li>
                                <li>
                                    <input id="newBookPicture-${bookCollection.identifier}"
                                        type="url" title="Picture" placeholder="Picture URL" value="https://picsum.photos/536/354">
                                </li>
                                <li>
                                    <textarea id="newBookDescription-${bookCollection.identifier}" 
                                        placeholder="Description"></textarea>
                                </li>
                            </ul>
                            <input type="button" value="Create" 
                                onclick="mediaManController.createBook('${bookCollection.identifier}');">
                        </form>
                    </div>
                    <div class="collectionToolsContainer">
                        <h3>Tools</h3>
                        <form action="#">
                            <input type="button" value="Remove collection" 
                                onclick="mediaManController.removeBookCollection('${bookCollection.identifier}');">
                        </form>
                    </div>
                </div>

                <div class="containerGroup">
                    <div class="container">
                        <table class="collectionTable">
                        <thead>
                        <tr>
                            <td>Picture</td>
                            <td>Name</td>
                            <td>Genre</td>
                            <td>Description</td>
                            <td>Author</td>
                            <td>Pages</td>
                            <td>Remove</td>
                        </tr>
                        </thead>
                        <tbody id="collectionTableBody-${bookCollection.identifier}">
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        bookCollection.collection.forEach(book => {
            this.renderBook(bookCollection.identifier, book);
        });
    }
    displayErrorMessage(message) {
        if (!message) {
            throw new Error('An error message must be provided!');
        }
        alert(message); // bad for user experience but ignore this for now
    }
    clearBookCollections() {
        this._bookCollectionsContainer.innerHTML = '';
    }
    removeBookCollection(identifier) {
        const bookCollectionDOMNode = document.getElementById(`bookCollection-${identifier}`);
        if (!bookCollectionDOMNode) {
            throw new Error('Could not remove the book collection from the DOM. Couldn`t find the DOM node');
        }
        else {
            bookCollectionDOMNode.remove();
        }
    }
    getNewBookDetails(collectionIdentifier) {
        if (!collectionIdentifier) {
            // we throw this one because it means that ther is a bug!
            throw new Error('The collection identifier must be provided!');
        }
        // required
        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`);
        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection`);
        }
        // build upon standard HTML DOM validation
        if (newBookForm.checkValidity() === false) {
            newBookForm.reportValidity();
            return {
                error: 'The new book form is invalid!'
            };
        }
        // from here on out, no need to check the validity of the specific from fields
        // we just need to check if the fileds can be found
        const newBookNameField = document.getElementById(`newBookName-${collectionIdentifier}`);
        if (!newBookNameField) {
            throw new Error('The new book form`s name input was not found! Did the template changed?');
        }
        const newBookAuthorField = document.getElementById(`newBookAuthor-${collectionIdentifier}`);
        if (!newBookAuthorField) {
            throw new Error('The new book form`s author input was not found! Did the template changed?');
        }
        const newBookGenreSelect = document.getElementById(`newBookGenre-${collectionIdentifier}`);
        if (!newBookGenreSelect) {
            throw new Error('The new book form`s genre select was not found! Did the template changed?');
        }
        const newBookPagesField = document.getElementById(`newBookPages-${collectionIdentifier}`);
        if (!newBookPagesField) {
            throw new Error('The new book form`s pages input was not found! Did the template changed?');
        }
        // optional
        const newBookPictureField = document.getElementById(`newBookPicture-${collectionIdentifier}`);
        if (!newBookPictureField) {
            throw new Error('The new book form`s picture input was not found! Did the template changed?');
        }
        const newBookDescriptionField = document.getElementById(`newBookDescription-${collectionIdentifier}`);
        if (!newBookDescriptionField) {
            throw new Error('The new book form`s description input was not found! Did the template changed?');
        }
        const newBookGenre = model_1.Genre[newBookGenreSelect.value];
        const newBookNumberOfPages = Number.parseInt(newBookPagesField.value);
        return {
            book: new model_1.Book(newBookNameField.value, newBookDescriptionField.value, newBookPictureField.value, newBookGenre, newBookAuthorField.value, newBookNumberOfPages)
        };
    }
    renderBook(collectionIdentifier, book) {
        if (!book) {
            throw new Error('The book to render must be provided!');
        }
        const collectionTableBody = document.getElementById(`collectionTableBody-${collectionIdentifier}`);
        if (!collectionTableBody) {
            throw new Error(`The table body for collection ${collectionIdentifier} could not be found! Was the template changed?`);
        }
        const tableRow = collectionTableBody.insertRow();
        tableRow.id = `book-${collectionIdentifier}-${book.identifier}`;
        tableRow.innerHTML = `
            <td>
                <img class="mediaImage" src="${book.pictureLocation}">
            </td>
            <td>${book.name}</td>
            <td>${book.genre}</td>
            <td>${book.description}</td>
            <td>${book.author}</td>
            <td>${book.numberOfPages}</td>
            <td>
                <a href="#" onclick="mediaManController.removeBook('${collectionIdentifier}', '${book.identifier}');">X</a>
            </td>
        `;
        collectionTableBody.appendChild(tableRow);
    }
    removeBook(collectionIdentifier, bookIdentifier) {
        if (!collectionIdentifier) {
            throw new Error('The collection identifier must be provided!');
        }
        if (!bookIdentifier) {
            throw new Error('The book identifier must be provided!');
        }
        const bookElement = document.getElementById(`book-${collectionIdentifier}-${bookIdentifier}`);
        if (!bookElement) {
            throw new Error('The element corresponding to the book to remove could  not be found! Did the template change?');
        }
        bookElement.remove();
    }
    clearNewBookForm(collectionIdentifier) {
        if (!collectionIdentifier) {
            throw new Error('The collection identifier must be provided!');
        }
        const newBookForm = document.getElementById(`newBook-${collectionIdentifier}`);
        if (!newBookForm) {
            throw new Error(`Could not find the new book form for collection ${collectionIdentifier}`);
        }
        newBookForm.reset();
    }
}
exports.HTMLMediaManView = HTMLMediaManView;
