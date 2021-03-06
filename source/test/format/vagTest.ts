﻿///<reference path="../global.d.ts" />
export function ref() { } // Workaround to allow typescript to include this module

import _vag = require('../../src/format/vag');

describe('vag', () => {
	var vagData: Uint8Array;
	var vagDataExpected: Uint8Array;

	before(() => {
		return downloadFileAsync('data/samples/sample.vag').then((data) => {
			vagData = new Uint8Array(data);
			return downloadFileAsync('data/samples/sample.vag.expected').then((data) => {
				vagDataExpected = new Uint8Array(data);
			});
		});
	});

	it('should load fine', () => {
		var vag = new _vag.VagSoundSource(Stream.fromUint8Array(vagData), 0);
		var expected = Stream.fromUint8Array(vagDataExpected)
		vag.reset();
		expected.position = 0;
		var resultArray:number[] = [];
		var expectedArray:number[] = [];
		while (vag.hasMore) {
			var sample = vag.getNextSample();
			var expectedLeft = expected.readInt16();
			var expectedRight = expected.readInt16();
			//console.log(n, sample.left, "=", expectedLeft);

			resultArray.push(sample.left, sample.right);
			expectedArray.push(expectedLeft, expectedRight);
		}
		assert.equal(resultArray.join(','), expectedArray.join(','));
	});
});
