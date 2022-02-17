console.log('fdsa');

class ColoredCar {
    private _color: string;
    private static DEFAULT_COLOR = 'Red';

    constructor(color: string) {
        this._color = color;
    }

    displayColor() {
        console.log(`Color of this car: ${this._color}`);
    }

    public get color(): string {
        return this._color;
    }

    public set color(color: string) {
        this._color = color;
    }

    private resetColor() {
        this._color = ColoredCar.DEFAULT_COLOR;
    }
}

abstract class Shape {
    constructor(private readonly _shapeName: string) {
        this.displayInformation();
    }

    abstract displayArea(): void;
    abstract displayPerimeter(): void;

    protected get shapeName(): string {
        return this._shapeName;
    }

    public displayInformation(): void {
        console.log(`This shape is a ${this._shapeName}`);
    }

    public doSomething(): void {
        console.log('Not interesting');
    }
}

class Square extends Shape {
    constructor(private _width: number) {
        super('Square');
    }

    displayArea(): void {
        const area = this._width * this._width;
        console.log(`This ${this.shapeName} has an area of: ${ area }`);
    }

    displayPerimeter(): void {
        const perimeter = 2 * (this._width + this._width);
        console.log(`This ${this.shapeName} has a permiter of: ${ perimeter }`);
    }

    public doSomething(): void {
        console.log('Something more interesting');
    }
}

class Calculator {
    constructor(private _currentValue: number = 0) {}

    add(a: number): this {
        this._currentValue += a;
        return this;
    }

    substract(a: number): this {
        this._currentValue -= a;
        return this;
    }

    multiply(a: number): this {
        this._currentValue *= a;
        return this;
    }

    divide(a: number): this {
        this._currentValue /= a;
        return this;
    }

    get value(): number {
        return this._currentValue;
    }
}

let result: number = new Calculator(0)
    .add(5)
    .multiply(2)
    .add(10)
    .divide(4)
    .substract(2)
    .value;

console.log(`Result: ${ result }`);


const plane: {
    name: string,
    description: string
} = {
    name: 'Plane',
    description: 'Something that files"'
}

function foo(bar: { firstName: string, lastName: string}): void {
    console.log(`Hello ${ bar.firstName}... or should I call you Mr ${ bar.lastName }?`);
}

foo({
    firstName: 'Sebastian',
    lastName: 'Dubois'
});


function performCalculation(a: number, b: number, calculationFn: (x: number, y: number) => number): void {
    console.log(`The result is ${ calculationFn(a, b)}`);
}

performCalculation(5, 10, (x:number, y:number) => x + y);



type Thing = {
    name: string,
    description: string
}

const myThing: Thing = {
    name: 'Computer',
    description: 'A thing that can perform calculations'
}




interface MusicPlayer {
    play(): void;
    pause(): void;
    stop(): void;
    rewind(seconds: number): void;
    fastForward(seconds: number): void;
}

class BasicMusicPlayer implements MusicPlayer {
    fastForward(seconds: number) : void {
        console.log(`Moving forward ${seconds} seconds`);
    }

    pause(): void {
        console.log('Pausing');
    }

    play(): void {
        console.log('Playing');
    }

    stop(): void {
        console.log('stopping');
    }

    rewind(seconds: number): void {
        console.log(`rewinding ${ seconds } seconds...`);
    }

}




interface Person {
    firstName: string
    lastName: string
    age: number
}

function sayHelloTo(bar: Person): void {
    console.log(`Hello ${ bar.firstName }... or should I call you Mr ${ bar.lastName }?`);
}

let johnDoe: Person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 42
};

sayHelloTo(johnDoe);




interface Club {
    name: string;
    logoLocation: string;
    isActive(): boolean;
}

interface SoccerClub extends Club {
    league: string;
}

