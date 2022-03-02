import {HTMLView} from "./HTMLView";
import {MediaCollectionManagerView} from "./MediaCollectionManagerView";
import {Book} from "../domain/domain";

export class MediaManView extends HTMLView{
	private _bookCollectionView: MediaCollectionManagerView<Book>;

	constructor() {
		super();
		this._bookCollectionView = new MediaCollectionManagerView<Book>(Book)

		this.append(this._bookCollectionView);
	}

	getElement(): HTMLElement {
		return document.body;
	}
}