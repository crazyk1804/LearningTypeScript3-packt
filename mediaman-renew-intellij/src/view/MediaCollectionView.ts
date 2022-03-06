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
	private _mediaType: Function;
	private _collection: MediaCollection<T>;

	constructor(mediaType: Function, collection: MediaCollection<T>) {
		super({mediaType: mediaType, collection: collection});
		this._mediaType = mediaType;
		this._collection = collection;
		this.init();
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

	private createMedia(): T {
		switch(this._mediaType) {
			case Book:
				return new Book(
					Checker.evs(this.selectByName('name'), 'Book Name')),
					Checker.evs(this.selectByName('description'), 'Book Description'))
				)
		}
	}
}