const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let goodsListData = Mock.mock({
  'data|10-20': [
    {
      id: '@id',
      'name|+1': [
        '欧达数码相机',
        '摄像头',
        '小米笔记本',
        '数码相机',
        '笔记本电脑',
        '无线传呼机',
        'ThinkPad笔记本',
      ],
      'username|+1': ['llwwlql', 'ldj', 'hlk1135'],
      'price|+1': [890, 360, 3200, 580, 690, 230, 1600],
      realPrice() {
        return this.price - 2
      },
      startTime: '2017-05-15',
      endTime: '@now',
      desc: '@cparagraph',
      commetNum: /\d{1,2}/,
      image() {
        return Mock.Random.image(
          '500x500',
          Mock.Random.color(),
          '#757575',
          'png',
          'G'
        )
      },
    },
  ],
})

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

let database = goodsListData.data

module.exports = {
  [`GET ${apiPrefix}/goods`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database

    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'endTime') {
              console.log([...other[key], item.endTime])
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return (
              String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) >
              -1
            )
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },

  [`GET ${apiPrefix}/good/:id`](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/good/:id`](req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
