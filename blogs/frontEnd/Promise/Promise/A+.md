---
title: Promise/A+规范
date: 2020-04-05
# sidebar: 'auto'
categories:
  - frontEnd
tags:
  - promise
  - js
---

Promise 表示一个异步操作的的最终结果。与 Promise 最主要的交互方法是通过将函数传入它的 then 方法从而获取得 Promise 最终的值或 Promise 最终最拒绝（reject）的原因

## 术语

- promise 是一个包含了兼容 promise 规范 then 方法的对象或函数，
- thenable 是一个包含了 then 方法的对象或函数。
- value 是任何 Javascript 值。 (包括 undefined, thenable, promise 等).
- exception 是由 throw 表达式抛出来的值。
- reason 是一个用于描述 Promise 被拒绝原因的值。

## 要求

### Promise 的状态

一个 Promise 必须处在其中之一的状态：**pending**、**fulfilled** 或 **rejected**

- 如果是 pending 状态，则 promise 可以转换到 fulfilled 或 rejected 状态
- 如果是 fulfilled 状态，则 promise 不能转换成任何其它状态。必须有一个值，且这个值不能被改变
- 如果是 rejected 状态,则 promise 不能转换成任何其它状态。必须有一个原因，且这个值不能被改变

“值不能被改变”指的是其 identity 不能被改变，而不是指其成员内容不能被改变

### then 方法

一个 Promise 必须提供一个 then 方法来获取其值或原因。 Promise 的 then 方法接受两个参数：

```
jspromise.then(onFulfilled, onRejected)
```

1. onFulfilled 和 onRejected 都是可选参数：

   - 如果 onFulfilled 不是一个函数，则忽略之。
   - 如果 onRejected 不是一个函数，则忽略之。

2. 如果 onFulfilled 是一个函数:

   - 它必须在 promise fulfilled 后调用，且 promise 的 value 为其第一个参数
   - 它不能在 promise fulfilled 前调用
   - 不能被多次调用

3. 如果 onRejected 是一个函数

   - 它必须在 promise rejected 后调用，且 promise 的 reason 为其第一个参数
   - 它不能在 promise rejected 前调用
   - 不能被多次调用

4. onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行
5. onFulfilled 和 onRejected 必须被当做函数调用 (i.e. 即函数体内的 this 为 undefined)
6. 对于一个 promise，它的 then 方法可以调用多次

   - 当 promise fulfilled 后，所有 onFulfilled 都必须按照其注册顺序执行
   - 当 promise rejected 后，所有 OnRejected 都必须按照其注册顺序执行

7. then 必须返回一个 promise [3.3]
   - 如果 onFulfilled 或 onRejected 返回了值 x, 则执行 Promise 解析流程[[Resolve]](promise2, x)
   - 如果 onFulfilled 或 onRejected 抛出了异常 e, 则 promise2 应当以 e 为 reason 被拒绝。
   - 如果 onFulfilled 不是一个函数且 promise1 已经 fulfilled，则 promise2 必须以 promise1 的值 fulfilled.
   - 如果 OnReject 不是一个函数且 promise1 已经 rejected, 则 promise2 必须以相同的 reason 被拒绝.

```
jspromise2 = promise1.then(onFulfilled, onRejected);
```

### 解析过程

Promise 解析过程 是以一个 promise 和一个值做为参数的抽象过程，可表示为[[Resolve]](promise, x). 过程如下：

1. 如果 promise 和 x 指向相同的值, 使用 TypeError 做为原因将 promise 拒绝。
2. 如果 x 是一个 promise, 采用其状态 [3.4]

   - 如果 x 是 pending 状态，promise 必须保持 pending 走到 x fulfilled 或 rejected
   - 如果 x 是 fulfilled 状态，将 x 的值用于 fulfill promise
   - 如果 x 是 rejected 状态, 将 x 的原因用于 reject promise

3. 如果 x 是一个对象或一个函数
   - 将 then 赋为 x.then. [3.5]
   - 如果在取 x.then 值时抛出了异常，则以这个异常做为原因将 promise 拒绝
   - 如果 then 是一个函数， 以 x 为 this 调用 then 函数， 且第一个参数是 resolvePromise，第二个参数是 rejectPromise，且：
     - 当 resolvePromise 被以 y 为参数调用, 执行 [[Resolve]](promise, y).
     - 当 rejectPromise 被以 r 为参数调用, 则以 r 为原因将 promise 拒绝。
     - 如果 resolvePromise 和 rejectPromise 都被调用了，或者被调用了多次，则只第一次有效，后面的忽略。
     - 如果在调用 then 时抛出了异常，则:
       - 如果 resolvePromise 或 rejectPromise 已经被调用了，则忽略它
       - 否则, 以 e 为 reason 将 promise 拒绝
4. 如果 x 不是对象也不是函数，则以 x 为值 fulfill promise。
