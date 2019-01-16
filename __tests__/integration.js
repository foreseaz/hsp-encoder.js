const debug = require('debug')('hsp')
const { serializeMsgPack, deserializeMsgPack } = require('../msgpack')

let obj = {
	Amount: 1,
	Version: 2,
	TestName: 'foo'
}

let objPack = Buffer.from(serializeMsgPack(obj), 'hex')
debug('object\n', objPack)

// test different typed array
let arr = [1]
let arrPack = Buffer.from(serializeMsgPack(arr), 'hex')
debug('original array\n', arrPack)
debug(deserializeMsgPack(arrPack))

let uintArr = new Uint8Array(3)
uintArr[0] = 1

let uintArrPack = Buffer.from(serializeMsgPack(uintArr), 'hex')
debug('Unit8Array\n', uintArrPack)
debug(deserializeMsgPack(uintArrPack))

