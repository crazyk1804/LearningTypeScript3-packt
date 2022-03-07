import {Book, Genre, Media} from "../domain/Media";
import {HTMLView} from "./HTMLView";
import {Checker, Viewty} from "../cmm/utils";
import {MediaCollection} from "../domain/MediaCollection";

const genreOptions: string = Object.keys(Genre).reduce((html, key) => {
	html += `<option value="${key}">${ Genre[key as keyof typeof Genre] }</option>`;
	return html;
}, '');

export interface ViewParam<T extends Media> {
	mediaType: Function,
	collection: MediaCollection<T>
}

export class MediaCollectionView<T extends Media> extends HTMLView {
	private readonly _mediaType: Function;
	private _collection: MediaCollection<T>;
	private _onCreateMediaHandler: Function | undefined;

	constructor(mediaType: Function, collection: MediaCollection<T>) {
		super({mediaType: mediaType, collection: collection});
		this._mediaType = mediaType;
		this._collection = collection;
		this.init();
		this.bindEvents();
	}

	protected createElement(param: ViewParam<T>) {
		const mediaType = param.mediaType;
		const collection = param.collection;

		return Viewty.el(`
			<div class="collection">
                <h3 class="collectionName">${ collection.name }</h3>
                
                <div class="containerGroup">
					<div class="container">
						<h3>New ${ mediaType.name }</h3>
	
						<form action="#">
							<ul>
								<li>
									<input name="name" type="text" title="Name" placeholder="Name" required>
								</li>
								<li>
									<select name="genre" required>${ genreOptions }</select>
								</li>
								<li>
									<input name="picture" type="url" title="Picture" 
										placeholder="Picture URL" value="https://picsum.photos/536/354">
								</li>
								<li>
									<textarea name="description" placeholder="Description"></textarea>
								</li>
							</ul>
							<input type="button" value="Create">
						</form>
					</div>
					<div class="collectionToolsContainer">
						<h3>Tools</h3>
						<form action="#">
							<input type="button" value="Remove collection">
						</form>
					</div>
				</div>
				
				<div class="containerGroup">
					<div class="container">
						<table class="collectionTable">
						<thead>
						<tr>
							<td>Picture</td>
							<td>Name</td>
							<td>Genre</td>
							<td>Description</td>
							<td>Remove</td>
						</tr>
						</thead>
						<tbody></tbody>
						</table>
					</div>
				</div>
            </div>
		`);
	}

	private init(): void {
		switch(this._mediaType) {
			case Book:
				this.select('li:first-of-type').append(
					Viewty.el('<input type="text" name="author" title="author" placeholder="Author">')
				);
				this.select('li:nth-of-type(2)').append(
					Viewty.el('<input type="number" name="pages" title="pages" placeholder="Pages">')
				);
				const headTr = this.select('.collectionTable > thead > tr');
				headTr.insertBefore(Viewty.el('<td>Author</td>'), headTr.querySelector('td:last-child'));
				headTr.insertBefore(Viewty.el('<td>Pages</td>'), headTr.querySelector('td:last-child'));
				break;
			default:
				throw new Error(`Invalid media type: ${ this._mediaType }`);
		}
	}

	public createMedia(): T {
		switch(this._mediaType) {
			case Book:
				return new Book(
					Checker.evs(this.selectByName<HTMLInputElement>('name'), 'Book Name'),
					Checker.evs(this.selectByName<HTMLInputElement>('description'), 'Book Description'),
					Checker.eve(this.selectByName<HTMLInputElement>('genre'), 'Book Genre', Genre),
					Checker.evs(this.selectByName<HTMLInputElement>('picture'), 'Book Picture'),
					Checker.evs(this.selectByName<HTMLInputElement>('author'), 'Book Author'),
					Checker.evn(this.selectByName<HTMLInputElement>('pages'), 'Book Pages')
				) as unknown as T;
			default:
				throw new Error(`Invalid media type: ${ this._mediaType }`);
		}
	}

	public addMedia(media: T): void {
		const row = Viewty.el(`
			<tr>
				<td><img src="${ media.pictureLocation }"/></td>
				<td>${ media.name }</td>
				<td>${ media.genre }</td>
				<td>${ media.description }</td>
				<td><input type="button" value="-"/></td>
			</tr>
		`.trim());

		if(media instanceof Book) {
			const book = media as Book;
			row.insertBefore(Viewty.el(`<td>${ book.author }</td>`), row.querySelector('td:last-child'));
			row.insertBefore(Viewty.el(`<td>${ book.pages }</td>`), row.querySelector('td:last-child'));
		}

		const tbody = this.select('.collectionTable > tbody');
		tbody.append(row);
	}

	private bindEvents(): void {
		const btnCreate = this.select('input[type=button][value=Create]');
		btnCreate.onclick = evt => {
			if(!this._onCreateMediaHandler) return;
			const media = this.createMedia();
			this._onCreateMediaHandler(evt, media, this._collection);
		}
	}

	set onCreateMedia(handler: Function) {
		this._onCreateMediaHandler = handler;
	}

	get identifier(): string {
		return this._collection.identifier;
	}
}