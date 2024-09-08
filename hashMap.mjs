import { Node, linkedList } from './linkedList.mjs'

function HashMap() {
  let hashMapSize = 16
  const loadFactor = 0.75;
  let buckets = new Array(hashMapSize);
  let totalEntries = 0;
  
  function treshold() {
    return hashMapSize * loadFactor
  }

  function incrementEntries() {
    totalEntries++;
  }

  function getBuckets() {
    return buckets;
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % (buckets.length - 1);
    }

    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);
    if (buckets[index] === undefined) {
      buckets[index] = linkedList();
    }
    buckets[index].append(key, value);
    incrementEntries();

    // double the hashMap size when it exceeds
    // a certain treshold
    if (totalEntries > parseInt(treshold())) {
      hashMapSize = hashMapSize * 2
      buckets.length = hashMapSize;
    }
  }

  function get(key) {
    const index = hash(key);
    return buckets[index].getValue(key)
  }

  function remove(key) {
    const index = hash(key);
    if (buckets[index] !== undefined) {
      // if there is only one node in a bucket, set that bucket to undefined
      if (Object.values(buckets[index].getHead().value)[0] === key && buckets[index].size() === 1) {
        buckets[index] = undefined;
        return true
      } else if (buckets[index].size() > 1) {
        let currentNode = buckets[index].getHead();
        let leftPointer;
        
        // if there exists a collision in a bucket
        // and the key we want to remove is in the first node
        // remove the first node
        if (Object.values(currentNode.value)[0] === key) {
          currentNode = currentNode.next;
          buckets[index].setHead(currentNode);
          return true
        } else {
          // otherwise, keep updating current node to the next node
          // and left pointer to the previous node
          // until current node has the key we are looking for
          while (Object.values(currentNode.value)[0] !== key) {
            leftPointer = currentNode;
            currentNode = currentNode.next;
        }
        // set the left pointer's next to the next value of
        // node that contains the key we are looking for
        leftPointer.next = currentNode.next;
        return true
        }
      }
    } else {
      return false
    } 
  }

  function length() {
    return totalEntries;
  }
  
  function clear() {
    buckets = new Array(hashMapSize);
    totalEntries = 0;
  }

  function keys() {
    let keysArr = []
    for (let i = 0; i < hashMapSize; i++) {
      if (buckets[i] !== undefined) {
        let bucket = buckets[i].getHead()
        while (bucket !== null) {
          keysArr.push(Object.values(bucket.value)[0]);
          bucket = bucket.next;
        }
      }
    }
    return keysArr
  }
  
  function values() {
    let valuesArr = []
    for (let i = 0; i < hashMapSize; i++) {
      if (buckets[i] !== undefined) {
        let bucket = buckets[i].getHead()
        while (bucket !== null) {
          valuesArr.push(Object.values(bucket.value)[1]);
          bucket = bucket.next;
        }
      }
    }
    return valuesArr
  }

  function entries() {
    let entries = [];
    for (let i = 0; i < hashMapSize; i++) {
      if (buckets[i] !== undefined) {
        let bucket = buckets[i].getHead();
        while (bucket !== null) {
          entries.push([Object.values(bucket.value)[0], Object.values(bucket.value)[1]]);
          bucket = bucket.next;
        }
      }
    }
    return entries
  }

  return { getBuckets, hash, set, get, remove, length, clear, keys, values, entries }
}

const hashMap = HashMap();
hashMap.set('apple', 'red')
hashMap.set('banana', 'yellow')
hashMap.set('carrot', 'orange')
hashMap.set('dog', 'brown')
hashMap.set('elephant', 'gray')
hashMap.set('frog', 'green')
hashMap.set('grape', 'purple')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'white')
hashMap.set('jacket', 'blue')
hashMap.set('kite', 'pink')
hashMap.set('lion', 'golden')
hashMap.set('patrick', 'star')
console.log(hashMap.entries());