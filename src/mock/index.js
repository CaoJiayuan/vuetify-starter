import {functions} from 'nerio-js-utils'
let {parseUrl, fastRandom} = functions

const menus = [
  {
    path: '/dashboard',
    name: 'dashboard',
    display_name: '首页',
    icon: 'home',
  },
];

const Mock = require('mockjs')

Mock.mock(url('/users'), options => {
  return paginator({
    name : () => Mock.Random.cname(),
    avatar: () => imageUrl(),
    created_at: () => Mock.Random.datetime()
  }, options)
})

Mock.mock(url('/user'), {
  name: Mock.Random.cname(),
  avatar: 'https://picsum.photos/300/300?random'
})

Mock.mock(url('/navigation'), function () {
  return menus;
})

function paginator(templateItem, options, total = 100) {
  let {query} = parseUrl(options.url);

  let page = query.page || 1, perPage = query.per_page || 15

  let template  = {};
  let from = (page - 1) * perPage + 1
  let to = page * perPage
  templateItem['id|+1'] = from;

  template[`data|${perPage}`] = [
    templateItem
  ];

  Object.assign(template, {
    total        : total,
    per_page     : parseInt(perPage),
    current_page : parseInt(page),
    last_page    : Math.round(total / perPage),
    next_page_url: null,
    prev_page_url: null,
    from         : from,
    to           : to,
  });

  return Mock.mock(template)
}

function imageUrl (width = 640, height = 640, seed) {

  seed = seed || fastRandom()

  return `https://picsum.photos/${width}/${height}?random=${seed}`
}

function url(u) {
  return new RegExp(`^${process.env.API_BASE_URL}${u}`)
}
