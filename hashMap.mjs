import { Node, linkedList } from './linkedList.mjs'

function HashMap() {
  let buckets = new Array(16);

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
    console.log(buckets[index].getHead());
  }
  
  
  return { getBuckets, hash, set }
}

const hashInstance = HashMap();
hashInstance.set('Yawa', 'Kaayoka');
hashInstance.set('Yawa', 'Geatay haha');
hashInstance.set('Yawa', 'kaloka!');