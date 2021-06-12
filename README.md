# DotnetCoreAPI_5.0
DotnetCoreApı Study

# JavaScript Map Object
the map object holds key-value pairs and remember the original insertion order of keys.any value (both objects and primitive values) may be used as either a key or value -> map nesnesi, anahtar/değer çiftlerini tutar ve anahtarların orijinal ekleme sırasını hatırlar. herhangi bir değer (hem nesneler hem de ilkel değerler) anahtar veya değer olarak kullanılabilir
# instance Map Methods
Map.prototype.clear(); -> Removes all key-value pairs from the Map object.
Map.prototype.delete(key); -> returns true if an element in the Map object existed and has ben removed, or false if the element does not exis. Map.prototype.has(key) will return false afterwards.
Map.prototype.get(key); -> Returns the values associated to the key, or undifined if there is none,
Map.prototype.has(key); -> Returns a boolean asserting whether a values has been associated to the key in the Map object or not.
Map.prototype.set(key, value); -> Sets the value for the key in the Map object. Returns the Map object.