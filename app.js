/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START app]
'use strict';

// [START setup]
const express = require('express');
const bodyParser = require('body-parser');
const {Buffer} = require('safe-buffer');

const app = express();

app.set('case sensitive routing', true);
app.use(bodyParser.json());
// [END setup]

app.post('/peopleDetails', postPeopleDetails);
app.get('/peopleDetails', getPeopleDetails);
const {BigQuery} = require('@google-cloud/bigquery');
const prjtID='indigo-port-246408';
const bigqueryClient = new BigQuery({projectId: prjtID,keyFilename: 'indigo-port-246408-c3e0200f20a1.json'});
const datasetId = 'people_details';
const tableId = 'customer_data';
function postPeopleDetails(req, res){
    var aId= req.query.Id;
    var aName= req.query.Name;
    var aAge= req.query.Age;
    var aBlood_Group= req.query.Blood_Group;
    var aGender= req.query.Gender;
    var aDepartment= req.query.Department;
    var aDOB= req.query.DOB;
    var aMarital_Status= req.query.Marital_Status;

async function insertRowsAsStream() {
 const rows = [{Id: aId, Name: aName,Age: aAge, Blood_Group:aBlood_Group, Gender:aGender, Department:aDepartment, DOB:aDOB, Marital_Status:aMarital_Status}];
 console.log(rows);

    // Insert data into a table
 const table = bigqueryClient.dataset(datasetId).table(tableId);
 table.insert(rows).then(function(data) {
    var apiResponse = data[0];
  });
 
 console.log(`Inserted ${rows.length} rows`);
 
 res.status(200).set('Content-Type', 'application/json').json(rows).end();


}
    // [END bigquery_table_insert_rows]
  insertRowsAsStream();
// [END postPeopleDetails]
}

if (module === require.main) {
  // [START listen]
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  // [END listen]
}


function getPeopleDetails(req, res){
async function queryDestinationTable() {
    var tableId= req.query.Id;
    console.log(tableId);

const sqlQuery  = `SELECT *
      FROM \`indigo-port-246408.people_details.customer_data\`
      WHERE Id = @tableId
      LIMIT 100;`;

console.log(sqlQuery);


    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: sqlQuery,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
      params:{tableId:tableId},
    };
    const [rows] = await bigqueryClient.query(options);

  console.log('Rows:');
  rows.forEach(row => console.log(row));

  if(rows.length!=0){
      res.status(200).set('Content-Type', 'application/json').json(rows).end();
  }
  else{
      res.status(200).set('Content-Type', 'application/json').json('No Record found').end();
  }
  }
  // [END bigquery_query_table]
  queryDestinationTable();
}
// [END app]

module.exports = app;