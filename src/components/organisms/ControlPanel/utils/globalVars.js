export const nordics = ["NO", "SE", "FI", "DK", "IS"];
export const benelux = ["BE", "NL", "LU"];
export const western_europe = ["BE", "NL", "LU", "CH", "FR", "DE", "AT"];
export const eastern_europe = [
  "PL",
  "RO",
  "HU",
  "SK",
  "EE",
  "LV",
  "LT",
  "CZ",
  "UA",
  "MD",
  "BY",
  "BG",
  "RS",
];
export const southern_europe = [
  "PT",
  "ES",
  "IT",
  "GR",
  "ES",
  "AD",
  "CY",
  "HR",
  "BA",
  "ME",
  "AL",
  "RS",
  "MK",
  "XK",
  "SI",
  "TR",
];
export const northern_europe = [
  "NO",
  "SE",
  "FI",
  "DK",
  "IS",
  "IE",
  "GB",
  "EE",
  "LV",
  "LT",
];
export const european_union = [
  "BE",
  "NL",
  "LU",
  "PT",
  "ES",
  "FR",
  "IE",
  "BG",
  "CZ",
  "DK",
  "DE",
  "EE",
  "FR",
  "SE",
  "FI",
  "AT",
  "IT",
  "RO",
  "HU",
  "LV",
  "LT",
  "PL",
  "SK",
  "GR",
  "SI",
  "CY",
];
export const eurozone = [
  "BE",
  "NL",
  "LU",
  "PT",
  "ES",
  "FR",
  "IE",
  "DE",
  "EE",
  "FR",
  "FI",
  "AT",
  "IT",
  "LV",
  "LT",
  "SK",
  "GR",
  "SI",
  "CY",
];
export const visegrad = ["PL", "CZ", "HU", "SK"];
export const baltics = ["EE", "LV", "LT"];
export const EU_data = {
  name: {
    common: "EU",
    official: "European Union",
  },
  capital: "Brussels (de facto)",
  population: 447706209,
  currencies: {
    EUR: {
      name: "Euro, Bulgarian Lev, Czech Koruna, Danish Krone, Croatian Kuna, Hungarian Forint, Polish Zloty, Romanian Leu, Swedish Krona",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/800px-Flag_of_Europe.svg.png",
  },
  languages: {
    EU: "Bulgarian, Croatian, Czech, Danish, Dutch, English, Estonian, Finnish, French, German, Greek, Hungarian, Italian, Irish, Latvian, Lithuanian, Maltese, Polish, Portuguese, Romanian, Slovak, Slovene, Spanish, and Swedish",
  },
};
export const Eurozone_data = {
  name: {
    common: "Eurozone",
    official: "Euro Area",
  },
  capital: "N/A (ECB headquarters in Frankfurt)",
  population: 342409476,
  currencies: {
    EUR: {
      name: "Euro",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Euro_symbol.svg",
  },
  languages: {
    EU: "Dutch, English, Estonian, Finnish, French, German, Greek, Italian, Irish, Latvian, Lithuanian, Maltese, Portuguese, Slovak, Slovene and Spanish",
  },
};
export const Nordics_data = {
  name: {
    common: "Nordic Countries",
    official: "Nordic Council",
  },
  capital: "N/A (Headquarters in Copenhagen)",
  population: 27210000,
  currencies: {
    EUR: {
      name: "Euro, Danish Krone, Icelandic króna, Norwegian Krone and Swedish Krona",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Flag_of_the_Nordic_Council_2016.svg",
  },
  languages: {
    EU: "Danish, Icelandic, Norwegian and Finnish",
  },
};
export const Benelux_data = {
  name: {
    common: "Benelux",
    official: "Benelux Union",
  },
  capital: "N/A (Headquarters in Brussels)",
  population: 29554771,
  currencies: {
    EUR: {
      name: "Euro",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Benelux_Logo.svg",
  },
  languages: {
    EU: "Dutch, French and Luxembourgish",
  },
};
export const Visegrad_data = {
  name: {
    common: "Visegrád",
    official: "Visegrád Group",
  },
  capital: "N/A",
  population: 63845789,
  currencies: {
    EUR: {
      name: "Euro, Czech Koruna, Hungarian Forint, Polish Zloty",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Visegr%C3%A1d_Group_logo.svg",
  },
  languages: {
    EU: "Polish, Hungarian, Slovak and Czech",
  },
};
export const Baltic_data = {
  name: {
    common: "Baltics",
    official: "Baltic Assembly",
  },
  capital: "N/A (Headquarters in Riga)",
  population: 6015315,
  currencies: {
    EUR: {
      name: "Euro",
      symbol: "€",
    },
  },
  flags: {
    svg: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Baltic_Assembly_logo.svg",
  },
  languages: {
    EU: "Estonian, Latvian and Lithuanian",
  },
};

export const no_data = (group_name) => {
  const no_data_group = {
    name: {
      common: group_name,
      official: "",
    },
    borders: "",
    capital: "",
    currencies: {},
    flags: {},
    languages: "",
    timezones: "",
  };

  return no_data_group;
};
