import {v4 as uuidV4 } from "uuid";

export class Generator {
    static newId(): string {
        return uuidV4();
    }
}

export class Checker {
    static param(param: any, paramName: string): void {
        if (param) return;
        throw new Error(`parameter ${paramName} must be provided!`);
    }

    static element(element: HTMLElement, name: string): void {
        if (element) return;
        throw new Error(`Element ${name} is not in document. What the fuck did you do?`);
    }

    static elementValue(element: HTMLInputElement | string, name: string): string {
        if('string' === typeof element) {
            element = document.getElementById(element) as HTMLInputElement;
        }
        if (!element) throw new Error(`There is no element of ${name}!!`);
        return element.value;
    }

}

export class Viewty {
    private static domParser = new DOMParser();

    static appendNext(targetNode: HTMLElement | string, node: HTMLElement): void {
        if('string' == typeof targetNode) {
            targetNode = document.getElementById(targetNode) as HTMLElement;
        }

        if (!targetNode || !targetNode.parentNode) return;
        targetNode.parentNode.insertBefore(node, targetNode.nextSibling);
    }

    static dom<T extends HTMLElement>(html: string): T {
        let element = this.domParser.parseFromString(html, 'text/xml');
        return element.firstChild as T;
    }
}
