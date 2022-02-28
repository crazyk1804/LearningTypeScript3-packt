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
	private _onCreateHandlers: Function[] = [];
	private _onReloadHandlers: Function[] = [];

	constructor(
		private readonly _type: Function,
		private readonly _formId: string,
	) {
		Checker.param(_formId, 'form id');
		this._form = document.getElementById(_formId) as HTMLFormElement;
		this._tboxCollectionName = this._form.querySelector('[name=tboxCollectionName]') as HTMLInputElement;
		this._btnCreate = this._form.querySelector('[name=btnCreate]') as HTMLButtonElement;
		this._btnReload = this._form.querySelector('[name=btnReload]') as HTMLButtonElement;

		this.bindEvents();
	}

	getCollectionName(): string {
		return this._tboxCollectionName.value;
	}

	set addOnCreateHandler(handler: Function) {
		this._onCreateHandlers.push(handler);
	}

	set addOnReloadHandler(handler: Function) {
		this._onReloadHandlers.push(handler);
	}

	bindEvents(): void {
		const me = this;

		this._btnCreate.onclick = function (evt) {
			const collectionName: string = me._tboxCollectionName.value;
			const created: MediaCollection<T> = new MediaCollection<T>(
				me._type, collectionName
			);
			me._onCreateHandlers.forEach(handler => handler(created));
		}

		this._btnReload.onclick = evt => {
			me._onReloadHandlers.forEach(handler => handler());
		}
	}
}

class GalleryView {
	constructor(
		private _container: HTMLDivElement
	) {
	}
}

class MediaCollectionView {
	private _element: HTMLDivElement = document.createElement('div');

	constructor() {


abstract class MediaCollectionListView {
	private _element = document.createElement('div');
	private _container = document.createElement('div');
	private _table = document.createElement('table');

	protected constructor(private _identifier: string) {
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
				${ this.getCustomFields() }
			</tr>
			</thead>
			<tbody id="${_identifier}"></tbody>
		`.trim();

		this._container.append(this._table);
		this._element.append(this._container);
	}

	protected abstract getCustomFields(): string;
	protected abstract getMediaSpecificValues(media: Media): string;


	addMedia(media: Media): void {
		const tbody = this._table.querySelector('tbody') as HTMLElement;
		Checker.element(tbody, 'book table body');
		tbody.innerHTML += `
			<tr id="${ media.identifier }">
				<td><img src="${media.pictureLocation}"></td>
				<td>${media.name}</td>
				<td>${media.genre}</td>
				<td>${media.description}</td>
				${ this.getMediaSpecificValues(media) }
				<td><input type="button" value="삭제"></td>
			</tr>
		`.trim();
	}

	removeMedia(media: Media): void {
		let mediaRow = this._table.querySelector(`#${media.identifier}`);
		if(mediaRow) mediaRow.remove();
	}
}

class BookCollectionListView extends MediaCollectionListView {
	protected getCustomFields(): string {
		return '<td>Author</td><td>Pages</td>';
	}

	protected getMediaSpecificValues(media: Media): string {
		const book = media as Book;
		return `<td>${book.author}</td><td>${book.totalPage}</td>`;
	}
}

class MovieCollectionListView extends MediaCollectionListView {
	protected getCustomFields(): string {
		return '<td>Director</td><td>Length</td>';
	}

	protected getMediaSpecificValues(media: Media): string {
		const movie = media as Movie;
		return `<td>${movie.director}</td><td>${movie.runningTime}</td>`;
	}
}

export class MediaView {
	private _bookForm: MediaFormView<Book> = new MediaFormView<Book>(Book, 'newBookCollection');
	// private _movieForm: MediaFormView<Movie> = undefined;

	constructor() {
	}
}