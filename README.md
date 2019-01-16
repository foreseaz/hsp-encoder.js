# hashstablepack.js

This is a [HashStablePack](https://github.com/CovenantSQL/HashStablePack/blob/master/spec.md) codec written in JavaScript ported from ygoe's well-written [msgpack.js](https://github.com/ygoe/msgpack.js). Because HashStablePack adds the content deterministic feature to MessagePack, and this js lib aims to support the js code generated, so a new repo is setup instead of fork from the original repo.

## MessagePack

MessagePack is an efficient binary serialisation format. It lets you exchange data among multiple languages like JSON. But it’s faster and smaller. Small integers are encoded into a single byte, and typical short strings require only one extra byte in addition to the strings themselves.

## Size

This codec is very lightweight. The source code has around **480 lines**, the minified file is below 6.5 kB and can be GZip-compressed to **2.2 kB**.

## Performance

The file msgpack-tests.html contains some tests and a benchmark function that compares this library with [msgpack-lite](https://github.com/kawanet/msgpack-lite). Here are the results, in milliseconds (lower is better). All tests done on an Intel Core i7-3770 and Windows 10.

Function           | Chrome 70 |      | Firefox 63 |      | Edge 16 |      | IE 11  | &nbsp;
:------------------|----------:|-----:|-----------:|-----:|--------:|-----:|-------:|-----:
serializeMsgPack   |    722 ms | +10% |    1181 ms | −45% | 2739 ms | +50% | 2550 ms|  −3%
msgpack.encode     |    659 ms |      |    2138 ms |      | 1829 ms |      | 2617 ms|
deserializeMsgPack |    647 ms | +11% |     773 ms |  −3% |  816 ms | −49% |  634 ms| −66%
msgpack.decode     |    582 ms |      |     801 ms |      | 1601 ms |      | 1870 ms|

The numbers show that this library is comparable with msgpack-lite. In Chrome it’s only 10% slower. But serializing in Firefox and deserializing in Microsoft browsers is twice as fast.

## Usage

The source file contains two public functions: `serializeMsgPack` and `deserializeMsgPack`. The first can be called with any data and returns the encoded bytes. The second works in reverse, taking the encoded bytes and returning the runtime value.

Here’s a simple example:

```js
// Define some data to encode
var sourceData = {
    number: 123,
    number2: -0.129,
    text: "Abc with Üñıçôðé and ユニコード",
    flag: true,
    list: [ 1, 2, 3 ],
    obj: { a: 1, b: "2", c: false, d: { a: 0, b: -1 } },
    time: Date.now()
};

// Encode to byte array
var encodedBytes = serializeMsgPack(sourceData);

// Decode again
var decodedData = deserializeMsgPack(encodedBytes);
```

## Credit
Thanks ygoe's concise and well-written [msgpack.js](https://github.com/ygoe/msgpack.js)

## License
[MIT license](https://github.com/ygoe/msgpack.js/blob/master/LICENSE)
