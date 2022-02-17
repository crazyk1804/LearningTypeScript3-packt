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

interface InterfaceWithSpecializedGenericType<T = Person & { arg: number }> {
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

let ap: AgedPerson = new AgedPerson('mother', 'fucker');
let cls = new CLS();
console.log(cls.doSomething(ap));