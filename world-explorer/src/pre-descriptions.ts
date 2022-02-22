var myBooks = (function() {
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

    function addBook(book: any) {
        collection.push(book);
        sortBooks();
    }

    return {
        books: getCollection(),
        addBook: addBook,
        favoriteBook: favoriteBook()
    }
})();

myBooks.addBook({ name: 'foo', author: 'bar'});
console.log(myBooks.books);
console.log('Favorite: ', myBooks.favoriteBook);

// interface CustomWindow extends Window {
//     myBooks: any;
// }

// const customWindow: CustomWindow = window;
// customWindow.myBooks = myBooks;

// export default myBooks;

const myPrivateKey: string = 'Secret';
export const myPublicKey: string = 'Public';

export enum MessageType {
    INFORMATION, WARNING, ERROR, DEBUTG
}

// exported in terface
export interface Message {
    content: string;
    type: MessageType;
}

// private function
function logToConsole(message: Message): void {
    switch(message.type) {
        case MessageType.INFORMATION:
            console.log(message.content);
            break;
        default:
            console.error(message.content);
    }
    console.log(message);
}

// exported function
export function log(message: Message): void {
    logToConsole(message);
}