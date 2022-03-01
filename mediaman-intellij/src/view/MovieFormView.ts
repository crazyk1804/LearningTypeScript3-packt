import {Genre, MediaCollection, Movie} from "../domain/domain";
import {Checker, Viewty} from "../common/utils";
import {MediaFormView} from "./MediaFormView";

export class MovieFormView extends MediaFormView<Movie> {
	constructor(readonly mediaCollection: MediaCollection<Movie>) {
		super(mediaCollection);
		const identifier = mediaCollection.identifier;
		Viewty.appendNext(`tboxName-${identifier}`, Viewty.dom(
			`<input type="text" id="tboxDirector-${identifier}" name="director" placeholder="Director" required>`
		));
		Viewty.appendNext(`nboxLength-${identifier}`, Viewty.dom(
			`<input type="number" id="nboxLength-${identifier}" name="length" required>`
		));
	}

	getMedia(): Movie {
		const identifier = this.mediaCollection.identifier;
		const frm = document.getElementById(`mediaForm-${identifier}`) as HTMLFormElement;
		Checker.element(frm, `mediaForm-${identifier}`);

		const genreKey = Checker.elementValue(`cboxGenre-${identifier}`, 'Movie Genre');
		let movie = new Movie(
			Checker.elementValue(`tboxName-${identifier}`, 'Book Name'),
			Checker.elementValue(`taDescription-${identifier}`, 'Book Description'),
			Checker.elementValue(`urlPictureLocation-${identifier}`, 'Book Image Url'),
			Genre[genreKey as keyof typeof Genre],
			Checker.elementValue(`tboxDirector-${identifier}`, 'Movie Director'),
			Number(Checker.elementValue(`nboxLength-${identifier}`, 'Movie Length'))
		);
		return movie;
	}
}