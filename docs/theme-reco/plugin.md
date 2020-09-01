---
title: plugin
date: 2020-05-28
---

##### 1. 快速重置表单元素 unset

- 例如原始的 button 按钮重置需要设置好几个属性

```
button {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  outline: none;
  padding: 0;
}
```

等价于

```
button { all: unset; }
```

##### 2.文本省略号显示

- 文本省略号是非常常见的需求，而省略号展示又通常分为俩种情况折行和不折行。不折行：
-

```
div {
  white-space:nowrap;/* 规定文本是否折行 */
  overflow: hidden;/* 规定超出内容宽度的元素隐藏 */
  text-overflow: ellipsis;
  /* 规定超出的内容文本省略号显示，通常跟上面的属性连用，因为没有上面的属性不会触发超出规定的内容 */
}
```

- 折行(能主动控制行数,这里设置的超出 4 行显示省略号)：

```
div {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 将对象作为弹性伸缩盒子模型显示 */
  -webkit-line-clamp: 4; /* 控制最多显示几行 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
}
```

##### 3.改变盒模型的宽高计算方式

- 默认：盒模型的宽高 = 内容宽 + padding + border
- 理想: 盒模型直接设置的宽为最终宽，不会随 padding，border 改变

```
box-sizing:border-box;
```

##### 4.改变滚动条样式

- 首先要明确滚动条的组成分为三个部分，滚动条容器 scrollbar, 滚筒条轨道 scrollbar-track,滚动条滑块 scrollbar-thumb。然而我写这篇文字的时候尝试了一下轨道的内容可以直接在容器设置，也就是没有清晰的区分容器和轨道之间的区别

```
div::-webkit-scrollbar {
  /* 这里的宽是指竖向滚动条的宽，高是指横向滚动条的高*/
  width: 16px;
  height: 16px;
  background: pink;
}
div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background:
  linear-gradient(red,orange);
}
```

##### 5.最后一个 div 不显示下边框

```
div:not(:last-child) /* 匹配非最后一个 div 元素的 div 元素 */
```

##### 6.设置文本俩端对齐

```
div {  width: 100px;  padding: 0 10px;  background: pink;  margin-bottom: 10px;  text-align-last:justify; /* 这是关键属性 */}

<div>账号</div><div>密码设置</div><div>手机号</div>
```

效果图：![image](https://user-gold-cdn.xitu.io/2019/8/31/16ce84e624c9de71?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

##### 7.规定图像展示方式

- 显示图片的时候会遇到这种问题，对面返回的图片宽高比例是不一样的。但是设置的容器大小是一样的，这个时候需要让图片保持比例最大填充容器。

```
object-fit：fill | contain | cover | none | scale-down
```

##### 8.padding-top 方式实现响应式背景图片

- 当用图片设置背景图的时候 内容较多的时候 超出的部分没有背景，这时利用 padding-top，使用百分比的形式
- 但是仅仅对图片高度和宽度缩放还不够，我们还必须添加 background-size:cover,使用这个属性让北京元素铺满，但是 IE8 及以下不支持该属性，因此为了兼容 IE 下面的浏览器，我们还需要再加一个属性 background-position:center;同时我们也要保证图片的宽度最大等于父容器的宽度；因此下面的 HTML 代码如下：

```
<h3>使用padding-top实现响应性图片(图片的宽度是474px,高度是宽度的75%)</h3>
 <div class="column">
       <div class="figure"></div>
  </div>

.column{
    max-width: 474px;
 }
 .figure {
     padding-top:75%;
     background:url("http://img3.duitang.com/uploads/item/201604/13/20160413131244_yxuwU.jpeg") no-repeat;
     background-size:cover;
     background-position:center;
    }

```
