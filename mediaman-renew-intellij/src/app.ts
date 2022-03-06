import {MediaManView} from "./view/MediaManView";
import {MediaCollectionView} from "./view/MediaCollectionView";
import {Book} from "./domain/Media";
import {MediaCollection} from "./domain/MediaCollection";

const view = new MediaManView();
const bookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, 'BOOKS');
view.addBookCollection(bookCollection);