const fi = (function () {
  return {
    libraryMethod: function () {
      return "Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0";
    },
    // Calls Alert on each element passed an returns original collection unmodified
    each: function (collection, callback) {
      let newCol =
        collection instanceof Array ? collection : Object.values(collection);
      for (let element of newCol) {
        callback(element);
      }
      return collection;
    },
    // Successfully returns a correctly populated array from modified object values
    //does not modify original
    map: function (collection, callback) {
      if (!(collection instanceof Array))
        collection = Object.values(collection);
      let newCol2 = [];
      for (let element of collection) {
        newCol2.push(callback(element));
      }
      return newCol2;
    },
    // Returns the correct reduced value "when/when not" passed an initial value
    reduce: function (array = [], callback = () => {}, acc) {
      let collection = array.slice(0);
      if (!acc) {
        acc = collection[0];
        collection = collection.slice(1);
      }
      for (let i = 0; i < collection.length; i++) {
        acc = callback(acc, collection[i], collection);
      }
      return acc;
    },
    // Returns the value if found returns undefined if the value is not present
    // Does not traverse the whole array if the value is found early
    find: function (collection, predicate) {
      for (let element of collection) {
        if (predicate(element)) return element;
      }

      return undefined;
    },
    // Correctly filters for values that the callback evaluates as true
    filter: function (collection, predicate) {
      let newCol3 = [];

      for (let element of collection) {
        if (predicate(element)) newCol3.push(element);
      }

      return newCol3;
    },
    // Correctly returns the size of the collection when an array is passed (amount of keys)
    size: function (collection) {
      if (collection instanceof Array) {
        return collection.length;
      } else {
        return Object.keys(collection).length;
      }
    },
    // Returns the first n elements of the collection when the second optional argument (n) is provided
    first: function (array, n) {
      return n ? array.slice(0, n) : array[0];
    },
    // Returns the last n elements of the collection when the second optional argument (n) is provided
    last: function (array, n) {
      return n ? array.slice(-n) : array[array.length - 1];
    },
    // Returns a copy of the Array with all falsy values removed.
    compact: function (array) {
      let newArray = [];

      for (let element of array) {
        if (element) newArray.push(element);
      }

      return newArray;
    },
    // Correctly sorts arrays of integers and arrays of strings with non-standard sort Does not modify
    sortBy: function (array, callback) {
      let newArray = [...array];

      return newArray.sort(function (a, b) {
        return callback(a) - callback(b);
      });
    },
    // Correctly flattens a ludicrously nested array
    flatten: function (arr, str, newArr = []) {
      if (!Array.isArray(arr)) return newArr.push(arr);

      if (str === true) {
        for (let element of arr)
          Array.isArray(element)
            ? this.unpack(newArr, element)
            : newArr.push(element);
      } else {
        for (let element of arr) {
          this.flatten(element, false, newArr);
        }
      }

      return newArr;
    },
    // Correctly flattens a single level when a second argument of "true" is passed
    unpack: function (newArray, arr) {
      for (let element of arr) {
        newArray.push(element);
      }
    },
    // Retrieves all the names of the object's own enumerable properties does not modify the original object
    keys: function (object) {
      const keys = [];

      for (let element in object) {
        keys.push(element);
      }

      return keys;
    },
    // Retrieves all the values of the object's own properties
    values: function (object) {
      const values = [];

      for (let element in object) {
        values.push(object[element]);
      }

      return values;
    },
    // Removes duplicate values from an array when an iteratee is applied
    uniq: function (arr, isSorted, callback) {
      if (isSorted === true) {
        return fi.uniqSorted(arr, callback);
      } else if (!callback) {
        return Array.from(new Set(arr));
      } else {
        const modifiedArr = new Set();
        const uniqElements = new Set();

        for (let element of arr) {
          const modifiedElement = callback(element);

          if (!modifiedArr.has(modifiedElement)) {
            modifiedArr.add(modifiedElement);
            uniqElements.add(element);
          }
        }
        return Array.from(uniqElements);
      }
    },

    // Returns a sorted collection of the names of every method in an object
    functions: function (object) {
      const fucNames = [];

      for (let element in object) {
        if (typeof object[element] === "function") {
          fucNames.push(element);
        }
      }

      return fucNames.sort();
    },
  };
})();

fi.libraryMethod();
