// import myBooks from "./pre-descriptions";
// import { myPublicKey } from "./pre-descriptions";
// console.log(myBooks);
import * as t from 'io-ts';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

import { log, Message, MessageType, myPublicKey } from './pre-descriptions';


console.log('Public Key: ', myPublicKey);

const infoMessage: Message = {
    content: 'Hello world',
    type: MessageType.INFORMATION
}

const errorMessage: Message = {
    content: 'Oopsie doopsie',
    type: MessageType.ERROR
};

log(infoMessage);
log(errorMessage);



const nameValidator = t.string;
const validationResult = nameValidator.decode('foobar');
console.log(`validation result: ${ validationResult.isRight() }`);


const countryValidator = t.type({
    id: t.string,
    name: t.string,
    capitalCity: t.string
});

interface Country extends t.TypeOf<typeof countryValidator>{}
const validCountry: Country = {
    id: 'BE',
    name: 'Belgium',
    capitalCity: 'Brussels'
};

const invalidCountry: unknown = {
    foo: 'foo',
    id: 'j',
    name: 'wjdwogml',
    capitalCity: 'qhwl'
};

const validationResultForValidCountry = countryValidator.decode(validCountry);
const validationResultForInvalidCountry = countryValidator.decode(invalidCountry);
ThrowReporter.report(validationResultForValidCountry);

const validCountryObject = validationResultForValidCountry.value as Country;
console.log('Valid country`s name: ', validCountryObject.name);

try {
    ThrowReporter.report(validationResultForInvalidCountry);
    console.log('Done!');
} catch(error: any) {
    console.error('An error occured: ', error);
}