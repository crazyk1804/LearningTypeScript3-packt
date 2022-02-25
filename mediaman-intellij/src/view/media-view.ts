import {Checker} from "../common/utils";
import {Book, Media, MediaCollection, Movie} from "../domain/domain";
import {MediaService} from "../service/media-service.intf";

interface UserMediaCollection {
	type: Function,
	collectionName: string
}

class MediaFormView<T extends Media> {
	private _form: HTMLFormElement;
	private _tboxCollectionName: HTMLInputElement;
	private _btnCreate: HTMLButtonElement;
	private _btnReload: HTMLButtonElement;
	private _onClickBtnCreate: Function;
	private _onClickBtnReload: Function;

	constructor(
		private readonly _type: Function,
		private readonly _formId: string,
	) {
		Checker.param(_formId, 'form id');
		this._form = document.getElementById(_formId) as HTMLFormElement;
		this._tboxCollectionName = this._form.querySelector('[name=tboxCollectionName]') as HTMLInputElement;
		this._btnCreate = this._form.querySelector('[name=btnCreate]') as HTMLButtonElement;
		this._btnReload = this._form.querySelector('[name=btnReload]') as HTMLButtonElement;
	}

	getCollectionName(): string {
		return this._tboxCollectionName.value;
	}

	set onClickBtnCreate(handler: Function) {
		this._onClickBtnCreate = handler;
	}

	set onClickBtnReload(handler: Function) {
		this._onClickBtnReload = handler;
	}

	bindEvents(): void {
		const me = this;

		this._btnCreate.onclick = function (evt) {
			if(!me._onClickBtnCreate) return;

			const collectionName: string = me._tboxCollectionName.value;
			const created: MediaCollection<T> = new MediaCollection<T>(
				me._type, collectionName
			);
			me._onClickBtnCreate(created);
		}

		this._btnReload.onclick = evt => {
			if (!me._onClickBtnReload) return;
			me._onClickBtnReload();
		}
	}
}

class GalleryView {
	constructor(
		private _container: HTMLDivElement
	) {
	}
}

class BookCollectionView {
	private _element = document.createElement('div');
	private _container = document.createElement('div');
	private _table = document.createElement('table');

	constructor(private _identifier: string) {
		this._element.className = 'containerGroup';
		this._container.className = 'container';
		this._table.className = 'collectionTable';
		this._table.innerHTML = `
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
			<tbody id="${ _identifier }"></tbody>
		`.trim();
	}

	addBook(book: Book): void {
		const tbody = this._table.querySelector('tbody') as HTMLElement;
		Checker.element(tbody, 'book table body');
		tbody.innerHTML += `
			<tr>
				<td><img src="${ book.pictureLocation }"></td>
				<td>${ book.name }</td>
				<td>${ book.genre }</td>
				<td>${ book.description }</td>
				<td>${ book.author }</td>
				<td>${ book.totalPage }</td>
				<td><input type="button" value="삭제"></td>
			</tr>
		`.trim();
	}
}

class MediaCollectionListView {
	private _container: HTMLDivElement = document.createElement('div');

export class MediaView {
	private _bookForm: MediaFormView<Book> = new MediaFormView<Book>(Book, 'newBookCollection');
	// private _movieForm: MediaFormView<Movie> = undefined;

	constructor() {
	}



}