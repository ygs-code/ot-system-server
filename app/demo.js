"use strict";
exports.__esModule = true;
function greeter(person) {
    return  'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user = { firstName: 'Jane', lastName: 'User' };
exports["default"] = greeter;
