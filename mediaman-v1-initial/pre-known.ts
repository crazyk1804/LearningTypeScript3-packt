// Generic
class Person {
    constructor(private _firstName: string, private _lastName: string) {

    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}


let persons: Array<Person> = [];

persons.push(
    new Person('John', 'McClane'),
    new Person('John', 'Smith'),
    new Person('John', 'Dunbar')
)

const person: Person = persons.pop() as NonNullable<Person>;

persons.forEach(person => {
    console.log(`Hello ${ person.firstName } ${ person.lastName }`);
});

for(let person: Person, i:number=0 ; i<persons.length ; i++) {
    person = persons[i];
    console.log(`Hello, ${person.firstName} ${person.lastName}`);
}

for(const person of persons) {
    console.log(`Hello ${person.firstName} ${person.lastName}`);
}



function log<T>(arg: T): T {
    console.log('Log entry: ', arg);
    return arg;
}

class Person2 {
    constructor(private name: string) {

    }
}

interface Logger<T> {
    debug(arg: T): T;
    info(arg: T): T;
    warn(arg: T): T;
    error(arg: T): T;
    fatal(arg: T): T;
}

interface BasicLogger {
    log<T>(arg: T): T;
}


class NaiveMap<Key, Value> {
    private _keys: Key[] = [];
    private _values: Value[] = [];

    constructor() {

    }

    contains(key: Key): boolean {
        const result = this._keys.indexOf(key);
        return result !== -1;
    }

    put(key: Key, value: Value): void {
        this._keys.push(key);
        this._values.push(value);
    }

    get(key: Key): Value | undefined {
        if (!this.contains(key)) {
            return undefined;
        }

        return this._values[this._keys.indexOf(key)];
    }
}

class Thing {
    constructor(public name: string) {}
}

const naiveMap = new NaiveMap<string, Thing>();
naiveMap.put('foo', new Thing('the thing'));
console.log(naiveMap.contains('foo'));
console.log(naiveMap.get('foo'));



interface InterfaceWithDefaultGenericType<T = string> {
    doSomething(arg: T): T;
}

class ClassWithDefaultGenericType<T = string> {
    constructor(public something: T){}
}

interface InterfaceWithSpecializedGenericType<T = Person & { age: number }> {
    doSomething(arg: T): T;
}

class AgedPerson extends Person {
    constructor(_firstName: string, _lastName: string) {
        super(_firstName, _lastName);
    }
}



class CLS implements InterfaceWithSpecializedGenericType<AgedPerson> {
    doSomething(arg: AgedPerson): AgedPerson {
        return arg;
    }
}

let ap: Person = new AgedPerson('mother', 'fucker');
let cls = new CLS();
console.log(cls.doSomething(ap));

class A {
    constructor(public firstName: string, public lastName: string) {}
}

type B = {
    age: number
}

type C = A&B;

let c:C = {
    firstName: 'first', lastName: 'last', age: 10
};

// 맘에 안드는데 위에껀...




abstract class Recipe {
    constructor(public name: string, public ingredients: string[]) {

    }
}

class ItalianRecipe extends Recipe {

}

class FrenchRecipe extends Recipe {
    constructor(name: string, ingredients: string[], public chef: string) {
        super(name, ingredients);
    }
}

class BrittanyRecipe extends FrenchRecipe {

}

// generic constraint
function displayRecipe<T extends FrenchRecipe>(recipe: T): void {
    console.log(
        `This is a french recipe coonceived by the following chef: ${ recipe.chef}`
    );
}

const brittanyRecipe = new BrittanyRecipe(
    'Crepe Bretonne',
    ['Eggs', 'Flour', 'Salt', '...'], 
    'Bertrand Denis'
);

const italianRecipe = new ItalianRecipe(
    'Spaghetti Bolognese',
    ['Pasta', 'Tomatoes', 'Garlic', 'Onions', '...'],
);

// displayRecipe(italianRecipe);
// if you uncomment this line you'll get the following error: 
// property 'chef' is missing
displayRecipe(brittanyRecipe);
// This is a french recipe conceived by the following chef: Betrand Denis




type Dog = {
    name: string;
    race: string;
}

type Cat = {
    race: string;
    nightVision: number;
}

function isDog(arg: any): arg is Dog {
    return arg.race !== undefined;
}

console.log(isDog({
    race: 'Saint-Hubert',
    nightVision: 12
}));





enum VehicleType {
    Car, Bus, Train
}

let myVehicleType = VehicleType.Car;
console.log('My vehicle type: ', myVehicleType);


enum VehicleType {
    Truck = 1
}

console.log(
    'My vehicle type: ', VehicleType.Car,
    ' New vehicle type: ', VehicleType.Truck
)

enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

const june: Month = Month.June;
const nameOfJuneEntry: string = Month[june];
console.log(nameOfJuneEntry);



enum TShirtType {
    CrewNeck = 'Crew Neck',
    VNeck = 'V Neck',
    Henley = 'Henley',
    Polo = 'Polo',
    SpecialPolo = Polo,
    ScoopNeck = 'ScoopNeck'
}
let myTShirtType = TShirtType.SpecialPolo;
console.log('My T-Shirt type: ', myTShirtType);




const enum TransientEnum {
    A, B
}
console.log(TransientEnum.A);


const enum TransientEnum {
    C = 3
}

let te: TransientEnum = TransientEnum.C;
console.log(TransientEnum['C']);





// 어따 쓰는거야 대체..
function doSomethingForever(): never {
    while(true) {
        console.log('Still busy...');
    }
}




type Mood = 'Great' | 'Good' | 'Awful';
const myCurrentMood: Mood = 'Great'; // may only be assigned values that are part of the Mood union





interface BoardGame {
    name: string;
    description: string;
    minimalAge: number;
    players: string;
    duration: string;
}

interface VideoGame {
    name: string;
    description: string;
    minimalAge: number;
    players: string;
    online: boolean;
}

function displayGame(game: VideoGame | BoardGame) {
    console.log(`Game anem: ${ game.name }`);
}

let boardGame: BoardGame = {
    name: 'board',
    description: 'game that can play via board',
    minimalAge: 100,
    players: 'womens only',
    duration: 'night long'
}
displayGame(boardGame);

console.log('why this is not printed?');


type newType = {
    a: string;
    b: string;
}

function printType(theType: newType) {
    console.log(theType);
}