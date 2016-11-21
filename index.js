/**
 * @Author : maxming
 * @Date   : 16/6/30
 */

'use strict';

var path = require('path');

module.exports = function (ret, conf, settings, opt) {
  if(!settings.attr instanceof Array){
    return false;
  }
  settings.attr.forEach(function (_attr){
    var reg = new RegExp(_attr+'=["\']([^"\'{}!~`\^]+)["\']', 'ig');
    for(var key in ret.src){
      var file = ret.src[key];
      if(file.isHtmlLike){
        var content = file.getContent().replace(reg, function (match, p1, offset, string) {
          if(/\/\//ig.test(p1)){
            return match;
          }
          var _file = path.resolve(file.subdirname, p1);
          if(!ret.src[_file]){
            console.error( 'can\'t find [' + _file + '] in ' + key );
            return match;
          }
          // 加到 fis.links 里面
          file.addLink( _file );

          // 如果设置相对路径产出
          var relative = {
            target: ret.src[_file],
            file: file
          };
          fis.emit('plugin:relative:fetch', relative);

          var _url = '';
          if(relative.ret){
            _url = relative.ret;
          }else{
            _url = ret.src[_file].getUrl();
          }

          return _attr + '=\"' + _url + '\"';
        });
        file.setContent( content );
      }
    }
  })
};