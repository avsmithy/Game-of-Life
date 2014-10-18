define([], function() {
  var exp = {};

  // Polyfill .bind in PhantomJS, from MDN
  /* jshint ignore:start */
  if(!Function.prototype.bind){Function.prototype.bind=function(e){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};r.prototype=this.prototype;i.prototype=new r;return i}}
  /* jshint ignore:end */

  // Callback takes parameters (index, value) or (key, value)
  exp.each = function(object, callback, context) {

    if (context) {
      callback = callback.bind(context);
    }

    var keys, i;
    try {
      keys = Object.keys(object);
    } catch(err) {
      throw 'not an object or array';
    }

    // If an array type object
    if (typeof object.length === 'number') {

      for (i = 0; i < object.length; i++) {
        callback(i, object[i]);
      }

    // If object with keys but no length ('{..}')
    } else if (typeof keys.length === 'number') {

      for (i = 0; i < keys.length; i++) {
        callback(keys[i], object[keys[i]]);
      }

    } else {
      throw 'not an object or array and func. should never make it this far';
    }

    return object;
  };

  return exp;
});
