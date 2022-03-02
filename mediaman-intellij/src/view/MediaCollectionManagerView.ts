import {HTMLView} from "./HTMLView";
import {Viewty} from "../common/utils";
import {MediaCollectionFormView} from "./MediaCollectionFormView";
import {Media, MediaCollection} from "../domain/domain";
import {MediaCollectionGalleryView} from "./MediaCollectionGalleryView";

export class MediaCollectionManagerView<T extends Media> extends HTMLView {
	private _formView: MediaCollectionFormView<T>;
	private _galleryView: MediaCollectionGalleryView<T>;

	constructor(private _mediaType: Function) {
		super();
		this._formView = new MediaCollectionFormView<T>(_mediaType);
		this._galleryView = new MediaCollectionGalleryView<T>(_mediaType);

		this.append(this._formView);
		this.append(this._galleryView);

		this.bindEvents();
	}

	protected getElement(): HTMLElement {
		return Viewty.el('<div class="collectionContainerGroup"></div>');
	}

	protected bindEvents(): void {
		this._formView.onCreate = (created: MediaCollection<T>) => {
			this._galleryView.addMediaCollection(created);
		}
	}
}