/**
 * @Author : maxming
 * @Date   : 16/6/30
 */

'use strict';

var path = require('path');

module.exports = function (ret, conf, settings, opt) {
  if(!settings.tag instanceof Array){
    return false;
  }
  settings.tag.forEach(function (_tag){
    var reg = eval('/'+_tag+'=["\'](.*)["\']/ig');
    for(var key in ret.src){
      var file = ret.src[key];
      if(file.isHtmlLike){
        var content = file.getContent().replace(reg, function (match, p1, offset, string) {
          var _file = path.resolve(file.subdirname, p1);
          if(!ret.src[_file]){
            console.error( 'can\'t find [' + _file + '] in ' + key );
            return match;
          }
          var _url = ret.src[_file].getUrl();
          return _tag + '=\"' + _url + '\"';
        });
        file.setContent( content );
      }
    }
  })
}