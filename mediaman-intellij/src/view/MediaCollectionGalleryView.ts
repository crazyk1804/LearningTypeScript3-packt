import {HTMLView} from "./HTMLView";
import {Viewty} from "../common/utils";
import {Media, MediaCollection} from "../domain/domain";
import {MediaCollectionView} from "./MediaCollectionView";

export class MediaCollectionGalleryView<T extends Media> extends HTMLView {
	private _mediaCollectionViews: MediaCollectionView<T>[] = [];

	constructor(private _mediaType: Function) {
		super();
	}

	protected getElement(): HTMLElement {
		return Viewty.el('<div class="containerGroup"></div>');
	}

	addMediaCollection(mediaCollection: MediaCollection<T>): void {
		const mediaCollectionView = new MediaCollectionView<T>({
			_mediaType: this._mediaType,
			_mediaCollection: mediaCollection
		});

		this._mediaCollectionViews.push(mediaCollectionView);
		this.append(mediaCollectionView);
	}
}