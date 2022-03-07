import {MediaManView} from "./view/MediaManView";
import {MediaCollectionView} from "./view/MediaCollectionView";
import {Book, Genre} from "./domain/Media";
import {MediaCollection} from "./domain/MediaCollection";
import {MediaManController} from "./controller/MediaManController";
import {MediaServiceCustom} from "./service/MediaServiceCustom";
import {MediaServiceImpl} from "./service/service";

const view = new MediaManView();
const bookService = new MediaServiceImpl<Book>(Book);
const controller = new MediaManController(view, bookService);
console.log(controller);
// const bookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, 'BOOKS');
// view.addBookCollection(bookCollection);

console.log('It starts...');
