import {Media, MediaCollection} from "../domain/domain";
import {MediaFormView} from "./MediaFormView";
import {MediaListView} from "./MediaListView";

export abstract class MediaCollectionView<T extends Media> {
	protected _element: HTMLDivElement = document.createElement('div');
	protected _formView: MediaFormView<T>;
	protected _listView: MediaListView;

	constructor(protected readonly _mediaCollection: MediaCollection<T>) {
		this._formView = this.createFormView();
		this._listView = this.createListView();
	}

	abstract createFormView(): MediaFormView<T>;
	abstract createListView(): MediaListView;
}
