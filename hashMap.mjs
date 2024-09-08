import { Node, linkedList } from './linkedList.mjs'

function HashMap() {
  let buckets = new Array(16);
  let totalEntries = 0;

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
  
  
  return { getBuckets, hash, set, get, remove, length }
}

const hashInstance = HashMap();
hashInstance.set('i', 'Kek');
hashInstance.set('Ulala', 'Ukelele');
hashInstance.set('ab', 'tatata');
hashInstance.set('Yawa', 'tatata');
console.log(hashInstance.length())