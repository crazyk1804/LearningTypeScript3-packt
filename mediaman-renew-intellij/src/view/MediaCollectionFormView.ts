import {HTMLView} from "./HTMLView";
import {Checker, Viewty} from "../cmm/utils";
import {MediaCollection} from "../domain/MediaCollection";
import {Media} from "../domain/Media";

export class MediaCollectionFormView<T extends Media> extends HTMLView {
	private _onCreateMediaCollectionHandler: Function | undefined;

	constructor(private _type: Function) {
		super();
		this._element.innerHTML = `
			<div class="container">
				<h3>New collection</h3>
				<form action="#">
					<input type="text" name="name" title="Name" placeholder="Name" required>
					<input type="button" name="btnCreate" value="Create"/>
				</form>
			</div>
			<div class="container">
				<h3>Tools</h3>
				<form action="#">
					<input type="button" name="btnReload" value="Reload collections"/>
				</form>
			</div>
		`;
		this.bindEvents();
	}

	protected createElement(): HTMLElement {
		return Viewty.el('<div class="containerGroup"></div>');
	}

	private bindEvents(): void {
		this.selectByName('btnCreate').onclick = evt => {
			if(!this._onCreateMediaCollectionHandler) return;

			const mediaCollection: MediaCollection<T> = new MediaCollection<T>(
				this._type,
				Checker.evs(this.selectByName<HTMLInputElement>('name'), 'collection name')
			);
			this._onCreateMediaCollectionHandler(evt, mediaCollection);
		}
	}

	set onCreateMediaCollection(handler: Function) {
		this._onCreateMediaCollectionHandler = handler;
	}
}