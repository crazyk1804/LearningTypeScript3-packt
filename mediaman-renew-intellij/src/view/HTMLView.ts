export abstract class HTMLView {
	
	protected _element: HTMLElement;

	protected constructor(options?: any) {
		this._element = this.createElement(options);
	}

	protected abstract createElement(options?: any): HTMLElement;

	public append(child: HTMLView): void {
		this._element.append(child._element);
	}

	protected select<T extends HTMLElement>(selector: string): T {
		return this._element.querySelector(selector) as T;
	}

	protected selectByName<T extends HTMLElement>(name: string, tag?: string): T {
		return this._element.querySelector(`${ tag ? tag : ''}[name=${ name }]`) as T;
	}

	get element(): HTMLElement {
		return this._element;
	}
}