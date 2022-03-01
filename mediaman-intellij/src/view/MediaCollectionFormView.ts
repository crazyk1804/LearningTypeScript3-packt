import {Media, MediaCollection} from "../domain/domain";
import {Checker} from "../common/utils";

class MediaCollectionFormView<T extends Media> {
	private _form: HTMLFormElement;
	private _tboxCollectionName: HTMLInputElement;
	private _btnCreate: HTMLButtonElement;
	private _btnReload: HTMLButtonElement;
	private _onCreateHandlers: Function[] = [];
	private _onReloadHandlers: Function[] = [];

	constructor(
		private readonly _type: Function,
		private readonly _formId: string,
	) {
		Checker.param(_formId, 'form id');
		this._form = document.getElementById(_formId) as HTMLFormElement;
		this._tboxCollectionName = this._form.querySelector('[name=tboxCollectionName]') as HTMLInputElement;
		this._btnCreate = this._form.querySelector('[name=btnCreate]') as HTMLButtonElement;
		this._btnReload = this._form.querySelector('[name=btnReload]') as HTMLButtonElement;

		this.bindEvents();
	}

	getCollectionName(): string {
		return this._tboxCollectionName.value;
	}

	set addOnCreateHandler(handler: Function) {
		this._onCreateHandlers.push(handler);
	}

	set addOnReloadHandler(handler: Function) {
		this._onReloadHandlers.push(handler);
	}

	bindEvents(): void {
		const me = this;

		this._btnCreate.onclick = function (evt) {
			const collectionName: string = me._tboxCollectionName.value;
			const created: MediaCollection<T> = new MediaCollection<T>(
				me._type, collectionName
			);
			me._onCreateHandlers.forEach(handler => handler(created));
		}

		this._btnReload.onclick = evt => {
			me._onReloadHandlers.forEach(handler => handler());
		}
	}
}