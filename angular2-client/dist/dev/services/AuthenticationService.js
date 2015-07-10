var http_1 = require("services/http");
var AuthenticationService = (function () {
    function AuthenticationService() {
        console.log("AuthenticationService constructed with loggedIn [" + this.isLoggedIn() + "] based on localStorage");
    }
    AuthenticationService.prototype.isLoggedIn = function () {
        var token = localStorage.getItem('jwt');
        if (token && !this.isExpired(token)) {
            return true;
        }
        return false;
    };
    AuthenticationService.prototype.logIn = function (token) {
        console.log("AuthenticationService logIn (set jwt in localStorage)");
        localStorage.setItem("jwt", token);
    };
    AuthenticationService.prototype.logOut = function () {
        console.log("AuthenticationService logOut (remove jwt from localStorage)");
        localStorage.removeItem('jwt');
    };
    AuthenticationService.prototype.isExpired = function (token) {
        return (Date.now() > this.getExpireTimestamp(token));
    };
    AuthenticationService.prototype.getExpireTimestamp = function (token) {
        var tokenArr = token.split(".");
        var decodedMeta = this.base64Decode(tokenArr[1]);
        var jsonMeta = JSON.parse(decodedMeta);
        return jsonMeta.exp * 1000;
    };
    AuthenticationService.prototype.getNewToken = function (username, password) {
        return http_1.$http.get("http://localhost:8080/api/newToken?username=" + username + "&password=" + password, null);
    };
    AuthenticationService.prototype.base64Decode = function (s) {
        var e = {}, i, b = 0, c, x, l = 0, a, r = '', w = String.fromCharCode, L = s.length;
        var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (i = 0; i < 64; i++) {
            e[A.charAt(i)] = i;
        }
        for (x = 0; x < L; x++) {
            c = e[s.charAt(x)];
            b = (b << 6) + c;
            l += 6;
            while (l >= 8) {
                ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a));
            }
        }
        return r;
    };
    return AuthenticationService;
})();
exports.AuthenticationService = AuthenticationService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL0F1dGhlbnRpY2F0aW9uU2VydmljZS50cyJdLCJuYW1lcyI6WyJBdXRoZW50aWNhdGlvblNlcnZpY2UiLCJBdXRoZW50aWNhdGlvblNlcnZpY2UuY29uc3RydWN0b3IiLCJBdXRoZW50aWNhdGlvblNlcnZpY2UuaXNMb2dnZWRJbiIsIkF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dJbiIsIkF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dPdXQiLCJBdXRoZW50aWNhdGlvblNlcnZpY2UuaXNFeHBpcmVkIiwiQXV0aGVudGljYXRpb25TZXJ2aWNlLmdldEV4cGlyZVRpbWVzdGFtcCIsIkF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXROZXdUb2tlbiIsIkF1dGhlbnRpY2F0aW9uU2VydmljZS5iYXNlNjREZWNvZGUiXSwibWFwcGluZ3MiOiJBQUFBLHFCQUFvQixlQUFlLENBQUMsQ0FBQTtBQUVwQztJQUVJQTtRQUNJQyxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxtREFBbURBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEdBQUdBLHlCQUF5QkEsQ0FBQ0EsQ0FBQ0E7SUFDckhBLENBQUNBO0lBRURELDBDQUFVQSxHQUFWQTtRQUNJRSxJQUFJQSxLQUFLQSxHQUFHQSxZQUFZQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUN4Q0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDakNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtJQUNqQkEsQ0FBQ0E7SUFFREYscUNBQUtBLEdBQUxBLFVBQU1BLEtBQVVBO1FBQ1pHLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHVEQUF1REEsQ0FBQ0EsQ0FBQ0E7UUFDckVBLFlBQVlBLENBQUNBLE9BQU9BLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBO0lBQ3ZDQSxDQUFDQTtJQUVESCxzQ0FBTUEsR0FBTkE7UUFDSUksT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsNkRBQTZEQSxDQUFDQSxDQUFDQTtRQUMzRUEsWUFBWUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDbkNBLENBQUNBO0lBRURKLHlDQUFTQSxHQUFUQSxVQUFVQSxLQUFhQTtRQUVuQkssTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUN6REEsQ0FBQ0E7SUFFREwsa0RBQWtCQSxHQUFsQkEsVUFBbUJBLEtBQWFBO1FBQzVCTSxJQUFJQSxRQUFRQSxHQUFHQSxLQUFLQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNoQ0EsSUFBSUEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDakRBLElBQUlBLFFBQVFBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1FBQ3ZDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQTtJQUMvQkEsQ0FBQ0E7SUFNRE4sMkNBQVdBLEdBQVhBLFVBQVlBLFFBQWdCQSxFQUFFQSxRQUFnQkE7UUFDMUNPLE1BQU1BLENBQUNBLFlBQUtBLENBQUNBLEdBQUdBLENBQUNBLDhDQUE4Q0EsR0FBR0EsUUFBUUEsR0FBR0EsWUFBWUEsR0FBR0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDaEhBLENBQUNBO0lBRU9QLDRDQUFZQSxHQUFwQkEsVUFBcUJBLENBQVNBO1FBQzFCUSxJQUFJQSxDQUFDQSxHQUFDQSxFQUFFQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxHQUFDQSxFQUFFQSxFQUFDQSxDQUFDQSxHQUFDQSxNQUFNQSxDQUFDQSxZQUFZQSxFQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUMvREEsSUFBSUEsQ0FBQ0EsR0FBQ0Esa0VBQWtFQSxDQUFDQTtRQUN6RUEsR0FBR0EsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsRUFBQ0EsQ0FBQ0EsRUFBRUEsRUFBQ0EsQ0FBQ0E7WUFBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFBQUEsQ0FBQ0E7UUFDcENBLEdBQUdBLENBQUFBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUNBLENBQUNBLEdBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUVBLEVBQUNBLENBQUNBO1lBQ2JBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQUFBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLElBQUVBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQUFBLENBQUNBLElBQUVBLENBQUNBLENBQUNBO1lBQ2pDQSxPQUFNQSxDQUFDQSxJQUFFQSxDQUFDQSxFQUFDQSxDQUFDQTtnQkFBQUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsS0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBQUEsQ0FBQ0E7UUFDL0RBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0lBQ2JBLENBQUNBO0lBQ0xSLDRCQUFDQTtBQUFEQSxDQXREQSxJQXNEQztBQXREWSw2QkFBcUIsd0JBc0RqQyxDQUFBIiwiZmlsZSI6InNlcnZpY2VzL0F1dGhlbnRpY2F0aW9uU2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7JGh0dHB9IGZyb20gXCJzZXJ2aWNlcy9odHRwXCI7XG5cbmV4cG9ydCBjbGFzcyBBdXRoZW50aWNhdGlvblNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0aGVudGljYXRpb25TZXJ2aWNlIGNvbnN0cnVjdGVkIHdpdGggbG9nZ2VkSW4gW1wiICsgdGhpcy5pc0xvZ2dlZEluKCkgKyBcIl0gYmFzZWQgb24gbG9jYWxTdG9yYWdlXCIpO1xuICAgIH1cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIGxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdqd3QnKTtcbiAgICAgICAgaWYodG9rZW4gJiYgIXRoaXMuaXNFeHBpcmVkKHRva2VuKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxvZ0luKHRva2VuOiBhbnkpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGlvblNlcnZpY2UgbG9nSW4gKHNldCBqd3QgaW4gbG9jYWxTdG9yYWdlKVwiKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJqd3RcIiwgdG9rZW4pO1xuICAgIH1cblxuICAgIGxvZ091dCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRoZW50aWNhdGlvblNlcnZpY2UgbG9nT3V0IChyZW1vdmUgand0IGZyb20gbG9jYWxTdG9yYWdlKVwiKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2p3dCcpO1xuICAgIH1cblxuICAgIGlzRXhwaXJlZCh0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjb21wYXJlIHRpbWVzdGFtcHM6IFwiICsgRGF0ZS5ub3coKSArIFwiIGFuZCBcIiArIHRoaXMuZ2V0RXhwaXJlVGltZXN0YW1wKHRva2VuKSk7XG4gICAgICAgIHJldHVybiAoRGF0ZS5ub3coKSA+IHRoaXMuZ2V0RXhwaXJlVGltZXN0YW1wKHRva2VuKSk7XG4gICAgfVxuXG4gICAgZ2V0RXhwaXJlVGltZXN0YW1wKHRva2VuOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBsZXQgdG9rZW5BcnIgPSB0b2tlbi5zcGxpdChcIi5cIik7XG4gICAgICAgIGxldCBkZWNvZGVkTWV0YSA9IHRoaXMuYmFzZTY0RGVjb2RlKHRva2VuQXJyWzFdKTtcbiAgICAgICAgbGV0IGpzb25NZXRhID0gSlNPTi5wYXJzZShkZWNvZGVkTWV0YSk7XG4gICAgICAgIHJldHVybiBqc29uTWV0YS5leHAgKiAxMDAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogQ2FsbCBSRVNUIGFwaSB0byByZXF1ZXN0IGEgSldUIHRva2VuXG4gICAgKiBAcmV0dXJuIFByb21pc2Ugb2JqZWN0XG4gICAgKi9cbiAgICBnZXROZXdUb2tlbih1c2VybmFtZTogU3RyaW5nLCBwYXNzd29yZDogU3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvbmV3VG9rZW4/dXNlcm5hbWU9XCIgKyB1c2VybmFtZSArIFwiJnBhc3N3b3JkPVwiICsgcGFzc3dvcmQsIG51bGwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYmFzZTY0RGVjb2RlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHZhciBlPXt9LGksYj0wLGMseCxsPTAsYSxyPScnLHc9U3RyaW5nLmZyb21DaGFyQ29kZSxMPXMubGVuZ3RoO1xuICAgICAgICB2YXIgQT1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIjtcbiAgICAgICAgZm9yKGk9MDtpPDY0O2krKyl7ZVtBLmNoYXJBdChpKV09aTt9XG4gICAgICAgIGZvcih4PTA7eDxMO3grKyl7XG4gICAgICAgICAgICBjPWVbcy5jaGFyQXQoeCldO2I9KGI8PDYpK2M7bCs9NjtcbiAgICAgICAgICAgIHdoaWxlKGw+PTgpeygoYT0oYj4+PihsLT04KSkmMHhmZil8fCh4PChMLTIpKSkmJihyKz13KGEpKTt9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9