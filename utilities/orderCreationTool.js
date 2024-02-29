const userIds = [
  "65d4aac0fa19c4fe7377aa25",
  "65d4ab22fa19c4fe7377aa28",
  "65d4ab2bfa19c4fe7377aa2b",
  "65d4ab32fa19c4fe7377aa2e",
  "65d4ab3dfa19c4fe7377aa31",
  "65d4ab60fa19c4fe7377aa34",
  "65d4ab9dfa19c4fe7377aa37",
  "65d4abdbfa19c4fe7377aa3a",
  "65d4abf9fa19c4fe7377aa3e",
  "65d4ac2dfa19c4fe7377aa42",
  "65d4ac86fa19c4fe7377aa45",
  "65d4acd4fa19c4fe7377aa48",
  "65d4ba7c8d577b6387b3ff82",
  "65d4ba7c8d577b6387b3ff84",
  "65d4ba7c8d577b6387b3ff86",
  "65d4ba7c8d577b6387b3ff88",
  "65d4ba7c8d577b6387b3ff8a",
  "65d4ba7d8d577b6387b3ff8c",
  "65d4ba7d8d577b6387b3ff8e",
  "65d4ba7d8d577b6387b3ff90",
  "65d4bba18d577b6387b3fffa",
  "65de43580db23074a59443ee",
  "65de43580db23074a59443f0",
  "65de43580db23074a59443f3",
  "65de43f10db23074a594440d",
  "65de43f10db23074a594440f",
  "65de43f10db23074a5944412",
  "65de47117ce3d0248c3b2220",
  "65de47127ce3d0248c3b2223",
  "65de47127ce3d0248c3b2225",
  "65de47127ce3d0248c3b2227",
  "65de47127ce3d0248c3b2229",
  "65de47e37ce3d0248c3b2237",
  "65de47e37ce3d0248c3b223a",
  "65de47e37ce3d0248c3b223c",
  "65de47e37ce3d0248c3b223e",
  "65de47e37ce3d0248c3b2240",
  "65de48267ce3d0248c3b2244",
  "65de48267ce3d0248c3b2246",
  "65de48267ce3d0248c3b2248",
  "65de48267ce3d0248c3b224a",
  "65de48267ce3d0248c3b224c",
  "65de48547ce3d0248c3b2250",
  "65de48547ce3d0248c3b2252",
  "65de48547ce3d0248c3b2254",
  "65de48547ce3d0248c3b2256",
  "65de48547ce3d0248c3b2258",
  "65de48997ce3d0248c3b225c",
  "65de48997ce3d0248c3b225e",
  "65de48997ce3d0248c3b2260",
  "65de48997ce3d0248c3b2262",
  "65de48997ce3d0248c3b2264",
  "65de48ed7ce3d0248c3b2274",
  "65de48ed7ce3d0248c3b2276",
  "65de48ed7ce3d0248c3b2278",
];
const Locations = [
  {
    governorate: "Alexandria",
    cities: [
      "Alexandria",
      "Borg El Arab",
      "Kafr El Dawwar",
      "Damanhur",
      "Rosetta",
    ],
  },
  {
    governorate: "Aswan",
    cities: ["Aswan", "Kom Ombo", "Edfu", "Abu Simbel", "Nasr al-Nuba"],
  },
  {
    governorate: "Asyut",
    cities: ["Asyut", "Sohag", "Dairut", "Abnub", "Al Badari"],
  },
  {
    governorate: "Beheira",
    cities: [
      "Damanhur",
      "Rashid",
      "Kafr El Dawwar",
      "Abu Hummus",
      "Kom Hamada",
    ],
  },
  {
    governorate: "Beni Suef",
    cities: ["Beni Suef", "El Wasta", "Bibah", "Naser", "Al Fashn"],
  },
  {
    governorate: "Cairo",
    cities: [
      "Cairo",
      "Giza",
      "Shubra El-Kheima",
      "Helwan",
      "6th of October City",
    ],
  },
  {
    governorate: "Dakahlia",
    cities: ["Mansoura", "Mit Ghamr", "Talkha", "Agami", "Sherbin"],
  },
  {
    governorate: "Damietta",
    cities: [
      "Damietta",
      "Kafr El Shaykh Saad",
      "Ras El Bar",
      "Faraskur",
      "Zarqa",
    ],
  },
  {
    governorate: "Faiyum",
    cities: ["Faiyum", "Sinnuris", "Tamiya", "Ihnasia", "Abu al-Matamir"],
  },
  {
    governorate: "Gharbia",
    cities: ["Tanta", "Kafr El Zayat", "Zefta", "Basyoun", "Mehallet Qasr"],
  },
  {
    governorate: "Giza",
    cities: [
      "Giza",
      "6th of October City",
      "Sheikh Zayed City",
      "Al Haram",
      "Imbaba",
    ],
  },
  {
    governorate: "Ismailia",
    cities: ["Ismailia", "Fayed", "Arbaeen", "Ataqah", "El Qantara"],
  },
  {
    governorate: "Kafr El Sheikh",
    cities: ["Kafr El Sheikh", "Desouk", "Metoubes", "Biyala", "Fouh"],
  },
  {
    governorate: "Luxor",
    cities: ["Luxor", "Karnak", "New Karnak", "Armant", "Esna"],
  },
  {
    governorate: "Matrouh",
    cities: ["Marsa Matrouh", "Siwa", "El Hamam", "El Alamein", "Siwah"],
  },
  {
    governorate: "Minya",
    cities: ["Minya", "Beni Mazar", "Mallawi", "Deir Mawas", "Maghagha"],
  },
  {
    governorate: "Monufia",
    cities: ["Shebin El Kom", "Ashmoun", "Menouf", "Sadat City", "Quesna"],
  },
  {
    governorate: "New Valley",
    cities: ["Kharga", "Dakhla", "Farafra", "Baris", "Mut"],
  },
  {
    governorate: "North Sinai",
    cities: ["El Arish", "Rafah", "Bir al-Abed", "Nakhl", "Sheikh Zuweid"],
  },
  {
    governorate: "Port Said",
    cities: ["Port Said", "Port Fuad", "El-Manakh", "El-Zohour", "El-Salam"],
  },
  {
    governorate: "Qena",
    cities: ["Qena", "Luxor", "Nag Hammadi", "Dendera", "Farshout"],
  },
  {
    governorate: "Qalyubia",
    cities: ["Benha", "Qalyub", "Shubra El-Kheima", "Banha", "Khanka"],
  },
  {
    governorate: "Red Sea",
    cities: ["Hurghada", "Sharm El Sheikh", "El Gouna", "Safaga", "Marsa Alam"],
  },
  {
    governorate: "Sharqia",
    cities: [
      "Zagazig",
      "Al-Ibrahimiyah",
      "Abu Hammad",
      "Al-Qanayat",
      "Al-Husayniyah",
    ],
  },
  {
    governorate: "Sohag",
    cities: ["Sohag", "Gerga", "Gohina", "Dar El Salam", "Al Maragha"],
  },
  {
    governorate: "South Sinai",
    cities: [
      "Sharm El Sheikh",
      "Dahab",
      "Nuweiba",
      "Saint Catherine",
      "Ras Sidr",
    ],
  },
  {
    governorate: "Suez",
    cities: ["Suez", "Ismailia", "Fayed", "Arbaeen", "Ataqah"],
  },
];

const productIds = [
  "65d631485f85f345043df151",
  "65d631c45f85f345043df15e",
  "65d632b95f85f345043df16a",
  "65d633265f85f345043df175",
  "65d6393d5f85f345043df180",
  "65d639cd5f85f345043df18c",
  "65d63c3489a82746548328fb",
  "65d63c8a89a8274654832907",
  "65d63db389a8274654832913",
  "65d63e1189a827465483291f",
  "65d63eb689a827465483292c",
  "65d63ef989a8274654832939",
  "65d63f6a89a8274654832945",
  "65d640ba89a827465483294d",
  "65d6415f89a8274654832955",
  "65d641dd89a827465483295d",
  "65d6422989a8274654832965",
  "65d6429989a827465483296d",
  "65d643d7ac4acbdfef8fe0af",
  "65d64445ac4acbdfef8fe0ca",
];

const voucherIds = [
  "65d75df25d77658bafbcdf12",
  "65df2ecf60c7997795b98c98",
  "65df2edc60c7997795b98c9b",
  "65df2ef160c7997795b98c9e",
  "65df58fd32f155227512fa61",
];

function pickRandomLocation(locations) {
  const randomIndex = Math.floor(Math.random() * locations.length);
  const randomGovernorate = locations[randomIndex].governorate;
  const cities = locations[randomIndex].cities;
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  return {
    state: randomGovernorate,
    city: randomCity,
    street: "123 Elm Street",
  };
}

function pickRandomId(idsArray) {
  const randomIndex = Math.floor(Math.random() * idsArray.length);
  return idsArray[randomIndex];
}

function getRandomPaymentMethod() {
  const paymentMethods = ["Cash on Delivery", "Credit"];
  const randomIndex = Math.floor(Math.random() * paymentMethods.length);
  return paymentMethods[randomIndex];
}
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createNewOrder = () => {
  const products = [
    { product: pickRandomId(productIds), quantity: getRandomInteger(1, 5) },
    { product: pickRandomId(productIds), quantity: getRandomInteger(1, 5) },
  ];

  const address = pickRandomLocation(Locations);
  const paymentMethod = getRandomPaymentMethod();
  const finalPrice = getRandomInteger(100, 1500);
  const user = pickRandomId(userIds);
  const voucher = pickRandomId(voucherIds);
  const order = {
    products: products,
    address: address,
    user: user,
    paymentMethod: paymentMethod,
    finalPrice: finalPrice,
    voucher: voucher,
  };
  return order;
};
module.exports = { createNewOrder };
