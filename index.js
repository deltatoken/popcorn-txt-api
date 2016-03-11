var Q = require('q');
var dns = require('dns');

module.exports = function(addr) {
    if (typeof addr !== 'string')
        return Q(addr);
    if (! addr.match(/^dnstxt/i))
        return Q(addr);

    var d = Q.defer();
    dns.resolveTxt(addr, function (err, addresses) {
        if (err) return d.reject(err);

        return d.resolve(addresses[0][0]);
    });

    return d.promise;
}
