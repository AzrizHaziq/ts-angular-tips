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
<div class='text-left'>
  <li class='text-left fragment'>for better readability and easy for in future refactoring</li>
  <li class='text-left fragment'>prefer to use <span class="tag">ng-template</span></li>
  <li class='text-left fragment'>use <span class="tag">[ngTemplateOutlet]</span> to pass template </li>
  <li class='text-left fragment'>use <span class="tag">[ngTemplateOutletContext]</span> to pass data</li>
</div>

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
