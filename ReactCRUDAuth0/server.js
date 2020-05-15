/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();
var router = express.Router();  
const port = process.env.SERVER_PORT || 3000;

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "build")));

var request = require("request");
var auth0token="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVTUWVXbkkwWk1KdW1ELWdjVDhfYiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uZy1sbmw0cy5hdXRoMC5jb20vIiwic3ViIjoiS29ReTZ1RVZyN1R5NkJlRWVGS0N4QURUejF0ZWlVYkZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LW5nLWxubDRzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTg5NTM0NzQwLCJleHAiOjE1ODk2MjExNDAsImF6cCI6IktvUXk2dUVWcjdUeTZCZUVlRktDeEFEVHoxdGVpVWJGIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.VROsvLTmwI3DHQ6oD9UnRXdLSTEyaemgThj06E015CTgzTlEFhj4S_cxbf-_hZlUqmYayu2tzAaQn9nDo2wFOlmMf5Ekmdl0Vb8faWTndE9YjKBXR5Yh6zcmJEFqQMS3NQ_pJwEBtVROu8RPFbsyoLwx-1bpLaC0zes50FTqln25I56YWtu111zNlpDjbuqUoyX9VVCjAuwo0Oh3Vc8QFIxcEVxVg2k2z5IrFQuILMcWzg_vQ0szv6f2RYbCT-tDRM6FGEJn2KXfnuWzoCgakQBomjAfpQb03gLvNkxCx2M4HryyrW5Fi4kQxwzBJ3iRvN6ohTFHJxn5v_paDli9wA"
var options = {
  method: 'GET',
  url: 'https://dev-ng-lnl4s.auth0.com/api/v2/users',
  headers: {authorization: auth0token}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
console.log('Read users');
  console.log(JSON.parse(body));
});



var options2 = {
  method: 'PATCH',
  url: 'https://dev-ng-lnl4s.auth0.com/api/v2/users/auth0|keerthu123',
  headers: {authorization: auth0token, 'content-type': 'application/json'},
  body: {"name": "keerthana"},
  json: true
};

request(options2, function (error, response, body) {
  if (error) throw new Error(error);

console.log('Update users');
  console.log(JSON.parse(JSON.stringify(body)));
});

var options3 = {
  method: 'POST',
  url: 'https://dev-ng-lnl4s.auth0.com/api/v2/users',
  headers: {authorization: auth0token, 'content-type': 'application/json'},
  body: {
    "email": "laxmi123@gmail.com",
    "name": "laxmi123",
    "nickname": "laxmi123",
    "user_id": "laxmi",
    "connection": "Username-Password-Authentication",
    "password": "LaxmIiii@123"
   },
  json: true
};




request(options3, function (error, response, body) {
  if (error) throw new Error(error);

console.log('Create users');
console.log(JSON.parse(JSON.stringify(body)));
});

var options4 = {
  method: 'DELETE',
  url: 'https://dev-ng-lnl4s.auth0.com/api/v2/users/auth0|laxmi123',
  headers: {authorization: auth0token, 'content-type': 'application/json'},
  json: true
};

request(options4, function (error, response, body) {
  if (error) throw new Error(error);

console.log('Delete users');
console.log(body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
