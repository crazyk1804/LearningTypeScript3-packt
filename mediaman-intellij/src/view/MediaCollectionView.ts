import {Book, Genre, Media, MediaCollection} from "../domain/domain";
import {HTMLView} from "./HTMLView";
import {Checker, Viewty} from "../common/utils";
import {MediaFormView} from "./MediaFormView";
import {MediaListView} from "./MediaListView";

const genreOptions = Object.keys(Genre).reduce((html, key) => {
	const value = Genre[key as keyof typeof Genre];
	html += `<option value="${key}">${value}</option>`;
	return html;
}, '');

export interface MediaCollectionViewParam<T extends Media> {
	_mediaType: Function,
	_mediaCollection: MediaCollection<T>
};

export class MediaCollectionView<T extends Media> extends HTMLView {
	private _formView: MediaFormView<T>;
	private _listView: MediaListView<T>;

	constructor(viewParam: MediaCollectionViewParam<T>) {
		super(viewParam);
		this._formView = new MediaFormView<T>(viewParam._mediaType);
		this._listView = new MediaListView<T>(viewParam._mediaType);
		this.append(this._formView);
		this.append(this._listView);
		this.modifyElement(this._element, viewParam);
	}
	
	protected getElement(viewParam: MediaCollectionViewParam<T>): HTMLElement {
		const _mediaType = viewParam._mediaType;
		const _mediaCollection = viewParam._mediaCollection;
		const identifier = _mediaCollection.identifier
		const element = Viewty.el(`
			<div id="bookCollection-${ identifier }" class="collection">
                <h3 class="collectionName">${ _mediaCollection.name }</h3>
            </div>
		`);
		return element;
	}

	protected modifyElement(element: HTMLElement, viewParam: MediaCollectionViewParam<T>) {
		const _mediaType = viewParam._mediaType;
		const mediaForm = element.querySelector('form:first-of-type') as HTMLElement;

		if(Book === _mediaType) {
			let li = mediaForm.querySelector('li:first-of-type') as HTMLLIElement;
			li.append(Viewty.el('<input name="author" type="text" placeholder="Author" required>'));

			li = mediaForm.querySelector('li:nth-of-type(2)') as HTMLLIElement;
			li.append(Viewty.el('<input name="pages" type="number" placeholder="Pages" required>'));

			let table = element.querySelector('table') as HTMLTableElement;
			let tr = table.rows[0];
			let tdAuthor = Viewty.el('<td>Author</td>');
			tr.insertBefore(tdAuthor, tr.querySelector('td:last-child'));
			tr.insertBefore(Viewty.el('<td>Pages</td>'), tr.querySelector('td:last-child'));
		}
	}
}