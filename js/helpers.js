define([], function() {
  var exp = {};

  // Callback takes parameters (index, value) or (key, value)
  exp.each = function(object, callback, context) {

    // TODO Not working for Grid
    var boundCallback;
    if (context) {
      // PhantomJS doesn't support func.bind
      // callback = callback.bind(context);
      boundCallback = function() {
        callback.call(context);
      };
    } else {
      boundCallback = callback;
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
        boundCallback(i, object[i]);
      }

    // If object with keys but no length ('{..}')
    } else if (typeof keys.length === 'number') {

      for (i = 0; i < keys.length; i++) {
        boundCallback(keys[i], object[keys[i]]);
      }

    } else {
      throw 'not an object or array and func. should never make it this far';
    }

    return object;
  };

  return exp;
});
