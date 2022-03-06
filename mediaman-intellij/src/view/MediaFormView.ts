import {HTMLView} from "./HTMLView";
import {Genre, Media} from "../domain/domain";
import {Viewty} from "../common/utils";

const genreOptions = Object.keys(Genre).reduce((html, key) => {
	const value = Genre[key as keyof typeof Genre];
	html += `<option value="${key}">${value}</option>`;
	return html;
}, '');

export class MediaFormView<T extends Media> extends HTMLView {
	private _onCreateMedia: Function[] = [];

	constructor(private _mediaType: Function) {
		super(_mediaType);
	}

	protected getElement(_mediaType: Function): HTMLElement {
		return Viewty.el(`
			<div class="containerGroup">
				<div class="container">
					<h3>New ${ _mediaType.name }</h3>

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
		`)
	}
}