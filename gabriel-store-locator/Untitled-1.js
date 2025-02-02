(['jquery', 'mage/mage', 'jquery/jquery.cookie'], function($) {
    'use strict';
    var CookieHelper = function() {
        this.defaults = {
            expires: null,
            path: '/',
            domain: null,
            secure: false,
            lifetime: null,
            samesite: 'lax'
        };
        function lifetimeToExpires(options, defaults) {
            var expires, lifetime;
            lifetime = options.lifetime || defaults.lifetime;
            if (lifetime && lifetime > 0) {
                expires = options.expires || new Date();
                return new Date(expires.getTime() + lifetime * 1000);
            }
            return null;
        }
        this.set = function(name, value, options) {
            var expires, path, domain, secure, samesite;
            options = $.extend({}, this.defaults, options || {});
            expires = lifetimeToExpires(options, this.defaults) || options.expires;
            path = options.path;
            domain = options.domain;
            secure = options.secure;
            samesite = options.samesite;
            document.cookie = name + '=' + encodeURIComponent(value) + (expires ? '; expires=' + expires.toUTCString() : '') + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '') + '; samesite=' + (samesite ? samesite : 'lax');
        }
        ;
        this.get = function(name) {
            var arg = name + '='
              , aLength = arg.length
              , cookie = document.cookie
              , cLength = cookie.length
              , i = 0
              , j = 0;
            while (i < cLength) {
                j = i + aLength;
                if (cookie.substring(i, j) === arg) {
                    return this.getCookieVal(j);
                }
                i = cookie.indexOf(' ', i) + 1;
                if (i === 0) {
                    break;
                }
            }
            return null;
        }
        ;
        this.clear = function(name) {
            if (this.get(name)) {
                this.set(name, '', {
                    expires: new Date('Jan 01 1970 00:00:01 GMT')
                });
            }
        }
        ;
        this.getCookieVal = function(offset) {
            var cookie = document.cookie
              , endstr = cookie.indexOf(';', offset);
            if (endstr === -1) {
                endstr = cookie.length;
            }
            return decodeURIComponent(cookie.substring(offset, endstr));
        }
        ;
        return this;
    };
    $.extend(true, $, {
        mage: {
            cookies: new CookieHelper()
        }
    });
    return function(pageOptions) {
        $.extend($.mage.cookies.defaults, pageOptions);
        $.extend($.cookie.defaults, $.mage.cookies.defaults);
    }
    ;
});
