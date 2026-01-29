const units = [
  "", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"
];

const tens = [
  "", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"
];

const convertLessThanHundred = (n: number): string => {
  if (n < 20) return units[n];
  
  const ten = Math.floor(n / 10);
  const unit = n % 10;
  
  if (ten === 7 || ten === 9) {
    // 70-79 et 90-99
    const base = ten === 7 ? "soixante" : "quatre-vingt";
    const remainder = (ten === 7 ? 10 : 10) + unit;
    if (remainder === 11 && ten === 7) return base + " et onze";
    return base + (remainder < 20 ? "-" + units[remainder] : "-" + units[remainder]);
  }
  
  if (ten === 8 && unit === 0) return "quatre-vingts";
  
  if (unit === 0) return tens[ten];
  if (unit === 1 && ten < 8) return tens[ten] + " et un";
  return tens[ten] + "-" + units[unit];
};

const convertLessThanThousand = (n: number): string => {
  if (n < 100) return convertLessThanHundred(n);
  
  const hundred = Math.floor(n / 100);
  const remainder = n % 100;
  
  let result = "";
  if (hundred === 1) {
    result = "cent";
  } else {
    result = units[hundred] + " cent";
    if (remainder === 0) result += "s";
  }
  
  if (remainder > 0) {
    result += " " + convertLessThanHundred(remainder);
  }
  
  return result;
};

export const numberToFrenchWords = (n: number): string => {
  if (n === 0) return "zéro";
  if (n < 0) return "moins " + numberToFrenchWords(-n);
  
  const integerPart = Math.floor(n);
  const decimalPart = Math.round((n - integerPart) * 100);
  
  let result = "";
  
  if (integerPart === 0) {
    result = "zéro";
  } else {
    const millions = Math.floor(integerPart / 1000000);
    const thousands = Math.floor((integerPart % 1000000) / 1000);
    const remainder = integerPart % 1000;
    
    if (millions > 0) {
      if (millions === 1) {
        result += "un million";
      } else {
        result += convertLessThanThousand(millions) + " millions";
      }
      if (thousands > 0 || remainder > 0) result += " ";
    }
    
    if (thousands > 0) {
      if (thousands === 1) {
        result += "mille";
      } else {
        result += convertLessThanThousand(thousands) + " mille";
      }
      if (remainder > 0) result += " ";
    }
    
    if (remainder > 0) {
      result += convertLessThanThousand(remainder);
    }
  }
  
  result = result.toUpperCase() + " DIRHAMS";
  
  if (decimalPart > 0) {
    result += " ET " + convertLessThanHundred(decimalPart).toUpperCase() + " CENTIMES";
  }
  
  result += " TTC";
  
  return result;
};
