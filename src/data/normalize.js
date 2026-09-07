/** Normalise a company name for matching ("Grand View Addis" == "Grandview Addis"). */
export function normalizeClientKey(name = "") {
  const key = String(name).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (key === "icsinternationalcommunityschoolofaddisababa") {
    return "internationalcommunityschoolofaddisababa";
  }
  return key;
}
