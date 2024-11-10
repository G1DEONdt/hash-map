function HashMap() {

    let buckets = [];
    let capacity = 16;
    let loadFactor = 0.75;

    instantiateBucket();

    function instantiateBucket() {
        for (let i = 0; i < capacity; i++) {
            buckets.push(null);
        };
    };

    function print(){
        console.log(buckets);
    }

    function expand(){
        capacity *= 2;
        let newBucket = [];
        for (let i = 0; i < capacity; i++) {
            newBucket.push(null);
        };

        for (let i = 0; i < buckets.length; i++){
            if (buckets[i]) {
                const node = {key: buckets[i].key, value: buckets[i].value, next: null};
                const index = hash(node.key);
                newBucket[index] = node;
            }
        };

        buckets = newBucket;
    }

    function hash(key){
        // KEY ONLY STRING
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % capacity;
    };

    function set(key, value) {
        // takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten or we can say that we update the key’s value (e.g. Carlos is our key but it is called twice: once with value I am the old value., and once with value I am the new value.. From the logic stated above, Carlos should contain only the latter value).
        const node = {key: key, value: value, next: null};
        const index = hash(key);
        if (length() >= capacity * loadFactor) {
            expand();
        }
        // comapare keys against bucket to check if its a duplicate -- if duplicate -> override
        if (buckets[index]){
            // console.log("Bucket full! Scrapping...");
        } else {
            buckets[index] = node;
        }
    };

    function get(key) {
        // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
        const index = hash(key);
        return (buckets[index])
    };

    function has(key) {
        // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

        if (get(key))
            return true;
        else
            return false;

    };

    function remove(key) {
        // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
        if (has(key)){
            let index = hash(key);
            buckets[index] = null;
            return true;
        } else {
            return false;
        }
    };

    function length() {
        // returns the number of stored keys in the hash map. 

        // Needs expansion once adding linked list
        let length = 0;
        buckets.forEach((item) => {if(item) length++});

        return length;
    };

    function clear() {
        buckets = [];
        capacity = 16;
        instantiateBucket();
    };

    function keys() {
        // returns an array containing all the keys inside the hash map.
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item.key);
            };
        })
        return arr;
    };

    function values() {
        // returns an array containing all the values.
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item.value);
            };
        })
        return arr;
    };

    function entries() {
        // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item);
            };
        })
        return arr;
    }
    //expand buckets based on load factor 0.75 - 1.00
    return { print, hash, set, get, has, remove, length, clear, keys, values, entries };
}


const test = HashMap();
test.set("jinx", 69);
console.log(test.get("jinx"));


// test.hash('apple', 'red');
// test.set('banana', 'yellow');
// test.set('carrot', 'orange');
// test.set('dog', 'brown');
// test.set('elephant', 'gray');
// test.set('frog', 'green');
// test.set('grape', 'purple');
// test.set('hat', 'black');
// test.set('ice cream', 'white');
// test.set('jacket', 'blue');
// test.set('kite', 'pink');
// test.set('lion', 'golden');


// console.log(test.entries());
console.log("end");