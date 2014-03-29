﻿describe('cso', () => {
	var testCsoArrayBuffer: ArrayBuffer;

	before((done) => {
		downloadFileAsync('samples/test.cso').then((data) => {
			testCsoArrayBuffer = data;
			done();
		});
	});

	it('should load fine', (done) => {
		format.cso.Cso.fromStreamAsync(MemoryAsyncStream.fromArrayBuffer(testCsoArrayBuffer)).then(cso => {
			//cso.readChunkAsync(0x10 * 0x800 - 10, 0x800).then(data => {
			return cso.readChunkAsync(0x10 * 0x800 - 10, 0x800).then(data => {
				var stream = Stream.fromArrayBuffer(data);
				stream.skip(10);
				var CD0001 = stream.readStringz(6);
				assert.equal(CD0001, '\u0001CD001');
				done();
			});
            //console.log(cso);
		}).catch(e => {
			//console.error(e);
			setImmediate(() => { throw (e); });
		});
	});

	it('should work with iso', (done) => {
		format.cso.Cso.fromStreamAsync(MemoryAsyncStream.fromArrayBuffer(testCsoArrayBuffer)).then(cso => {
			return format.iso.Iso.fromStreamAsync(cso).then(iso => {
				assert.equal(
					JSON.stringify(iso.children.slice(0, 4).map(node => node.path)),
					JSON.stringify(["path", "path/0", "path/1", "path/2"])
				);
				done();
			});
		}).catch(e => {
			//console.error(e);
			setImmediate(() => { throw (e); });
		});
	});

});
