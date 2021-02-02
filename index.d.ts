declare namespace decamelizeKeys {
	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		readonly deep?: boolean;

		/**
		Exclude keys from being decamelized.

		@default []
		*/
		readonly exclude?: ReadonlyArray<string | RegExp>;

		/**
		Exclude children at the given object paths in dot-notation from being decamelize. For example, with an object like `{a: {b: '🦄'}}`, the object path to reach the unicorn is `'a.b'`.

		@default []

		@example
		```
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
		}),
		// {
		// 	a_b: 1,
		// 	a_c: {
		// 		c_d: 1,
		// 		c_e: {
		// 			eF: 1
		// 		}
		// 	}
		// }
		```
		*/
		readonly stopPaths?: readonly string[];

		/**
		Character or string inserted to separate words in key.
		@default '_'
		@example
		```
		import decamelize = require('decamelize');
		decamelize('unicornRainbow');
		//=> 'unicorn_rainbow'
		decamelize('unicornRainbow', {separator: '-'});
		//=> 'unicorn-rainbow'
		```
		 */
		readonly separator?: string;

		/**
		Preserve sequences of uppercase characters.
		@default false
		@example
		```
		import decamelize = require('decamelize');
		decamelize('testGUILabel');
		//=> 'test_gui_label'
		decamelize('testGUILabel', {preserveConsecutiveUppercase: true});
		//=> 'test_GUI_label'
		```
		 */
		readonly preserveConsecutiveUppercase?: boolean;
	}
}

/**
Convert object keys to lowercased one using [`decamelize`](https://github.com/sindresorhus/decamelize).

@param input - Object or array of objects to decamelize.

@example
```
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
*/
declare function decamelizeKeys<T extends ReadonlyArray<Record<string, any>>>(
	input: T,
	options?: decamelizeKeys.Options,
): T;

declare function decamelizeKeys<T extends Record<string, any>>(
	input: T,
	options?: decamelizeKeys.Options,
): T;

export = decamelizeKeys;
