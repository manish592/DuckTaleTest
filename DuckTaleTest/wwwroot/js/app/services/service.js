var app = angular.module("ticket_purchase");

app.factory("CategoryService", function ($http, $q) {

    return {
        GetCategories: function (cb) {
			$http.get("/api/Category?IsOnline=true").then(function (r) {
                cb(r.data)
            }).catch(function (err) { debugger });
        },
        SubmittedTicket: function (data) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: "/api/Ticket/SaveTicket",
                data: data
            }).then(function (r) {
                deferred.resolve(r.data);
            }).catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        }
        , GetUserSelectedTickets: function () {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/Tickets/GetUserSelectedTickets" }).then(function (r) {
                deferred.resolve(r.data);
            }).catch(function (reason) {
                deferred.reject(reason);
            });
            return deferred.promise;
        }
        , GetPackages: function (cb) {
            $http.get("/api/Package/GetPackage").then(function (r) {
                cb(r.data)
            }).catch(function (err) { debugger });
        }, GetItems: function (date, selectedItems, cb) {
            $http({ method: "GET", url: "/api/Item/GetItems", params: { Date: date, SelectedItems: selectedItems } })
                .then(function (r) {
                    cb(r.data)
                }).catch(function (err) { debugger });
        }, GetTicketDetail: function (cb) {
            $http.get("/api/Ticket/GetBooking").then(function (r) {
                cb(r.data)
            }).catch(function (err) { debugger });
        }
        , GetPackagesPrice: function (PackageId, CategoryId,Date, callback) {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/api/Package/GetPackagePrice", params: { PackageId: PackageId, CategoryId: CategoryId, Date: Date } }).
                then(function (r) {
                    GetTicketDetail
                    callback(r)
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
        , GetTimming: function (PackageFK, strDate, callback) {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/api/Package/GetTimming", params: { PackageFK: PackageFK, strDate: strDate } }).
                then(function (r) {
                    callback(r.data)
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }, GetItemTimming: function (itemFK, strDate, callback) {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/api/Item/GetTimming", params: { ItemFK: itemFK, StrDate: strDate } }).
                then(function (r) {
                    callback(r.data)
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }, GetTimming: function (PackageFK, strDate, callback) {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/api/Package/GetTimming", params: { PackageFK: PackageFK, strDate: strDate } }).
                then(function (r) {
                    callback(r.data)
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
        , GetItemUser: function (ItemFK, callback) {
            var deferred = $q.defer();
            $http({ method: "GET", url: "/api/Item/GetItemUser", params: { ItemFK: ItemFK} }).
                then(function (r) {
                    callback(r.data)
                }).catch(function (reason) {
                    deferred.reject(reason);
                });
            return deferred.promise;
        }
    }
});

app.factory("MemberService", function ($http, $q) {
    return {
        GetMemberCategories: function (cb) {
            $http.get("/api/Category/GetMemberShipCategory").then(function (r) {
                cb(r.data)
            }).catch(function (err) { debugger });
        }
    }
});