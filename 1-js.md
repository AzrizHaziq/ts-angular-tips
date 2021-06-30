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
