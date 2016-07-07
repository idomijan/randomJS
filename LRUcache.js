function LRUCache(capacity, init) {
  var self = this, counter = 0, access = {}, values = {};
  
  function get(key) { return function() { access[key] = ++counter; return values[key]; } }
  function set(key) { return function(value) { access[key] = ++counter; values[key] = value; }}
  function remove(key) { delete values[key]; delete access[key]; return delete self[key]; }
  function findOldest() { return Object.keys(self).sort(function(a,b) { return access[a] > access[b]; })[0]; }
  function updateCapacity(c) { capacity = c; while (self.size > capacity) self.delete(findOldest()); }
  function cache(key, value) {
    if (self.size >= capacity) remove(findOldest());
    values[key] = value; access[key] = ++counter;
    Object.defineProperty(self, key, { enumerable : true, configurable: true, get : get(key), set : set(key) });
    return self;
  }
  
  Object.defineProperty(this, "size", { get : function() { return Object.keys(self).length; }});
  Object.defineProperty(this, "delete", { value : remove});
  Object.defineProperty(this, "capacity", { get : function() { return capacity; }, set : updateCapacity });
  Object.defineProperty(this, "cache", { value : cache });
  
  Object.keys(init||{}).forEach(function(k) { self.cache(k, init[k]); });
}