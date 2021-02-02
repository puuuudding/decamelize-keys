import test from 'ava';
import decamelizeKeys from '.';

test('main', t => {
	t.true(decamelizeKeys({fooBar: true}).foo_bar);
});

test('exclude option', t => {
	t.true(decamelizeKeys({'--': true}, {exclude: ['--']})['--']);
	t.deepEqual(decamelizeKeys({fooBar: true}, {exclude: [/^f/]}), {fooBar: true});
});

test('deep option', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {one_two: false, arr: [{three_four: true}]}}
	);
});

test('stopPaths option', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, stopPaths: ['obj']}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}
	);

	t.deepEqual(
		decamelizeKeys({fooBar: true, obj: {oneTwo: false, arr: [{threeFour: true}]}}, {deep: true, stopPaths: ['obj.arr']}),
		// eslint-disable-next-line camelcase
		{foo_bar: true, obj: {one_two: false, arr: [{threeFour: true}]}}
	);

	t.deepEqual(
		decamelizeKeys({qWE: [{fooBar: 1}, {oneTwo: 2}, {fooBar: 3, oneTwo: 4}]}, {deep: true, stopPaths: ['qWE.fooBar']}),
		// eslint-disable-next-line camelcase
		{q_we: [{foo_bar: 1}, {one_two: 2}, {foo_bar: 3, one_two: 4}]}
	);

	t.deepEqual(
		decamelizeKeys({aB: 1, aC: {cD: 1, cE: {eF: 1}}}, {deep: true, stopPaths: ['aC.cE']}),
		// eslint-disable-next-line camelcase
		{a_b: 1, a_c: {c_d: 1, c_e: {eF: 1}}}
	);
});

test('separator option', t => {
	t.true(decamelizeKeys({fooBar: true}, {separator: '-'})['foo-bar']);
});

test('preserve consecutive uppercase option', t => {
	t.true(decamelizeKeys({testGUILabel: true}, {preserveConsecutiveUppercase: true}).test_GUI_label);
	t.true(decamelizeKeys({testGUILabel: true}, {preserveConsecutiveUppercase: false}).test_gui_label);
});

test('separator and preserve consecutive uppercase', t => {
	t.true(decamelizeKeys({testGUILabel: true}, {separator: '-', preserveConsecutiveUppercase: true})['test-GUI-label']);
});

test('separator, preserve consecutive uppercase and deep options', t => {
	t.deepEqual(
		decamelizeKeys({fooBar: 1, nested: {testGUILabel: true}}, {deep: true, separator: '-', preserveConsecutiveUppercase: true}),
		{'foo-bar': 1, nested: {'test-GUI-label': true}}
	);
});

test('handles nested arrays', t => {
	t.deepEqual(
		decamelizeKeys({qWE: [['a', 'b']]}, {deep: true}),
		// eslint-disable-next-line camelcase
		{q_we: [['a', 'b']]}
	);
});

test('accepts an array of objects', t => {
	t.deepEqual(
		decamelizeKeys([{fooBar: true}, {barFoo: false}]),
		// eslint-disable-next-line camelcase
		[{foo_bar: true}, {bar_foo: false}]
	);
});

test('handle array of non-objects', t => {
	const input = ['name 1', 'name 2'];
	t.deepEqual(
		decamelizeKeys(input),
		input
	);
});

test('handle array of non-objects with `deep` option', t => {
	const input = ['name 1', 'name 2'];
	t.deepEqual(
		decamelizeKeys(input, {deep: true}),
		input
	);
});
