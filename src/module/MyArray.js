class MyArray {
  static splitPage(arr, pageSize) {
    let result = [];
    let len = arr.length;
    let pageCount = Math.ceil(len / pageSize);
    for (let i = 0; i < pageCount; i++) {
      let start = i * pageSize;
      let end = start + pageSize;
      result.push(arr.slice(start, end));
    }
    return result;
  }
}

export default MyArray;
