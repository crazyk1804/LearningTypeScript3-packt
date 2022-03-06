import {HTMLView} from "./HTMLView";
import {Viewty} from "../cmm/utils";
import {MediaCollectionFormView} from "./MediaCollectionFormView";
import {Book} from "../domain/Media";
import {MediaCollection} from "../domain/MediaCollection";
import {MediaCollectionView} from "./MediaCollectionView";

export class MediaManView extends HTMLView {
	private bookCollectionForm: MediaCollectionFormView<Book>;
	private bookCollectionViews: MediaCollectionView<Book>[] = [];

	constructor() {
		super();
		this.bookCollectionForm = new MediaCollectionFormView<Book>(Book);

		this._element.append(Viewty.el('<h1>Media Man</h1>'));
		this._element.append(Viewty.el('<h2>Book Collections</h2>'));
		this._element.innerHTML = `
			<h1>Media Man</h1>
    		<h2>Book collections</h2>
    		
			<div id="bookCollectionGallery" class="collectionContainerGroup">
				<div id="bookCollections" class="containerGroup">
				</div>
			</div>
		
			<hr/>
			<h2>Movie collections</h2>
			Bonus exercise!
		`.trim();

		this.init();
	}

	private init(): void {
		this.select('[id=bookCollectionGallery]').insertBefore(
			this.bookCollectionForm.element,
			this.select('[id=bookCollections]')
		);
	}


	protected createElement(options?: any): HTMLElement {
		return document.body;
	}

	public addBookCollection(bookCollection: MediaCollection<Book>): void {
		const view: MediaCollectionView<Book> = new MediaCollectionView<Book>(Book, bookCollection);
		this.select('[id=bookCollections]').append(view.element);
		this.bookCollectionViews.push(view);
	}
}