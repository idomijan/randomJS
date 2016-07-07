Function.prototype.getParamNames = function () {
  var fnStr = this.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
  return fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || [];
}

function defaultArguments(func, params) {
  if (!params) return func;
  var paramNames = func.getParamNames();
  var f = function () {
    var args = [].slice.call(arguments);
    return func.apply(null,args.concat(paramNames.map(function(p) {return params[p];}).slice(args.length)));
  };
  f.getParamNames = function () { return paramNames; };
  return f;
}