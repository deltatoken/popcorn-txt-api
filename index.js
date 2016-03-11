var Q = require('q');
var dns = require('dns');
var debug = require('debug')('popcorn:dnstxt')

module.exports = function(addr) {
    if (typeof addr !== 'string')
        return Q(addr);
    if (! addr.match(/^dnstxt/i))
        return Q(addr);

    debug ('processing', addr);
    addr.replace(/^dnstxt:\/\//, '');

    var d = Q.defer();
    dns.resolveTxt(addr, function (err, addresses) {
        if (err) return d.reject(err);
        if (!addresses || !addresses.length
            || !addresses[0] || !addresses[0].length)
            return d.reject (addresses)
        return d.resolve(addresses[0][0]);
    });

    return d.promise;
}
