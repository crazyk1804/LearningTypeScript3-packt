"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.MessageType = exports.myPublicKey = void 0;
var myBooks = (function () {
    var collection = [{
            nqme: 'Lord of the rings',
            author: 'JRR Tolkien',
            rating: 10
        }, {
            name: '1984',
            author: 'George Orwell',
            rating: 9
        }];
    function getCollection() {
        return collection;
    }
    function favoriteBook() {
        return collection[0];
    }
    function sortBooks() {
        // no-op
    }
    function addBook(book) {
        collection.push(book);
        sortBooks();
    }
    return {
        books: getCollection(),
        addBook: addBook,
        favoriteBook: favoriteBook()
    };
})();
myBooks.addBook({ name: 'foo', author: 'bar' });
console.log(myBooks.books);
console.log('Favorite: ', myBooks.favoriteBook);
// interface CustomWindow extends Window {
//     myBooks: any;
// }
// const customWindow: CustomWindow = window;
// customWindow.myBooks = myBooks;
// export default myBooks;
var myPrivateKey = 'Secret';
exports.myPublicKey = 'Public';
var MessageType;
(function (MessageType) {
    MessageType[MessageType["INFORMATION"] = 0] = "INFORMATION";
    MessageType[MessageType["WARNING"] = 1] = "WARNING";
    MessageType[MessageType["ERROR"] = 2] = "ERROR";
    MessageType[MessageType["DEBUTG"] = 3] = "DEBUTG";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
// private function
function logToConsole(message) {
    switch (message.type) {
        case MessageType.INFORMATION:
            console.log(message.content);
            break;
        default:
            console.error(message.content);
    }
    console.log(message);
}
// exported function
function log(message) {
    logToConsole(message);
}
exports.log = log;
//# sourceMappingURL=pre-descriptions.js.map