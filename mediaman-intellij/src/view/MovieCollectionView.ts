import {MediaCollection, Movie} from "../domain/domain";
import {MediaCollectionView} from "./MediaCollectionView";
import {MediaFormView} from "./MediaFormView";
import {MovieFormView} from "./MovieFormView";
import {MediaListView} from "./MediaListView";
import {MovieListView} from "./MovieListView";

export class MovieCollectionView extends MediaCollectionView<Movie> {
	constructor(readonly mediaCollection: MediaCollection<Movie>) {
		super(mediaCollection);
	}

	createFormView(): MediaFormView<Movie> {
		return new MovieFormView(this._mediaCollection);
	}

	createListView(): MediaListView {
		return new MovieListView(this._mediaCollection.identifier);
	}
}