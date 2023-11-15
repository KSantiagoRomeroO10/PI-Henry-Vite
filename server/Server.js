//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express')

const server = express()
const PORT = 3000
const router = require('./Source/Routes/Index');
const cors = require('cors');

const synchronizeDB = require('./Source/Models/SynchronizeDB');

server.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}))

server.use(express.json())

server.use(router);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`)
  synchronizeDB()
})