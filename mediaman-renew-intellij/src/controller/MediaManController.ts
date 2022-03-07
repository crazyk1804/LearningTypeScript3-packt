import {MediaManView} from "../view/MediaManView";
import {Book} from "../domain/Media";
import {MediaCollection} from "../domain/MediaCollection";
import {MediaServiceCustom} from "../service/MediaServiceCustom";
import {MediaService} from "../service/service";

export class MediaManController{
	private _view: MediaManView;
	private _bookService: MediaService<Book>;

	constructor(view: MediaManView, bookService: MediaService<Book>) {
		this._view = view;
		this._bookService = bookService;
		this.bindEvents();

		console.log('constructor ends here');
	}

	bindEvents(): void {
		this._view.onCreateBookCollection = (evt: Event, bookCollection: MediaCollection<Book>) => {
			this._bookService.saveMediaCollection(bookCollection)
				.then(() => {
					this._view.addBookCollection(bookCollection);
				});
		}

		this._view.onCreateBook = (evt: Event, book: Book, bookCollection: MediaCollection<Book>) => {
			this._view.addBook(bookCollection, book);
		}

		this._view.dummyHandler = (evt: Event) => {
			this._bookService.loadMediaCollection('1f7d96a8-65e6-484f-8f24-4c24d18d77b5')
				.then(collection => {
					console.log(collection);
				})

			// this._bookService.getCollections()
			// 	.then(collections => {
			// 		console.log(collections);
			// 	})

			this._bookService.getMediaCollectionIdentifiersList()
				.then(keys => {
					console.log('retrieved keys');
					console.log(keys);
				});
		}
	}
}