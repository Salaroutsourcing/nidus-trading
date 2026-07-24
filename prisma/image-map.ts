/**
 * Nidus Trading — product image mapping
 * -------------------------------------
 * Product photos are fetched by KEYWORD so the picture actually matches the
 * product type (a bearing shows a bearing, a cable shows a cable), and every
 * product gets several distinct images for the PDP gallery.
 *
 * We use LoremFlickr, which returns a real photo matching the given tags. The
 * `lock` value is derived from the product slug so images are:
 *   - deterministic (stable across builds/reseeds), and
 *   - unique per product (no duplicates between products), and
 *   - varied within a product (3 different shots via lock+0/+1/+2).
 *
 * Tags are comma-separated Flickr keywords chosen per product type.
 */

import fs from "node:fs";
import path from "node:path";

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 900000;
}

/** Build N keyword-matched image URLs for a product. */
export function buildImages(query: string, seed: string, n = 3): string[] {
  const tags = query
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(",");
  const base = hashSeed(seed);
  return Array.from(
    { length: n },
    (_, i) => `https://loremflickr.com/1200/900/${tags}?lock=${base + i * 7 + 1}`
  );
}

/**
 * Resolve a product's gallery, preferring EXACT local images when present.
 *
 * Exact AI-generated product photos live at:
 *   public/images/products/<slug>-1.jpg  (main / card image)
 *   public/images/products/<slug>-2.jpg  (optional)
 *   public/images/products/<slug>-3.jpg  (optional)
 *
 * Any missing slots are filled with keyword-matched images so every product
 * always has a 3-image gallery. This lets exact photos be added in batches
 * without breaking the catalog.
 */
export function resolveGallery(slug: string, query: string): string[] {
  const productsDir = path.join(process.cwd(), "public", "images", "products");
  const local: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const file = path.join(productsDir, `${slug}-${i}.jpg`);
    try {
      if (fs.existsSync(file)) local.push(`/images/products/${slug}-${i}.jpg`);
    } catch {
      // ignore fs errors (e.g. serverless build without public dir)
    }
  }
  if (local.length >= 3) return local.slice(0, 3);
  const fill = buildImages(query, slug, 3 - local.length);
  return [...local, ...fill];
}

/** Fallback keywords by category slug. */
export const categoryImageQuery: Record<string, string> = {
  "electronic-components": "electronics,circuit,component",
  "electrical-items": "electrical,cable,industrial",
  "it-computer-products": "server,computer,network",
  "mechanical-items": "machine,industrial,metal",
  "ms-products": "steel,metal,industrial",
  "wooden-items": "wood,furniture,workshop",
  "paint-items": "paint,industrial,coating",
  "hardware-items": "bolts,hardware,tools",
  "caster-wheels": "wheel,caster,industrial",
  "safety-lifting-equipment": "lifting,safety,industrial",
};

/** Keywords for the base (28) catalog products, keyed by product name. */
export const baseImageQuery: Record<string, string> = {
  "Precision Metal Film Resistor Kit": "resistor,electronics,components",
  "Electrolytic Capacitor Assortment": "capacitor,electronics,circuit",
  "Semiconductor Diode & Transistor Pack": "semiconductor,electronics,transistor",
  "Industrial Copper Wiring Cable": "copper,cable,wire",
  "Industrial Connector Set": "electrical,connector,plug",
  "MCB Circuit Breaker 32A 2P": "circuit,breaker,electrical",
  "Rack Server Hardware Bundle": "server,datacenter,rack",
  "Enterprise Networking Switch": "network,switch,ethernet",
  "IT Accessories & Peripherals Pack": "computer,keyboard,accessories",
  "Deep Groove Ball Bearing 6205": "bearing,ball,steel",
  "Industrial Welding Consumables Kit": "welding,electrode,metal",
  "Industrial Gear & Fastener Assortment": "gear,machine,metal",
  "Mild Steel Plate 6mm": "steel,plate,metal",
  "Mild Steel Sheet Pack": "steel,sheet,metal",
  "Mild Steel Pipe Bundle": "steel,pipe,metal",
  "Commercial Wooden Furniture Set": "wooden,furniture,office",
  "Custom Workshop Fixtures": "wooden,workbench,carpentry",
  "Industrial Epoxy Floor Paint 20L": "epoxy,floor,paint",
  "Auto Refinish Paint System": "car,paint,spray",
  "Building Exterior Paint Range": "paint,wall,building",
  "Hex Bolt Set M10 Assorted": "bolts,nuts,hardware",
  "Industrial Hardware Essentials Kit": "hardware,tools,bracket",
  "Heavy Duty Industrial Caster Wheel 6 inch": "caster,wheel,industrial",
  "Rigid Industrial Caster Wheel 8 inch": "caster,wheel,trolley",
  "Swivel Caster Wheel with Dual Lock": "caster,wheel,swivel",
  "Steel Wire Rope 12mm": "steel,wire,rope",
  "Rigging Hardware Set": "rigging,shackle,hook",
  "Industrial Safety PPE Bundle": "safety,helmet,ppe",
};

/** Keywords for the extended (40) catalog products, keyed by slug. */
export const extendedImageQuery: Record<string, string> = {
  // Cables & Wires
  "belden-9540-multi-conductor-shielded-cable-24awg-10c": "cable,wire,copper",
  "lapp-olflex-classic-110-control-cable-4g1-5": "cable,wire,electrical",
  "frls-fire-resistant-copper-cable-3-core-2-5": "cable,wire,electrical",
  "instrumentation-cable-shielded-1pair-18awg": "cable,wire,copper",
  "xlpe-armoured-power-cable-4-core-16mm2": "cable,power,electrical",
  "rg6-coaxial-cable-quad-shield-75ohm": "coaxial,cable,wire",
  "cat6-uutp-lszh-networking-cable-305m": "ethernet,network,cable",
  "silicone-rubber-high-temperature-cable-2-5mm2": "cable,wire,electrical",
  "welding-cable-70mm2-double-insulated": "welding,cable,wire",
  "vfd-drive-cable-emc-shielded-3core-4mm2": "cable,wire,industrial",
  // Electronic Components & Sensors
  "omron-e3z-d82-photoelectric-sensor-diffuse": "sensor,automation,electronics",
  "autonics-pr18-8dn-inductive-proximity-sensor": "sensor,proximity,automation",
  "pt100-rtd-temperature-sensor-3-wire-class-a": "temperature,sensor,probe",
  "k-type-thermocouple-probe-m8-connector": "thermocouple,temperature,probe",
  "honeywell-hall-effect-current-sensor-sps": "sensor,electronics,circuit",
  "schneider-zelio-sr2-smart-relay": "relay,automation,electronics",
  "panasonic-electrolytic-capacitor-450v-470uf": "capacitor,electronics,circuit",
  "stm32f103-arm-cortex-m3-microcontroller": "microcontroller,chip,electronics",
  // Electrical switchgear / breakers
  "schneider-acti9-ic60n-mcb-3p-63a-c": "circuit,breaker,electrical",
  "abb-tmax-xt-mccb-3p-250a-36ka": "circuit,breaker,industrial",
  "schneider-tesys-d-lc1d80-contactor-80a-3p": "contactor,electrical,relay",
  "siemens-sirius-3rv2-motor-protection-breaker": "breaker,motor,electrical",
  "abb-ot160e3-changeover-switch-160a-3p": "switch,electrical,panel",
  "schneider-easy9-rccb-4p-63a-30ma": "circuit,breaker,electrical",
  "chint-nxr-25-thermal-overload-relay": "relay,electrical,control",
  "socomec-sirco-load-break-switch-400a-4p": "switch,electrical,industrial",
  // Safety & Lifting
  "galvanized-steel-wire-rope-6x36-iwrc-16mm": "steel,wire,rope",
  "crosby-g209-screw-pin-anchor-shackle-3-25t": "shackle,rigging,steel",
  "polyester-round-sling-5t-3m-endless": "sling,lifting,strap",
  "lever-hoist-come-along-3t-1-5m": "hoist,chain,lifting",
  "3m-dbi-sala-full-body-safety-harness": "safety,harness,climbing",
  "electric-chain-hoist-2t-380v-3phase": "hoist,chain,crane",
  // Mechanical & Bearings
  "skf-6205-2rs1-deep-groove-ball-bearing": "bearing,ball,steel",
  "skf-snl-517-plummer-block-housing": "bearing,housing,machine",
  "gates-hi-power-ii-b-section-v-belt": "belt,pulley,machine",
  "martin-ansi-40-roller-chain-10ft": "chain,sprocket,machine",
  "lovejoy-l-090-jaw-coupling-with-spider": "coupling,machine,shaft",
  // Hardware & Fasteners
  "grade-8-8-hex-bolt-set-zinc-m16x60": "bolts,nuts,hardware",
  "stainless-steel-316-hex-nut-washer-m12": "nuts,washers,stainless",
  "hilti-hst3-expansion-anchor-m12x100": "anchor,bolt,concrete",
};
