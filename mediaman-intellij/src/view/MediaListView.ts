import {HTMLView} from "./HTMLView";
import {Viewty} from "../common/utils";
import {Media} from "../domain/domain";

export class MediaListView<T extends Media> extends HTMLView {
	constructor(private _mediaType: Function) {
		super(_mediaType);
	}

	protected getElement(_mediaType: Function): HTMLElement {
		return Viewty.el(`
			<div class="containerGroup">
				<div class="container">
					<table class="collectionTable">
					<thead>
					<tr>
						<td>Picture</td>
						<td>Name</td>
						<td>Genre</td>
						<td>Description</td>
						<td>Remove</td>
					</tr>
					</thead>
					<tbody>
					</tbody>
					</table>
				</div>
			</div>
		`)
	}
}