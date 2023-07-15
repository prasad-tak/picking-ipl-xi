// -----------Stage1 ------------

//Interaction code 


navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2023-15129');

let links = parse().matchSummaryLinks;
for(let i of links){
  next_stage({url: i})
}

//Parse code

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

// ------------Stage2--------------

//Interaction code

navigate(input.url);
collect(parse());

//Parser code

var match = $('span.ds-text-tight-xs').filter(function() {
  
 var text = $(this).text();
  return text.includes(String(" Innings"));
});


var team1 = $(match[0]).text().replace(" Innings", "");
var team2 = $(match[1]).text().replace(" Innings", "");
var matchInfo = team1 + ' Vs ' + team2;

var tables = $('div.ds-p-0 > table.ci-scorecard-table');
var firstInningRows = $(tables[0]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 8;
});

var secondInningRows = $(tables[1]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 8;
});
var si = secondInningRows.length;
var battingSummary = [];

firstInningRows.each(function(index, element) {
  var tds = $(element).find("td");
  battingSummary.push({
    "match": matchInfo,
    "teamInnings": team1,
    "battingPos": index + 1,
    "batsmanName": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
    "dismissal": $(tds.eq(1)).find('span > span').text(),
    "runs": $(tds.eq(2)).find('strong').text(),
    "balls": $(tds.eq(3)).text(),
    "4s": $(tds.eq(5)).text(),
    "6s": $(tds.eq(6)).text(),
    "SR": $(tds.eq(7)).text()
  });
});

secondInningRows.each(function(index, element) {
  var tds = $(element).find('td');
  battingSummary.push({
    "match": matchInfo,
    "teamInnings": team2,
    "battingPos": index + 1,
    "batsmanName": $(tds[0]).find('a > span > span').text().replace(' ', ''),
    "dismissal": $(tds[1]).find('span > span').text(),
    "runs": $(tds[2]).find('strong').text(),
    "balls": $(tds[3]).text(),
    "4s": $(tds[5]).text(),
    "6s": $(tds[6]).text(),
    "SR": $(tds[7]).text()
  });
});

return {
  "battingSummary": battingSummary,
  "l" : si
  
};
