"use strict";
var UserRole;
(function (UserRole) {
  UserRole["ADMIN"] = "admin";
  UserRole["USER"] = "user";
  UserRole["GUEST"] = "guest";
})(UserRole || (UserRole = {}));
const usuario = {
  name: "Sofia",
  age: 28,
  email: "sofik@mail.com",
  active: true,
  address: {
    street: "Calle 1",
    city: "Ciudad 1",
  },
  role: UserRole.ADMIN,
};

console.log(usuario);
