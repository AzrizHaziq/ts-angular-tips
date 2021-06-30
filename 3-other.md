### 3. Move Pure function outside class

<ul class='text-left'>
    <li class='fragment'>If you had a pure function in your class.</li>
    <li class='fragment'>It is safe to move that function to outside of class.</li>
    <li class='fragment'>It's much easier to test a single function than a whole 300++ loc.</li>
</ul>

------

```ts [1,16|2,3|5-7|9-11|13-15]
export class User {
  age: number = 0;
  fullName: string = '';

  setFullName(firstname: string, lastname: string): void {
    this.fullName = `${firstname} ${lastname}`;
  }

  calculateAge() {
    this.age = this.findDiffYear(this.age);
  }

  private findDiffYear(dob: Date): number {
    return new Date() - dob
  }
}
```

<li class='text-left fragment'>Move <span class='tag' style='text-transform: unset'>findDiffYear</span> outside of User class</li>
<li class='text-left fragment'>If we need to unit test the <span class='tag'  style='text-transform: unset'>findDiffYear</span> is much easier</li>

------

```ts
export const findDiffYear = (dob: Date): number =>  {
  return new Date() - dob
}
```

```ts [10]
export class User {
  age: number = 0;
  fullName: string = '';

  setFullName(firstname: string, lastname: string): void {
    this.fullName = `${firstname} ${lastname}`;
  }

  calculateAge() {
    this.age = findDiffYear(this.age);
  }
}
```

------

```ts [1,2,5,6|3,4]
describe('findDiffYear', () => {
  it('should return 20', () => {
    const res = findDiffYear(41);
    expect(res).to.be.eq(20);
  })
})
```
