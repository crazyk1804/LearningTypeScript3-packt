import {MediaManView} from "./view/MediaManView";
import {MediaCollectionView} from "./view/MediaCollectionView";
import {Book, Genre} from "./domain/Media";
import {MediaCollection} from "./domain/MediaCollection";

console.log(Genre);

function gt(genre: any) {
	console.log(genre);
}

gt(Genre);

const view = new MediaManView();
const bookCollection: MediaCollection<Book> = new MediaCollection<Book>(Book, 'BOOKS');
view.addBookCollection(bookCollection);

