import {Media, Movie} from "../domain/domain";
import {MediaListView} from "./MediaListView";

export class MovieListView extends MediaListView {
	constructor(collectionIdentifier: string) {
		super(collectionIdentifier);
	}

	protected getCustomFields(): string {
		return '<td>Director</td><td>Length</td>';
	}

	protected getMediaSpecificValues(media: Media): string {
		const movie = media as Movie;
		return `<td>${movie.director}</td><td>${movie.runningTime}</td>`;
	}
}