import {functions} from 'nerio-js-utils'
let {parseUrl} = functions

const menus = [
  {
    path: '/dashboard',
    name: 'dashboard',
    display_name: '首页',
    icon: 'home',
  },
];

const Mock = require('mockjs')

Mock.mock('/user', {
  name: Mock.Random.cname(),
  avatar: 'https://picsum.photos/300/300?random'
})

Mock.mock('/navigation', function () {
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
    per_page     : perPage,
    current_page : page,
    last_page    : Math.round(total / perPage),
    next_page_url: null,
    prev_page_url: null,
    from         : from,
    to           : to,
  });

  return Mock.mock(template)
}

function url(u) {
  return new RegExp(`${process.env.API_BASE_URL}${u}`)
}
