const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

/** Indian-style grouping (১,৪৮০) in Bengali digits */
export function formatTaka(n: number): string {
  return toBnDigits(new Intl.NumberFormat("en-IN").format(Math.round(n)));
}

export function formatPct(pct: number): string {
  return toBnDigits(Math.abs(pct).toFixed(1));
}

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitBn(unit: string): string {
  return UNITS[unit] ?? unit;
}

export function perUnitBn(unit: string): string {
  return `প্রতি ${unitBn(unit)}`;
}

const WEEKDAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

/** e.g. শুক্রবার, ১০ অক্টোবর, ২০২৬ */
export function bnDate(date = new Date()): string {
  return `${WEEKDAYS[date.getDay()]}, ${toBnDigits(date.getDate())} ${MONTHS[date.getMonth()]}, ${toBnDigits(date.getFullYear())}`;
}
