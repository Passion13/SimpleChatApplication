"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(http, router, authenticate) {
        this.http = http;
        this.router = router;
        this.authenticate = authenticate;
        this.getEmployees();
    }
    EmployeeComponent.prototype.getEmployees = function () {
        var _this = this;
        this.authenticate.getEmployees()
            .subscribe(function (data) {
           
            _this.employees = data;
        });
    };
    return EmployeeComponent;
}());
exports.EmployeeComponent = EmployeeComponent;
//# sourceMappingURL=employee.component.js.map
