# fis3-prepackager-replace-attr

a prepackager plugin for fis3
在 prepackager 阶段，把文件进行unicode编码

## usage


**install**

```bash
npm install fis3-prepackager-replace-attr --save-dev
```

**use**

`请在需要 replace-attr 的文件上加上 isHtmlLike 标记`

```javascript
  // css 类型文件需要加 isCssLike 标记
  fis.match('**.html', {
    isHtmlLike : true
  });
  
  fis.match('::package', {
    prepackager: fis.plugin('replace-attr', {
      attr : ['data-img', 'data-url', 'data-path']
    }, 'append')
  });
```

#### Before

```html
  <a data-url='./html/demo.html'>demo</a>
  <img data-img='./images/demo.png'>
```


#### After

```html
  <a data-url='http://xxx.com/xxxxx/html/demo.html'>demo</a> // release url
  <img data-img='http://xxx.com/xxxxx/images/demo.png'>// release url
```
