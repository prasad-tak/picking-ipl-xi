// -----------Stage 1----------------

// Interaction code

navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2023-15129');

let links = parse().matchSummaryLinks;
for(let i of links){
  next_stage({url: i})
}

// Parser code

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

// -----------Stage 2----------------

// Interaction code

navigate(input.url);

let playersData = parse().playersData;
for(let obj of playersData){
  Name = obj['name']
  team = obj['team']
  url = obj['link']
  next_stage({name: Name,team: team,url: url})
}

// Parser code

var playersLinks = []
var match = $('span.ds-text-tight-xs').filter(function() {
  return $(this).text().includes(String(" Innings"));

});


var team1 = $(match[0]).text().replace(" Innings", "");
var team2 = $(match[1]).text().replace(" Innings", "");

//for batting players
var tables = $('div.ds-p-0 > table.ci-scorecard-table');
var firstInningRows = $(tables[0]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 8;
});

var secondInningRows = $(tables[1]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 8;
});
firstInningRows.each((index,element)=>{
  var tds = $(element).find('td');
  playersLinks.push({
    "name":$(tds.eq(0)).find('a > span > span').text().replace(' ',''),
    "team":team1,
    "link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
  })
})
secondInningRows.each((index,element)=>{
  var tds = $(element).find('td');
  playersLinks.push({
    "name":$(tds.eq(0)).find('a > span > span').text().replace(' ',''),
    "team":team2,
    "link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
  })
})

//for bowling players

var tables = $('div.ds-p-0 > table.ci-scorecard-table').siblings();

var firstInningRows = $(tables[0]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 11;
});

var secondInningRows = $(tables[1]).find('tbody > tr').filter(function(index, element) {
  return $(this).find("td").length >= 11;
});

firstInningRows.each((index,element)=>{
  var tds = $(element).find('td');
  playersLinks.push({
    "name":$(tds.eq(0)).find('a > span').text().replace(' ', ''),
    "team":team1,
    "link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
  })
})
secondInningRows.each((index,element)=>{
  var tds = $(element).find('td');
  playersLinks.push({
    "name":$(tds.eq(0)).find('a > span').text().replace(' ',''),
    "team":team2,
    "link": "https://www.espncricinfo.com" + $(tds.eq(0)).find('a').attr('href')
  })
})
return {
  "playersData" : playersLinks
}


// ---------------Stage 3 ---------------

// Interaction code

navigate(input.url);
final_data = parse()
collect({
  "name":input.name,
  "team":input.team,
   "battingStyle": final_data.battingStyle,
  "bowlingStyle": final_data.bowlingStyle,
  "playingRole":  final_data.playingRole,
 
  
});

// Parser code

const battingStyle = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('Batting Style')
  })

const bowlingStyle = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('Bowling Style')
  })

const playingRole = $('div.ds-grid > div').filter(function(index){
    return $(this).find('p').first().text() === String('Playing Role')
  })



 return {
  	"battingStyle": battingStyle.find('span').text(),
   "bowlingStyle": bowlingStyle.find('span').text(),
   "playingRole": playingRole.find('span').text()
   
}