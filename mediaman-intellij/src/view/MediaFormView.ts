import {Genre, Media, MediaCollection} from "../domain/domain";

const _genreOptions = Object.keys(Genre).reduce((html, key) => {
	html += `<option value="${ key }">${Genre[key as keyof typeof Genre]}</option>`;
	return html;
}, '');

export abstract class MediaFormView<T extends Media> {
	protected readonly _element: HTMLDivElement;
	protected _onCreateHandlers: Function[] = [];

	protected constructor(private readonly _mediaCollection: MediaCollection<T>) {
		this._element = document.createElement('div');
		this._element.className = 'container';
		this._element.innerHTML = `
			<h3>New book</h3>
			<form id="mediaForm-${_mediaCollection.identifier}" action="#">
				<ul>
					<li>
						<input id="tboxName-${_mediaCollection.identifier}" name="name"
							type="text" title="Name" placeholder="Name" required>
					</li>
					<li>
						<select id="cboxGenre-${_mediaCollection.identifier}" name="genre" required>
							${_genreOptions}
						</select>
					</li>
					<li>
						<input id="urlPictureLocation-${_mediaCollection.identifier}" name="pictureLocation"
							type="url" title="Picture" placeholder="Picture URL" value="https://picsum.photos/536/354">
					</li>
					<li>
						<textarea id="taDescription-${_mediaCollection.identifier}" name="description"
							placeholder="Description"></textarea>
					</li>
				</ul>
				<input id="btnCreateMedia-${ _mediaCollection.identifier }" type="button" value="Create" 
					onclick="mediaManController.createBook('${_mediaCollection.identifier}');">
			</form>
		`;
		this.bindEvents();
	}

	abstract getMedia(): T;

	addOnCreateHandler(handler: Function): void {
		this._onCreateHandlers.push(handler);
	}

	protected bindEvents(): void {
		const btn = this._element.querySelector(
			`#btnCreateMedia-${this._mediaCollection.identifier}`
		) as HTMLButtonElement;
		btn.onclick = evt => {
			let created = this.getMedia();
			this._onCreateHandlers.forEach(handler => handler(created));
		}
	}
}