import {functions} from 'nerio-js-utils'
let {parseUrl, fastRandom} = functions
import {API_BASE_URL} from "@/constant";

import Mock from 'mockjs'
const xhr = createNativeXMLHttpRequest()

Mock.XHR.prototype.upload = xhr.upload

Mock.mock(url('/users'), options => {
  return paginator({
    name : () => Mock.Random.name(),
    avatar: () => imageUrl(),
    created_at: () => Mock.Random.datetime()
  }, options)
})

Mock.mock(url('/logout'), options => {
  return {
    code : 200,
    message: 'success'
  }
})

Mock.mock(url('/upload'), options => {
  return {
    url : 'https://picsum.photos/300/300?random',
    type: 'image/jpeg',
    filename: 'foobar'
  }
})

Mock.mock(url('/attachments/batch'), options => {
  return [
    {
      url : 'https://picsum.photos/300/300?random',
      type: 'image/jpeg',
      filename: 'foobar',
    }
  ]
})

Mock.mock(url('/user'), {
  name: Mock.Random.cname(),
  avatar: 'https://picsum.photos/300/300?random',
  email: () => Mock.Random.email()
})
Mock.mock(url('/attachments'), options =>{
  let data = paginator({
    url : () => imageUrl(),
    type: 'image/jpeg',
    filename: () => Mock.Random.name(),
  }, options);
  return data
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
  return new RegExp(`${API_BASE_URL}${u}`)
}


function createNativeXMLHttpRequest() {
  var isLocal = function() {
    var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
    var rurl = /^([\w.+-]+:)(?:\/\/([^/?#:]*)(?::(\d+)|)|)/
    var ajaxLocation = location.href
    var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
    return rlocalProtocol.test(ajaxLocParts[1])
  }()

  return window.ActiveXObject ?
    (!isLocal && createStandardXHR() || createActiveXHR()) : createStandardXHR()

  function createStandardXHR() {
    try {
      return new window._XMLHttpRequest();
    } catch (e) {}
  }

  function createActiveXHR() {
    try {
      return new window._ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}
