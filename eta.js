var routes = [
  {
    url: 'https://www.google.co.il/maps/dir/Rav+Ashi+St+11,+Tel+Aviv-Yafo/Rabin+Square/@32.0999458,34.7746972,14z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x151d496bd36d509d:0x5b8ca4673b888dc7!2m2!1d34.799061!2d32.1207837!1m5!1m1!1s0x151d4b85eeabf6d3:0x1e9885d94981dca5!2m2!1d34.7806387!2d32.0803408?hl=en&force=lite',
    name: 'Harav ashi 11, Tel aviv  > Kikar rabin'
  }//,
  // {
  //   url: 'https://www.google.co.il/maps/dir/Borokhov+St,+Herzliya/Rabin+Square/@32.1265764,34.8168728,13z/data=!4m8!4m7!1m2!1m1!1s0x151d47fc4675cf47:0xfc0d54da322577a4!1m2!1m1!1s0x151d4b85eeabf6d3:0x1e9885d94981dca5!3e0?force=lite&hl=en',
  //   name: 'Borochov, Neve Amal, Herzelia > Kikar rabin'
  // },
  // {
  //   url: 'https://www.google.co.il/maps/dir/Ibn+Gabirol+St+68,+Tel+Aviv-Yafo/Malkhei+Yisra/@32.0805609,34.7808055,17z/data=!4m8!4m7!1m2!1m1!1s0x151d4b8590cb78bd:0x716d6eb2a3aab785!1m2!1m1!1s0x151d4b85ee629781:0xd86a6be8ba33268b!3e0?force=lite&hl=en',
  //   name: 'Ibn Gabirol St 68, Tel Aviv-Yafo > Malkhei Yisrael St, Tel Aviv-Yafo'
  // },
  // {
  //   url: 'https://www.google.co.il/maps/dir/Ibn+Gabirol+St+68,+Tel+Aviv-Yafo/Weizmann+St+10,+Tel+Aviv-Yafo/@32.0801011,34.7850585,17z/data=!4m8!4m7!1m2!1m1!1s0x151d4b8590cb78bd:0x716d6eb2a3aab785!1m2!1m1!1s0x151d4b90ed1759b7:0x8dc068763325b42b!3e0?force=lite&hl=en',
  //   name: 'Ibn Gabirol St 68, Tel Aviv-Yafo > Weizmann St 10, Tel Aviv-Yafo'
  // },
  // {
  //   url: 'https://www.google.co.il/maps/dir/%D7%9B%D7%9C%D7%90+%D7%90%D7%99%D7%99%D7%9C%D7%95%D7%9F,+Ramla%E2%80%AD/Weizmann+St+10,+Tel+Aviv-Yafo/@31.9955266,34.8320577,12z/data=!4m8!4m7!1m2!1m1!1s0x1502ca16e1b403bb:0x5208ce7cfda763f1!1m2!1m1!1s0x151d4b90ed1759b7:0x8dc068763325b42b!3e0?force=lite&hl=en',
  //   name: 'Ayalaon prison, Ramala > Weizmann St 10, Tel Aviv-Yafo'
  // }
];
var webpage = require('webpage');
var page = webpage.create();
page.viewportSize = {
  width: 800,
  height: 600
};

function getRouteEta(route){
  // console.log('getting eta for '+ route.name);
  page.open(route.url , function(status) {
    route.eta = page.evaluate(function() {
      var elems = document.querySelectorAll(".ml-directions-selection-screen-non-transit-row span");
      return elems.length > 5 ? elems[4].innerText : null;
    });
    console.log(route.name + ": " + route.eta);
    page.render('example' + i + '.png');
    setTimeout(nextRoute, 100);
  });
};

var i = 0;
function nextRoute(){
  // console.log(i);
  if (i == routes.length) {
    setTimeout(function(){ phantom.exit();}, 0);
    return;
  }
  var route = routes[i];
  i++;
  getRouteEta(route);
};

nextRoute();