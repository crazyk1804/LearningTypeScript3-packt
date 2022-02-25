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
}