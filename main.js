function HashMap() {

    let buckets = [];
    let capacity = 16;
    let loadFactor = 0.75;

    // instantiateBucket();

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
                const node = {key: buckets[i].key, value: buckets[i].value, next: buckets[i].next};
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
        const node = {key: key, value: value, next: null};
        const index = hash(key);
        if (length() >= capacity * loadFactor) {
            expand();
        }
        
        if (buckets[index]){
            let currentNode = buckets[index];

            if (currentNode.key == node.key) {
                currentNode.value = node.value;
                return;
            }

            while (currentNode.next) {
                if (currentNode.key == node.key) {
                    console.log("same");
                    currentNode.value = node.value;
                    return;
                } else {
                    currentNode = currentNode.next;
                }
            }
            currentNode.next = node;
        } else {
            buckets[index] = node;
        }
    };

    function get(key) {
        const index = hash(key);
        return (buckets[index])
    };

    function has(key) {
        if (get(key))
            return true;
        else
            return false;

    };

    function remove(key) {
        if (has(key)){
            let index = hash(key);
            buckets[index] = null;
            return true;
        } else {
            return false;
        }
    };

    function length() {
        let length = 0;
        buckets.forEach((item) => {
            if(item){
                let currentNode = item;
                while (currentNode.next){
                    currentNode = currentNode.next;
                    length++;
                };
                length++;
            }
                 
        });

        return length;
    };

    function clear() {
        buckets = [];
        capacity = 16;
        instantiateBucket();
    };

    function keys() {
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item.key);
            };
        })
        return arr;
    };

    function values() {
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item.value);
            };
        })
        return arr;
    };

    function entries() {
        let arr = [];
        buckets.forEach((item) => {
            if (item) {
                arr.push(item);
            };
        })
        return arr;
    }
    return { print, hash, set, get, has, remove, length, clear, keys, values, entries };
}


const test = HashMap();

test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.print();

console.log("end");