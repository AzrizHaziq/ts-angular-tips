## 1. Array loop function

* .forEach <!-- .element: class="fragment" -->
* .map <!-- .element: class="fragment" -->
* .filter <!-- .element: class="fragment" -->
* .some <!-- .element: class="fragment" -->
* .every <!-- .element: class="fragment" -->
* .find <!-- .element: class="fragment" -->
* etc <!-- .element: class="fragment" -->

------

<ul>
<li class='fragment'> Each of array built-ins function has its own purpose and do differently. </li>
<li class='fragment'> <p class='tag'>.forEach</p> is the most basic one since it just loop. </li>
</ul>

<span class='fragment'>

```ts [1-2|3-5|7]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

arr.forEach(i => {
  console.log(i)
})

// [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```
</span>

------

### Is it a right way?

<span class='fragment'>

```ts [1-2|4]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let temp = []

temp = arr.forEach(i => i * 2)
```

</span>

<ul>
<li class='fragment'>Not really since <p class='tag'>.forEach</p> does not return anything</li>
</ul>

------

### How about this?

<span class='fragment'>

```ts [1-2|4]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let temp = []

arr.forEach(i => temp.push(i * 2))
```
</span>

<ul>
<li class='fragment'>It's fine but there is a better approach</li>
</ul>

------

### Introducing <div class='tag fragment'>.map</div>

<span class='fragment'>

```ts [1|2]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const temp = arr.map(i => i * 2)
```
</span>

<ul>
<li class='fragment'>Reduce line of code to <b>1</b></li>
<li class='fragment'>We also avoid keep track of variables</li>
<li class='fragment'>While <span class='tag'>.forEach</span> does not return any value, <br/><span class='tag'>.map</span> return an array</li>
</ul>

------

### Same thing to <div class="tag">.filter</div>

<p class='fragment'>Instead of</p>  

<span class='fragment'>

```ts [1-2|4,8|5-7|10]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let isEven = []

arr.forEach(i => {
  if(i % 2 === 0) {
    isEven.push(i)
  }
})

// isEven: [2, 4, 6, 8, 10]
```
</span>

<p class='fragment'>Much better with</p>  

<span class='fragment'>

```ts [1|2]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const isEven = arr.filter(i => i % 2 === 0)
```
</span>

------

### There is one problem

* Just now all our example receive  <!-- .element: class="fragment" -->
  * array as input <!-- .element: class="fragment" -->
  * array as output <!-- .element: class="fragment" -->

------

####  what if we want <br/><div class='tag-2 lowercase my-3'>object/boolean/number/string/any</div><br/> as our output 

------

#### <div class="tag">.reduce</div>

* 3 key thing:  <!-- .element: class="fragment" -->
  * it need initial value <!-- .element: class="fragment" -->
  * acc is accumulation <!-- .element: class="fragment" -->
  * curr is current (current item in loop) <!-- .element: class="fragment" -->

------

Below we want to return as object with <div class="tag-2">isEven</div> and <div class="tag-2">isOdd</div>

<span class='fragment'>

```ts [1|12|5|6|8-11|14,15]
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  type output = { isEven: number[]; isOdd: number[];  }

  const { isEven, isOdd } = arr.reduce((acc: output, cur: number) => {
    const { isEven, isOdd } = acc;

    return cur % 2 === 0
      ? { ...acc, isEven: [...isEven, cur] }
      : { ...acc, isOdd: [...isOdd, cur] }

  }, { isEven: [], isOdd: [] });

  // isOdd: [1, 3, 5, 7, 9]
  // isEven: [2, 4, 6, 8, 10]
```
</span>

---

### 2. Angular

------

#### 2.1 calling a function inside template

<br>

<div class='tag-r fragment' data-fragment-index='2'>avoid!!</div>
<div class="fragment" data-fragment-index="1">

```html
<p>{{ format(number, '1.3') }}</p>
```
</div>

<br>
<br>
<br>

<div class='tag-s fragment' data-fragment-index='4'>better</div>
<div class="fragment" data-fragment-index="3">

```html
<p>{{ number | format: '1.3' }}</p>
```
</div>

------

#### 2.2 <span class="lowercase">*ngIf and *ngFor</span>

<div class='tag-r fragment' data-fragment-index='2'>avoid!!</div>
<div class="fragment" data-fragment-index='1'>

```html
 <div *ngIf="isLoading">
   <cad-spinner></cad-spinner>
 </div>
```
</div>

Because in actual dom it will be output like this <!-- .element: class="fragment" data-fragment-index="3" -->

<div class='fragment' data-fragment-index='3'>

```html
 <div>
   <cad-spinner></cad-spinner>
 </div>
```
</div>

This is better:  <!-- .element: class="fragment" data-fragment-index="4" -->
<div class="fragment" data-fragment-index='4'>

```html [1,3|2]
<ng-container *ngIf="isLoading">
 <cad-spinner></cad-spinner>
</ng-container>
```
</div>

------

The same should be applied with looping:

<div class="fragment">

```html
<ng-container *ngFor="let i of [12, 3, 4, 5]">
  ...
</ng-container>
```

</div>

------

### 2.3 Avoid deep nested html markup
<li class='text-left fragment'>for better readability and easy for in future refactoring</li>
<li class='text-left fragment'>prefer to use <span class="tag">ng-template</span></li>
<li class='text-left fragment'>use <span class="tag">[ngTemplateOutlet]</span> to pass template </li>
<li class='text-left fragment'>use <span class="tag">[ngTemplateOutletContext]</span> to pass data</li>

------

```html [3,13|4,12|5,11|6,10|7,9|8]
  <table>
    <tr>
      <ng-container *ngFor="let i of [1, 2, 3, 4]">
        <td>
          <div>
            <div>
              <p>
                <span>this is nested doom structure {{ i }}</span>
              </p>
            </div>
          </div>
        </td>
      </ng-container>
    </tr>
  </table>
```

------

```html [3-10|14-22]
  <table>
    <tr>
      <ng-container *ngFor="let i of [1, 2, 3, 4]">
        <td>
          <ng-container
            [ngTemplateOutlet]="innerComponentTemplate"
            [ngTemplateOutletContext]="{ index: i }"
          ></ng-container>
        </td>
      </ng-container>
    </tr>
  </table>

  <ng-template let-i="index">
    <div>
      <div>
        <p>
          <span>this is nested doom structure {{ i }}</span>
        </p>
      </div>
    </div>
  </ng-template>
```

------

### 2.4 New way to unsub rxjs

<li class='text-left fragment'>It's much easier to cancel subscription </li>
<li class='text-left fragment'>Previously you had to give a name and assign to <span class='tag'>this.addSubscription</span></li>

<div class="fragment">

```ts [3|4|6,7|9-12]
import { takeUntil, take } from 'rxjs';

export class BaseComponent implements OnDestroy {
  private isAlive$ = new Subject<void>();

  protected once = (source) => source.pipe(take(1));
  protected unsubscribeOnDestroy = (source) => source.pipe(takeUntil(this.isAlive$));

  public ngOnDestroy() {
    this.isAlive$.next();
    this.isAlive$.complete();
  }
}
```
</div>

------

## How to use it:

<div class="fragment">Previous</div>
<div class="fragment">

 ```ts [1,2|4]
const first$ = this.myService.getCurrentUser().subscribe();
const second$ = this.myService.getCurrentUser().subscribe();

this.addSubscription(first$, second$);
 ```
</div>

<span class="fragment">New</span>
<div class="fragment">

```ts [1,4,6,9|2,3,7,8]
this.myService.getCurrentUser().pipe(
 // wait until component destroy and then close subs
 this.unsubscribeOnDestroy
).subscribe();

this.myService.getCurrentUser().pipe(
 // only run once and then close subs
 this.once
).subscribe();
```
</div>

---

### 3. Move Pure function outside class

## Pure function in class
* If you had a pure function in your class.
* It is safe to move that function to outside of class.
* It's much easier to test a single function than a whole 300++ loc.

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

---

### 3. Code consistency

<img alt='prettier-demo'
     src="https://github.com/prettier/prettier-logo/raw/master/images/prettier-banner-dark.png" 
/>

---

## Q & A
* https://github.com/AzrizHaziq/ts-angular-tips
* https://ts-angular-tips.vercel.app
