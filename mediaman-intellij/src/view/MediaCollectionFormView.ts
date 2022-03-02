import {Checker, Viewty} from "../common/utils";
import {HTMLView} from "./HTMLView";
import {Media, MediaCollection} from "../domain/domain";

export class MediaCollectionFormView<T extends Media> extends HTMLView {
	private _onCreateHandlers: Function[] = [];

	constructor(private _mediaType: Function) {
		super();

		this.bindEvents();
	}

	protected getElement(): HTMLElement {
		return Viewty.el<HTMLDivElement>(`
			<div>
				<div class="containerGroup">
					<div class="container">
					<h3>New collection</h3>
					<form action="#" name="collectionForm">
						<input type="text" name="collectionName" title="Name" placeholder="Name" 
							class="fld-collection-name" required/>
						<input type="button" value="Create" name="btnCreate" />
					</form>
				</div>
				<div class="container">
					<h3>Tools</h3>
					<form action="#">
						<input type="button" name="btnReload" value="Reload collections" />
					</form>
				</div>
			</div>
		`);
	}

	getMediaCollection(): MediaCollection<T> {
		const collectionName = Checker.ev(this.findByName<HTMLInputElement>('collectionName'), 'Collection Name');
		return new MediaCollection<T>(this._mediaType, collectionName);
	}

	set onCreate(handler: Function) {
		this._onCreateHandlers.push(handler);
	}

	private bindEvents() {
		let btnCreate = this._element.querySelector('[name=btnCreate]') as HTMLButtonElement;
		btnCreate.onclick = evt => {
			if(!this._onCreateHandlers.length) return;

			const mediaCollection = this.getMediaCollection();
			this._onCreateHandlers.forEach(handler => handler(mediaCollection));
		}
	}
}