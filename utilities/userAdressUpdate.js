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

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getNewAddress = (id) => {
  const address = pickRandomLocation(Locations);
  return address;
};
module.exports = { getNewAddress };
