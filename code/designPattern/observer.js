// 主题 保存状态，状态变化之后触发所有观察者对象

class Subject {
  constructor() {
    this.state = 0;
    this.observers = [];
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }

  //   通知所有观察者
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }

  //   添加观察者
  attach(observer) {
    this.observers.push(observer);
  }
}

// 观察者
class Observer {}
