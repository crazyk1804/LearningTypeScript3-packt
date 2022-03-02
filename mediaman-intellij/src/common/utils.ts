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

    static ev(element: HTMLInputElement | string, name: string): string {
        if ('string' === typeof element)
            element = document.getElementById(element) as HTMLInputElement;

        if(!element) throw new Error(`cannot find element ${ name }`);
        if(!element.checkValidity()) {
            element.reportValidity();
            throw new Error(`invalid value on ${ name }`);
        }
        return element.value;
    }
}

export class Viewty {
    private static domParser = new DOMParser();

    static isParseError(parsedDocument: Document) {
        // parser and parsererrorNS could be cached on startup for efficiency
        var parser = new DOMParser(),
            errorneousParse = parser.parseFromString('<', 'application/xml'),
            parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

        if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
            // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
            return parsedDocument.getElementsByTagName("parsererror").length > 0;
        }

        return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
    };

    static el<T extends HTMLElement>(html: string): T {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild as T;
    }
}