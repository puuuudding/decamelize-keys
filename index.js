'use strict';
const mapObj = require('map-obj');
const decamelize = require('decamelize');
const QuickLru = require('quick-lru');

const has = (array, key) => array.some(x => {
	if (typeof x === 'string') {
		return x === key;
	}

	x.lastIndex = 0;
	return x.test(key);
});

const cache = new QuickLru({maxSize: 100000});

// Reproduces behavior from `map-obj`
const isObject = value =>
	typeof value === 'object' &&
	value !== null &&
	!(value instanceof RegExp) &&
	!(value instanceof Error) &&
	!(value instanceof Date);

const decamelizeConvert = (input, options) => {
	if (!isObject(input)) {
		return input;
	}

	options = {
		separator: '_',
		preserveConsecutiveUppercase: false,
		deep: false,
		...options
	};

	const {exclude, stopPaths, deep, separator, preserveConsecutiveUppercase} = options;

	const stopPathsSet = new Set(stopPaths);

	const makeMapper = parentPath => (key, value) => {
		if (deep && isObject(value)) {
			const path = parentPath === undefined ? key : `${parentPath}.${key}`;

			if (!stopPathsSet.has(path)) {
				value = mapObj(value, makeMapper(path));
			}
		}

		if (!(exclude && has(exclude, key))) {
			const cacheKey = `${key}${separator}${preserveConsecutiveUppercase ? 1 : 0}`;

			if (cache.has(cacheKey)) {
				key = cache.get(cacheKey);
			} else {
				const returnValue = decamelize(key, {separator, preserveConsecutiveUppercase});

				if (key.length < 100) { // Prevent abuse
					cache.set(cacheKey, returnValue);
				}

				key = returnValue;
			}
		}

		return [key, value];
	};

	return mapObj(input, makeMapper(undefined));
};

module.exports = (input, options) => {
	if (Array.isArray(input)) {
		return Object.keys(input).map(key => decamelizeConvert(input[key], options));
	}

	return decamelizeConvert(input, options);
};
