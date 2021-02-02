/* globals bench suite set */
'use strict';
const decamelizeeKeysNpm = require('@puuuuudding/decamelize-keys');
const fixture = require('./fixture');
const decamelizeKeys = require('..');

suite('camelcaseKeys', () => {
	set('mintime', 1000);

	bench('npm', () => {
		decamelizeeKeysNpm(fixture, {deep: true});
	});

	bench('master', () => {
		decamelizeKeys(fixture, {deep: true});
	});
});
