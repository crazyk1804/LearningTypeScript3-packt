import {Media} from "../domain/domain";
import {Checker} from "../common/utils";

export abstract class MediaListView {
	private _element = document.createElement('div');
	private _container = document.createElement('div');
	private _table = document.createElement('table');

	protected constructor(private _identifier: string) {
		this._element.className = 'containerGroup';
		this._container.className = 'container';
		this._table.className = 'collectionTable';
		this._table.innerHTML = `
			<thead>
			<tr>
				<td>Picture</td>
				<td>Name</td>
				<td>Genre</td>
				<td>Description</td>
				<td>Author</td>
				${ this.getCustomFields() }
			</tr>
			</thead>
			<tbody id="${_identifier}"></tbody>
		`.trim();

		this._container.append(this._table);
		this._element.append(this._container);
	}

	protected abstract getCustomFields(): string;
	protected abstract getMediaSpecificValues(media: Media): string;


	addMedia(media: Media): void {
		const tbody = this._table.querySelector('tbody') as HTMLElement;
		Checker.element(tbody, 'book table body');
		tbody.innerHTML += `
			<tr id="${ media.identifier }">
				<td><img src="${media.pictureLocation}"></td>
				<td>${media.name}</td>
				<td>${media.genre}</td>
				<td>${media.description}</td>
				${ this.getMediaSpecificValues(media) }
				<td><input type="button" value="삭제"></td>
			</tr>
		`.trim();
	}

	removeMedia(media: Media): void {
		let mediaRow = this._table.querySelector(`#${media.identifier}`);
		if(mediaRow) mediaRow.remove();
	}
}