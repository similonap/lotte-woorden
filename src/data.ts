export interface Word {
  id: number
  word: string
  groupId: number
}

export interface Group {
  id: number
  name: string
  color: string
}

export const GROUPS: Group[] = [
  { id: 1,  name: 'De Ruimte',              color: '#6366f1' },
  { id: 2,  name: 'De Keuken',              color: '#ec4899' },
  { id: 3,  name: 'De Boerderij',           color: '#f59e0b' },
  { id: 4,  name: 'Weer & Natuur',          color: '#06b6d4' },
  { id: 5,  name: 'Sport',                  color: '#10b981' },
  { id: 6,  name: 'Het Lichaam',            color: '#ef4444' },
  { id: 7,  name: 'Fruit',                  color: '#f97316' },
  { id: 8,  name: 'Kleding & Mode',         color: '#a855f7' },
  { id: 9,  name: 'Muziekinstrumenten',     color: '#3b82f6' },
  { id: 10, name: 'Vervoer',               color: '#14b8a6' },
  { id: 11, name: 'Zoogdieren',            color: '#84cc16' },
  { id: 12, name: 'Beroepen',             color: '#f43f5e' },
  { id: 13, name: 'Gereedschap',          color: '#8b5cf6' },
  { id: 14, name: 'Planten & Bomen',      color: '#22c55e' },
  { id: 15, name: 'Computer & Tech',      color: '#0ea5e9' },
  { id: 16, name: 'Meubels',             color: '#d97706' },
  { id: 17, name: 'Groenten',            color: '#16a34a' },
  { id: 18, name: 'Edelstenen & Metalen', color: '#7c3aed' },
  { id: 19, name: 'Vogels',              color: '#0891b2' },
  { id: 20, name: 'Waterdieren',         color: '#2563eb' },
  { id: 21, name: 'Kantoorspullen',      color: '#b45309' },
  { id: 22, name: 'Insecten',            color: '#65a30d' },
  { id: 23, name: 'Dranken',             color: '#dc2626' },
  { id: 24, name: 'Eten / Gerechten',    color: '#db2777' },
  { id: 25, name: 'Gebouwen & Architectuur', color: '#475569' },
]

const raw: [string, number][] = [
  // Groep 1: De Ruimte
  ['Planeet',1],['Ster',1],['Komeet',1],['Maan',1],['Zon',1],
  ['Raket',1],['Astronaut',1],['Melkweg',1],['Telescoop',1],['Heelal',1],
  ['Satelliet',1],['Meteoriet',1],['Zwaartekracht',1],['Planetoïde',1],['Kosmos',1],
  ['Baan',1],['Zonsverduistering',1],['Lichtjaar',1],['Zwartgat',1],['Nevel',1],
  ['Venus',1],['Mars',1],['Jupiter',1],['Saturnus',1],['Ruimtestation',1],
  // Groep 2: De Keuken
  ['Koekenpan',2],['Garde',2],['Oven',2],['Koelkast',2],['Snijplank',2],
  ['Mixer',2],['Vergiet',2],['Spatel',2],['Magnetron',2],['Dunschiller',2],
  ['Waterkoker',2],['Braadpan',2],['Soeplepel',2],['Maatbeker',2],['Deegroller',2],
  ['Keukenweegschaal',2],['Broodrooster',2],['Vaatwasser',2],['Afzuigkap',2],['Frituurpan',2],
  ['Rasp',2],['Kurkentrekker',2],['Blikopener',2],['Pepermolen',2],['Vleesvork',2],
  // Groep 3: De Boerderij
  ['Tractor',3],['Hooivork',3],['Varken',3],['Schaap',3],['Kippenhok',3],
  ['Loods',3],['Maïsveld',3],['Boer',3],['Koe',3],['Paard',3],
  ['Schuur',3],['Hooi',3],['Mest',3],['Kalf',3],['Geit',3],
  ['Ezel',3],['Ploeg',3],['Melkmachine',3],['Weiland',3],['Silo',3],
  ['Landbouw',3],['Oogst',3],['Graan',3],['Kalkoen',3],['Kruiwagen',3],
  // Groep 4: Weer & Natuur
  ['Onweer',4],['Bliksem',4],['Hagel',4],['Sneeuw',4],['Mist',4],
  ['Regenboog',4],['Storm',4],['Windvlaag',4],['Hittegolf',4],['IJzel',4],
  ['Tornado',4],['Orkaan',4],['Luchtdruk',4],['Bewolking',4],['Zonneschijn',4],
  ['Dauw',4],['Rijp',4],['Motregen',4],['Sneeuwpop',4],['Hogedrukgebied',4],
  ['Lagedrukgebied',4],['Temperatuur',4],['Celsius',4],['Wervelwind',4],['Moesson',4],
  // Groep 5: Sport
  ['Voetbal',5],['Tennisracket',5],['Zwemmen',5],['Hockey',5],['Hardlopen',5],
  ['Basketbal',5],['Volleybal',5],['Judo',5],['Wielrennen',5],['Turnen',5],
  ['Boksen',5],['Atletiek',5],['Rugby',5],['Golfen',5],['Honkbal',5],
  ['Schaatsen',5],['Skiën',5],['Snowboarden',5],['Zeilen',5],['Klimmen',5],
  ['Handbal',5],['Badminton',5],['Biljart',5],['Darten',5],['Boogschieten',5],
  // Groep 6: Het Lichaam
  ['Hersenen',6],['Hartslag',6],['Longen',6],['Schouder',6],['Elleboog',6],
  ['Knie',6],['Vingertip',6],['Wervelkolom',6],['Enkel',6],['Slagader',6],
  ['Maag',6],['Lever',6],['Nieren',6],['Darmen',6],['Sleutelbeen',6],
  ['Heup',6],['Pols',6],['Milt',6],['Alvleesklier',6],['Schrijfhand',6],
  ['Oogkas',6],['Trommelvlies',6],['Zenuwstelsel',6],['Spierweefsel',6],['Lymfeklieren',6],
  // Groep 7: Fruit
  ['Aardbei',7],['Banaan',7],['Sinaasappel',7],['Framboos',7],['Mango',7],
  ['Kiwi',7],['Ananas',7],['Citroen',7],['Druif',7],['Watermeloen',7],
  ['Appel',7],['Peer',7],['Kers',7],['Perzik',7],['Abrikoos',7],
  ['Pruim',7],['Braam',7],['Bosbes',7],['Passievrucht',7],['Granaatappel',7],
  ['Limoen',7],['Vijg',7],['Dadel',7],['Papaja',7],['Mandarijn',7],
  // Groep 8: Kleding & Mode
  ['Spijkerbroek',8],['Regenjas',8],['Wintertrui',8],['Sokken',8],['Handschoen',8],
  ['Zonnebril',8],['Gordel',8],['Sportschoen',8],['Hoed',8],['T-shirt',8],
  ['Blouse',8],['Rok',8],['Jurk',8],['Kostuum',8],['Stropdas',8],
  ['Muts',8],['Sjaal',8],['Ondergoed',8],['Vest',8],['Pyjama',8],
  ['Laarzen',8],['Sandalen',8],['Badpak',8],['Overhemd',8],['Legging',8],
  // Groep 9: Muziekinstrumenten
  ['Gitaar',9],['Piano',9],['Drumstel',9],['Trompet',9],['Viool',9],
  ['Saxofoon',9],['Dwarsfluit',9],['Cello',9],['Harp',9],['Accordeon',9],
  ['Klarinet',9],['Hobo',9],['Basgitaar',9],['Keyboard',9],['Mondharmonica',9],
  ['Trombone',9],['Blokfluit',9],['Xylofoon',9],['Banjo',9],['Mandoline',9],
  ['Contrabas',9],['Pauken',9],['Triangel',9],['Orgel',9],['Doedelzak',9],
  // Groep 10: Vervoer
  ['Vliegtuig',10],['Helikopter',10],['Onderzeeër',10],['Bakfiets',10],['Vrachtwagen',10],
  ['Treinstel',10],['Motorfiets',10],['Zeilboot',10],['Scooter',10],['Luchtballon',10],
  ['Auto',10],['Tram',10],['Metro',10],['Liner',10],['Speedboot',10],
  ['Skateboard',10],['Step',10],['Hovercraft',10],['Zweefvliegtuig',10],['Tandem',10],
  ['Brandweerwagen',10],['Ambulance',10],['Politieauto',10],['Veerboot',10],['Raketschip',10],
  // Groep 11: Zoogdieren
  ['Olifant',11],['Tijger',11],['Leeuw',11],['Giraffe',11],['Zebra',11],
  ['Nijlpaard',11],['Neushoorn',11],['Aap',11],['Beer',11],['Wolf',11],
  ['Vos',11],['Konijn',11],['Hert',11],['Kangoeroe',11],['Koala',11],
  ['Panda',11],['Walvis',11],['Dolfijn',11],['Zeehond',11],['Vleermuis',11],
  ['Egel',11],['Eekhoorn',11],['Hamster',11],['Cavia',11],['Luipaard',11],
  // Groep 12: Beroepen
  ['Leraar',12],['Arts',12],['Brandweerman',12],['Politieagent',12],['Bakker',12],
  ['Slager',12],['Timmerman',12],['Schilder',12],['Kok',12],['Piloot',12],
  ['Verpleegkundige',12],['Advocaat',12],['Boer',12],['Kapper',12],['Journalist',12],
  ['Architect',12],['Programmeur',12],['Boekhouder',12],['Vuilnisman',12],['Chauffeur',12],
  ['Kelner',12],['Visser',12],['Wetenschapper',12],['Fotograaf',12],['Dierenarts',12],
  // Groep 13: Gereedschap
  ['Hamer',13],['Schroevendraaier',13],['Zaag',13],['Tang',13],['Boormachine',13],
  ['Waterpas',13],['Rolmaat',13],['Beitel',13],['Bankschroef',13],['Inbussleutel',13],
  ['Moersleutel',13],['Schuurmachine',13],['Lijmpistool',13],['Slijptol',13],['Bijl',13],
  ['Vijl',13],['Nijptang',13],['Schroef',13],['Spijker',13],['Moer',13],
  ['Bout',13],['Striptang',13],['Soldeerbout',13],['Werkbank',13],['Plamuurmes',13],
  // Groep 14: Planten & Bomen
  ['Eik',14],['Beuk',14],['Berk',14],['Denneboom',14],['Wilg',14],
  ['Roos',14],['Tulp',14],['Zonnebloem',14],['Madeliefje',14],['Narcis',14],
  ['Varen',14],['Mos',14],['Klimop',14],['Lavendel',14],['Cactus',14],
  ['Palmboom',14],['Bamboe',14],['Orchidee',14],['Brandnetel',14],['Klaproos',14],
  ['Viooltje',14],['Paardenbloem',14],['Esdoorn',14],['Kastanje',14],['Populier',14],
  // Groep 15: Computer & Tech
  ['Laptop',15],['Toetsenbord',15],['Muis',15],['Beeldscherm',15],['Printer',15],
  ['Processor',15],['Hardeschijf',15],['Router',15],['Software',15],['Internet',15],
  ['Algoritme',15],['Browser',15],['Wachtwoord',15],['Database',15],['Netwerk',15],
  ['Scanner',15],['Webcam',15],['Luidspreker',15],['Microfoon',15],['USB-stick',15],
  ['Firewall',15],['Pixel',15],['Moederbord',15],['Cloud',15],['Batterij',15],
  // Groep 16: Meubels
  ['Bank',16],['Stoel',16],['Tafel',16],['Kledingkast',16],['Bed',16],
  ['Boekenkast',16],['Bureau',16],['Nachtkastje',16],['Dressoir',16],['Fauteuil',16],
  ['Salontafel',16],['Eetkamerstoel',16],['Kapstok',16],['Spiegel',16],['Gordijn',16],
  ['Tapijt',16],['Vloerlamp',16],['Kussen',16],['Matras',16],['Wandplank',16],
  ['TV-meubel',16],['Poef',16],['Ladekast',16],['Bureaustoel',16],['Vitrinekast',16],
  // Groep 17: Groenten
  ['Wortel',17],['Bloemkool',17],['Broccoli',17],['Spinazie',17],['Sla',17],
  ['Komkommer',17],['Tomaat',17],['Paprika',17],['Ui',17],['Knoflook',17],
  ['Prei',17],['Aubergine',17],['Courgette',17],['Asperge',17],['Spruitjes',17],
  ['Pompoen',17],['Rodekool',17],['Radijs',17],['Biet',17],['Maïs',17],
  ['Erwt',17],['Bonen',17],['Selderij',17],['Venkel',17],['Artisjok',17],
  // Groep 18: Edelstenen & Metalen
  ['Diamant',18],['Goud',18],['Zilver',18],['Platina',18],['Koper',18],
  ['Brons',18],['IJzer',18],['Robijn',18],['Saffier',18],['Smaragd',18],
  ['Amethist',18],['Topaas',18],['Opaal',18],['Staal',18],['Aluminium',18],
  ['Lood',18],['Zink',18],['Kwik',18],['Nikkel',18],['Messing',18],
  ['Titaan',18],['Kristal',18],['Parel',18],['Turkoois',18],['Barnsteen',18],
  // Groep 19: Vogels
  ['Arend',19],['Mus',19],['Merel',19],['Vink',19],['Ekster',19],
  ['Kraai',19],['Duif',19],['Uil',19],['Valk',19],['Specht',19],
  ['Reiger',19],['Ooievaar',19],['Pelikaan',19],['Pinguïn',19],['Struisvogel',19],
  ['Zwaan',19],['Gans',19],['Eend',19],['Papegaai',19],['Kanarie',19],
  ['Kolibrie',19],['IJsvogel',19],['Fazant',19],['Patrijs',19],['Kwartel',19],
  // Groep 20: Waterdieren
  ['Haai',20],['Walvis',20],['Dolfijn',20],['Inktvis',20],['Octopus',20],
  ['Zeeschildpad',20],['Krab',20],['Kreeft',20],['Garnaal',20],['Zeester',20],
  ['Zeepaardje',20],['Kwal',20],['Rog',20],['Paling',20],['Zalm',20],
  ['Forel',20],['Haring',20],['Kabeljauw',20],['Tonijn',20],['Snoek',20],
  ['Karper',20],['Mossel',20],['Oester',20],['Anemoon',20],['Koraal',20],
  // Groep 21: Kantoorspullen
  ['Pen',21],['Potlood',21],['Gum',21],['Liniaal',21],['Schrift',21],
  ['Notitieblok',21],['Map',21],['Ordner',21],['Paperclip',21],['Nietmachine',21],
  ['Perforator',21],['Plakband',21],['Lijmstift',21],['Marker',21],['Rekenmachine',21],
  ['Enveloppe',21],['Postzegel',21],['Kalender',21],['Agenda',21],['Bureaulegger',21],
  ['Snelhechter',21],['Correctieroller',21],['Punaise',21],['Elastiekje',21],['Prullenbak',21],
  // Groep 22: Insecten
  ['Bij',22],['Wesp',22],['Mier',22],['Vlieg',22],['Mug',22],
  ['Vlinder',22],['Libelle',22],['Kever',22],['Lieveheersbeestje',22],['Sprinkhaan',22],
  ['Krekel',22],['Hommel',22],['Vlo',22],['Teek',22],['Mot',22],
  ['Rups',22],['Spin',22],['Schorpioen',22],['Duizendpoot',22],['Pissebed',22],
  ['Kakkerlak',22],['Mestkever',22],['Wandelendetak',22],['Horzel',22],['Cicade',22],
  // Groep 23: Dranken
  ['Koffie',23],['Thee',23],['Water',23],['Melk',23],['Limonade',23],
  ['Cola',23],['Vruchtensap',23],['Wijn',23],['Bier',23],['Whisky',23],
  ['Wodka',23],['Champagne',23],['Chocolademelk',23],['IJsthee',23],['Smoothie',23],
  ['Bubbels',23],['Cognac',23],['Jenever',23],['Tonic',23],['Gingerale',23],
  ['Karnemelk',23],['Espresso',23],['Cappuccino',23],['Cocktail',23],['Mocktail',23],
  // Groep 24: Eten / Gerechten
  ['Pizza',24],['Pasta',24],['Pannenkoek',24],['Hutspot',24],['Stamppot',24],
  ['Soep',24],['Salade',24],['Biefstuk',24],['Lasagne',24],['Risotto',24],
  ['Hamburger',24],['Friet',24],['Kroket',24],['Nasi',24],['Bami',24],
  ['Sushi',24],['Taco',24],['Burrito',24],['Omelet',24],['Quiche',24],
  ['Curry',24],['Paella',24],['Roti',24],['Couscous',24],['Spaghetti',24],
  // Groep 25: Gebouwen & Architectuur
  ['Huis',25],['Kerk',25],['Toren',25],['Kasteel',25],['Paleis',25],
  ['Flat',25],['Wolkenkrabber',25],['Museum',25],['Bibliotheek',25],['Ziekenhuis',25],
  ['School',25],['Fabriek',25],['Station',25],['Vuurtoren',25],['Molen',25],
  ['Brug',25],['Tunnel',25],['Stadion',25],['Theater',25],['Bioscoop',25],
  ['Tempel',25],['Moskee',25],['Synagoge',25],['Gevangenis',25],['Raadhuis',25],
]

export const WORDS: Word[] = raw.map(([word, groupId], index) => ({
  id: index,
  word: word.trim(),
  groupId,
}))

export const GROUP_SIZE = 25
