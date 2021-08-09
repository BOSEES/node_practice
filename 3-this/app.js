function hello() {
  console.log(this);
}

hello();

class A {
  constructor(num) {
    this.num= num;
  }

  memberFunciton() {
    console.log("class -----");
    console.log(this);
    console.log(this === global);
  }
}

const a = new A(1);
a.memberFunciton();

console.log(this);