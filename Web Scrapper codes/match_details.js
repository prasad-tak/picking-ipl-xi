//Interaction code

// 1. Go to the page where you want to start

navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2023-15129');

// 3. Once the browser page has the data you want, call parse() to get the data
// and call collect() to add a record to your final dataset

collect(parse());

//Parser code

//step1: Create an array to store the record
let matchSummary = [];

//step2: Selecting all rows we need from target body
const allRows = $('table.ds-w-full.ds-table.ds-table-xs.ds-table-auto.ds-w-full.ds-overflow-scroll.ds-scrollbar-hide > tbody > tr');

//Step3: Looping through each row and getting the data in the cell

allRows.each((index,element)=> {
  const tds = $(element).find('td');
 
  matchSummary.push({
    
    'team_1': $(tds[0]).text(),
    'team_2': $(tds[1]).text(),
    'winner': $(tds[2]).text(),
    'margin': $(tds[3]).text(),
    'ground': $(tds[4]).text(),
    'matchDate': $(tds[5]).text(),
    'scorecard': $(tds[6]).text()
  });
});

//step4: Return the value
return {
  "matchSummary": matchSummary
  
 
  
};