import {HTMLView} from "./HTMLView";
import {Viewty} from "../cmm/utils";
import {MediaCollectionFormView} from "./MediaCollectionFormView";
import {Book} from "../domain/Media";
import {MediaCollection} from "../domain/MediaCollection";
import {MediaCollectionView} from "./MediaCollectionView";

export class MediaManView extends HTMLView {
	private _bookCollectionForm: MediaCollectionFormView<Book>;
	private _bookCollectionViews: MediaCollectionView<Book>[] = [];
	private _onCreateBookCollection: Function | undefined;
	private _onCreateBook: Function | undefined;
	private _dummyHandler: Function | undefined;

	constructor() {
		super();
		this._bookCollectionForm = new MediaCollectionFormView<Book>(Book);

		this._element.append(Viewty.el('<h1>Media Man</h1>'));
		this._element.append(Viewty.el('<h2>Book Collections</h2>'));
		this._element.innerHTML = `
			<h1>Media Man</h1>
    		<h2>Book collections</h2>
    		
			<div id="bookCollectionGallery" class="collectionContainerGroup">
				<div id="bookCollections" class="containerGroup">
				</div>
			</div>
		
			<hr/>
			<h2>Movie collections</h2>
			<input type="button" name="btnDummy" value="DUMMY"/>
			Bonus exercise!
		`.trim();

		this.init();
		this.bindEvents();
	}

	private init(): void {
		this.select('[id=bookCollectionGallery]').insertBefore(
			this._bookCollectionForm.element,
			this.select('[id=bookCollections]')
		);
	}

	protected createElement(options?: any): HTMLElement {
		return document.body;
	}

	public addBookCollection(bookCollection: MediaCollection<Book>): void {
		const view: MediaCollectionView<Book> = new MediaCollectionView<Book>(Book, bookCollection);
		view.onCreateMedia = (evt: Event, book: Book, bookCollection: MediaCollection<Book>) => {
			if (!this._onCreateBook) return;
			this._onCreateBook(evt, book, bookCollection);
		}

		this.select('[id=bookCollections]').append(view.element);
		this._bookCollectionViews.push(view);
	}

	public addBook(bookCollection: MediaCollection<Book>, book: Book): void {
		for(let i=0 ; i<this._bookCollectionViews.length ; i++) {
			const view = this._bookCollectionViews[i];
			if(view.identifier !== bookCollection.identifier) continue;
			view.addMedia(book);
			return;
		}
		throw new Error(`Can't find collection of ${ bookCollection.identifier }`);
	}

	private bindEvents(): void {
		this._bookCollectionForm.onCreateMediaCollection = (evt: Event, bookCollection: MediaCollection<Book>) => {
			if(!this._onCreateBookCollection) return;
			this._onCreateBookCollection(evt, bookCollection);
		}

		this.selectByName('btnDummy').onclick = evt => {
			if(!this._dummyHandler) return;
			this._dummyHandler(evt);
		};
	}

	set onCreateBookCollection(handler: Function) {
		this._onCreateBookCollection = handler;
	}

	set onCreateBook(handler: Function) {
		this._onCreateBook = handler;
	}

	set dummyHandler(handler: Function) {
		this._dummyHandler = handler;
	}
}