class A {
    foo() {
        this.b = 'hello';
    }

    constructor() {
        this.c = "bye";
    }
}

const a = new A();

console.log(a.c);
a.foo();
console.log(a.b);

