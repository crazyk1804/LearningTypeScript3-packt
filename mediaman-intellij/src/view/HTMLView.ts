export abstract class HTMLView {
	protected _element: HTMLElement;

	protected constructor(option?: any) {
		this._element = this.getElement(option);
	}

	protected abstract getElement(options?: any): HTMLElement;
	get element() { return this._element; }

	append(child: HTMLView): void {
		this._element.append(child._element);
	}

	findByName<T extends HTMLElement>(name: string): T {
		return this._element.querySelector(`[name=${name}]`) as unknown as T;
	}
}