const promise =(fn=()=>{})=>{
   
  return new Promise((resolve,reject)=>{
      fn(resolve,reject)
  })

}

const merge = Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export {
    promise ,
    merge
};
