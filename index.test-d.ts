import {expectType} from 'tsd';
import decamelizeKeys = require('.');

const fooBarObject = {fooBar: true};
const decamelizedFooBarObject = decamelizeKeys(fooBarObject);
expectType<typeof fooBarObject>(decamelizedFooBarObject);

const fooBarArray = [{fooBar: true}];
const decamelizedFooBarArray = decamelizeKeys(fooBarArray);
expectType<typeof fooBarArray>(decamelizedFooBarArray);

expectType<Array<{[key in 'fooBar']: true}>>(decamelizeKeys([{fooBar: true}]));

expectType<string[]>(decamelizeKeys(['name 1', 'name 2']));

expectType<string[]>(decamelizeKeys(['name 1', 'name 2'], {deep: true}));

expectType<{[key in 'fooBar']: true}>(decamelizeKeys({fooBar: true}));

expectType<{[key in 'fooBar']: true}>(
	decamelizeKeys({fooBar: true}, {deep: true})
);

expectType<{[key in 'fooBar']: true}>(
	decamelizeKeys({fooBar: true}, {deep: true, separator: '-'})
);

expectType<{[key in 'fooBar']: true}>(
	decamelizeKeys({fooBar: true}, {deep: true, preserveConsecutiveUppercase: true})
);

expectType<{[key in 'fooBar']: true}>(
	decamelizeKeys({fooBar: true}, {exclude: ['foo', /bar/]})
);

expectType<{[key in 'fooBar']: true}>(
	decamelizeKeys({fooBar: true}, {stopPaths: ['foo']})
);

interface SomeObject {
	someProperty: string;
}

const someObject: SomeObject = {
	someProperty: 'hello'
};

expectType<SomeObject>(decamelizeKeys(someObject));
expectType<SomeObject[]>(decamelizeKeys([someObject]));

type SomeTypeAlias = {
	someProperty: string;
};

const objectWithTypeAlias = {
	someProperty: 'this should also work'
};

expectType<SomeTypeAlias>(decamelizeKeys(objectWithTypeAlias));
expectType<SomeTypeAlias[]>(decamelizeKeys([objectWithTypeAlias]));
