const Route = require('../models/Route');

const CARRIERS = ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL', 'OOCL', 'Zim Line'];

const FROM_LOCATIONS = [
  // Canada West Coast
  {label: 'Vancouver (BC), CANADA', value: 'CAVAN'},
  
  // Canada East Coast
  {label: 'Montreal (QC), CANADA', value: 'CAMTR'},
  {label: 'Toronto (ON), CANADA', value: 'CATOR'},
  {label: 'Halifax (NS), CANADA', value: 'CAHAL'},
  {label: 'St. John\'s (NB), CANADA', value: 'CASJB'},

  // US West Coast
  {label: 'Long Beach (CA), US', value: 'USLGB'},
  {label: 'Los Angeles (CA), US', value: 'USLAX'},
  {label: 'Oakland (CA), US', value: 'USOAK'},
  {label: 'Seattle (WA), US', value: 'USSEA'},
  {label: 'Tacoma (CA), US', value: 'USTIW'},

  // US East Coast
  {label: 'Miami (FL), US', value: 'USMIA'},
  {label: 'Port Everglades (FL), US', value: 'USPEF'},
  {label: 'New Orleans (LA), US', value: 'USMSY'},
  {label: 'Boston (MA), US', value: 'USBOS'},
  {label: 'Baltimore (MD), US', value: 'USBAL'},
  {label: 'New York (NY), US', value: 'USNYC'},
  {label: 'Newark (NJ), US', value: 'USEWR'},
  {label: 'Savannah (GA), US', value: 'USSAV'},
  {label: 'Charleston (SC), US', value: 'USCHS'},
  {label: 'Norfolk (VA), US', value: 'USORF'},
  {label: 'Houston (TX), US', value: 'USHOU'},
];

const TO_LOCATIONS = [
  // Viet Nam
  {label: 'Ho Chi Minh City, VIETNAM', value: 'VNSGN'},
  {label: 'Hai Phong, VIETNAM', value: 'VNHPH'},
  {label: 'Da Nang, VIETNAM', value: 'VNDAD'},

  // Thailand
  {label: 'Bangkok, THAILAND', value: 'THBKK'},
  {label: 'Laem Chabang, THAILAND', value: 'THLCH'},
  {label: 'Lat Krabang, THAILAND', value: 'THLKR'},

  // Korea
  {label: 'Busan, KOREA', value: 'KRPUS'},
  {label: 'Incheon, KOREA', value: 'KRINC'},

  // Japan
  {label: 'Tokyo, JAPAN', value: 'JPTYO'},
  {label: 'Yokohama, JAPAN', value: 'JPYOK'},
  {label: 'Nagoya, JAPAN', value: 'JPNGO'},
  {label: 'Kobe, JAPAN', value: 'JPUKB'},
  {label: 'Osaka, JAPAN', value: 'JPOSA'},

  // Singapore
  {label: 'Singapore, SINGAPORE', value: 'SGSIN'},

  // Malaysia
  {label: 'Port Klang, MALAYSIA', value: 'MYPKG'},
  {label: 'Tanjung Pelepas, MALAYSIA', value: 'MYTPP'},

  // Phillipines
  {label: 'Manila North Harbour , PHILLIPINES', value: 'PHMNN'},
  {label: 'Manila South Harbour , PHILLIPINES', value: 'PHMNS'},

  // Indonesia
  {label: 'Jakarta, INDONESIA', value: 'IDJKT'},
  {label: 'Surabaya, INDONESIA', value: 'IDSUB'},
  {label: 'Semarang, INDONESIA', value: 'IDSRG'},

  // Sri Lanka
  {label: 'Colombo, SRI LANKA', value: 'LKCMB'},
  
  // Taiwan
  {label: 'Taichung, TAIWAN', value: 'TWTXG'},
  {label: 'Kaohsiung, TAIWAN', value: 'TWKHH'},
  {label: 'Keelung, TAIWAN', value: 'TWKEL'},

  // India
  {label: 'Nhava Sheva, INDIA', value: 'INNSA'},
  {label: 'Chennai, INDIA', value: 'INMAA'},
  {label: 'Mundra, INDIA', value: 'INMUN'},
  {label: 'Kolkata, INDIA', value: 'INCCU'},
  {label: 'Pipavav, INDIA', value: 'INPAV'},
  {label: 'Visakhapatnam, INDIA', value: 'INVTZ'},
  
  // Cambodia
  {label: 'Sihanoukville, CAMBODIA', value: 'KHKOS'},

  // Myama
  {label: 'Yangon, MYAMA', value: 'MMRGN'},

  // China
  {label: 'Hong Kong, CHINA', value: 'HKHKG'},
  {label: 'Dalian, CHINA', value: 'CNDLC'},
  {label: 'Foshan, CHINA', value: 'CNFOS'},
  {label: 'Guangzhou, CHINA', value: 'CNCAN'},
  {label: 'Lianyungang, CHINA', value: 'CNLYG'},
  {label: 'Ningbo, CHINA', value: 'CNNGB'},
  {label: 'Qingdao, CHINA', value: 'CNTAO'},
  {label: 'Shanghai, CHINA', value: 'CNSHA'},
  {label: 'Shenzhen, CHINA', value: 'CNSZX'},
  {label: 'Xingang, CHINA', value: 'CNTXG'},
  {label: 'Xiamen, CHINA', value: 'CNXMN'},
];

const autoGenerateRoutes = () => {
  let hugeRoutes = [];
  CARRIERS.map(carrier => {
    FROM_LOCATIONS.map(start => {
      TO_LOCATIONS.map(end => {
        hugeRoutes.push(new Route({
          routeId: start.value + "-" + end.value,
          quoteHistory: [],
          startLocation: start.label,
          endLocation: end.label,
          carrier: carrier,
        }))
      })
    })
  })
  Route.collection.insertMany(hugeRoutes, onInsert);
}

function onInsert(err, docs) {
  if (err) {
      // TODO: handle error
  } else {
      console.info('%d potatoes were successfully stored.', docs.length);
  }
}

module.exports = autoGenerateRoutes;