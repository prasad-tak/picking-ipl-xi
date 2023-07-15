// --------------Stage1-----------------

//Interaction code


navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2023-15129');

let links = parse().matchSummaryLinks;
for(let i of links){
  next_stage({url: i})
}

//Parser code

let links = []
const allRows = $('table.ds-w-full.ds-table.ds-table-xs.ds-table-auto.ds-w-full.ds-overflow-scroll.ds-scrollbar-hide > tbody > tr');
allRows.each((index,element)=> {
  const tds = $(element).find('td');
  const rowURL = "https://www.espncricinfo.com" + $(tds[6]).find('a').attr('href');
  links.push(rowURL);
 })
return {
 'matchSummaryLinks' : links
};


//--------------Stage 2 --------------

// Interaction code

navigate(input.url);
collect(parse());

// Parser code

var match = $('span.ds-text-tight-xs').filter(function() {
  
 var text = $(this).text();
  return text.includes(String(" Innings"));
});


var team1 = $(match[0]).text().replace(" Innings", "");
var team2 = $(match[1]).text().replace(" Innings", "");
var matchInfo = team1 + ' Vs ' + team2;

var tables = $('div.ds-p-0 > table.ci-scorecard-table').siblings();

var firstInningRows = $(tables[0]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 11;
});

var secondInningRows = $(tables[1]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 11;
});

var bowlingSummary = []
firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team2,
   		"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"overs": $(tds.eq(1)).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

secondInningRows.each((index, element) => {
  var tds = $(element).find('td');
   bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team1,
   		"bowlerName": $(tds[0]).find('a > span').text().replace(' ', ''),
    	"overs": $(tds[1]).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

return {"bowlingSummary": bowlingSummary}