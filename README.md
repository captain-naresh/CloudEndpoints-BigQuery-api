# GoogleCloud - Swagger Endpoints & BigQuery


This service given an Swagger 2.0 endpoint interface to manage people data in Google Cloud Datasets(BisQuery).

Service is hosted at URL = https://captain-xxx.appspot.com/

It is developed in NodeJS10 and is deployed on Google App Engine Standard.

The service offers following two functionalities thru the Swagger APIs-


1. Create a new people(customer) entity.
2. Retrieve an existing people(customer) entity using people(customer) id

Interface details of both APIs are described below.

Both API calls are query based.

POST https://captain-xxx.appspot.com/peopleDetails
Request Header: Content-Type: application/json

Request Payload in query parameter:

{

"Id":2;
"Name":"Naresh";
"Age":30;
"Blood_Group":"o++";
"Gender":"M";
"Department":"IT";
"DOB":"1989-05-29";
"Marital_Status":true

}

curl -X POST "https://captain-xxx.appspot.com/peopleDetails?Id=2&Name=Naresh&Age=30&Blood_Group=o%2B&Gender=M&Department=IT&DOB=1989-05-29&Marital_Status=true" -H  "accept: application/json"


Response body

[
  {
    "Id": "2",
    "Name": "Naresh",
    "Age": "30",
    "Blood_Group": "o+",
    "Gender": "M",
    "Department": "IT",
    "DOB": "1989-05-29",
    "Marital_Status": "true"
  }
]

Response headers

 alt-svc: quic=":443"; ma=2592000; v="46,43,39"  cache-control: no-cache  connection: close  content-encoding: gzip  content-length: 132  content-type: application/json; charset=utf-8  date: Mon, 22 Jul 2019 09:59:14 GMT  etag: W/"84-TZgqD2x7yhPOG74jKsXRMU1Coys"  expires: -1  server: nginx/1.14.0 + Phusion Passenger 5.3.4  status: 200 OK  vary: Accept-Encoding  via: 1.1 google  x-powered-by: Express, Phusion Passenger 5.3.4 

Request duration

751 ms



How to use it -

API Interface url - https://captain-xxx.appspot.com/peopleDetails?Id=2&Name=Naresh&Age=30&Blood_Group=o%2B&Gender=M&Department=IT&DOB=1989-05-29&Marital_Status=true
