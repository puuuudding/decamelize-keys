# decamelize-keys

This project was forked from [`camelcase-keys`](https://github.com/sindresorhus/camelcase-keys) and converted to do the opposite. This project will keep updated with `camelcase-keys`.

> Convert object keys to lowercased one using [`decamelize`](https://github.com/sindresorhus/decamelize).

## Install

```
$ npm install @puuuudding/decamelize-keys
```

## Usage

```js
const decamelizeKeys = require('decamelize-keys');

// Convert an object
decamelizeKeys({fooBar: true});
//=> {'foo_bar': true}

// Convert an array of objects
decamelizeKeys([{fooBar: true}, {barFoo: false}]);
//=> [{'foo_bar': true}, {'bar_foo': false}]

decamelizeKeys({fooBar: true, nested: {unicornRainbow: true}}, {deep: true});
//=> {'foo_bar': true, nested: {'unicorn_rainbow': true}}

// Use custom separator
decamelizeKeys({fooBar: true, nested: {unicornRainbow: true}}, {deep: true, separator: '-'});
//=> {'foo-bar': true, nested: {'unicorn-rainbow': true}}
```

## API

### decamelizeKeys(input, options?)

#### input

Type: `object | object[]`

An object or array of objects to decamelize.

#### options

Type: `object`

##### exclude

Type: `Array<string | RegExp>`\
Default: `[]`

Exclude keys from being camel-cased.

##### stopPaths

Type: `string[]`\
Default: `[]`

Exclude children at the given object paths in dot-notation from being decamelize. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

```js
decamelizeKeys({
	aB: 1,
	aC: {
		cD: 1,
		cE: {
			eF: 1
		}
	}
}, {
	deep: true,
	stopPaths: [
		'aC.cE'
	]
})
/*
{
	a_b: 1,
	a_c: {
		c_d: 1,
		c_e: {
			eF: 1
		}
	}
}
*/
```

##### deep

Type: `boolean`\
Default: `false`

Recurse nested objects and objects in arrays.

##### separator

Type: `string`\
Default: `'_'`

Character or string inserted to separate words in key.

```js
const decamelize = require('decamelize');

decamelize('unicornRainbow');
//=> 'unicorn_rainbow'

decamelize('unicornRainbow', {separator: '-'});
//=> 'unicorn-rainbow'
```

##### preserveConsecutiveUppercase

Type: `boolean`\
Default: `false`

Preserve sequences of uppercase characters.

```js
const decamelize = require('decamelize');

decamelize('testGUILabel');
//=> 'test_gui_label'

decamelize('testGUILabel', {preserveConsecutiveUppercase: true});
//=> 'test_GUI_label'
```
## Related

See [`camelcase-keys`](https://github.com/sindresorhus/camelcase-keys) for the inverse.
