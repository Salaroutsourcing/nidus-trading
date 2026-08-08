/**
 * Focus catalog — only high-demand, high-margin industrial SKUs.
 * Used by seed.ts to trim the extended catalog.
 */
export const KILLER_EXTENDED_SLUGS = [
  // Switchgear (high margin, constant contractor demand)
  "schneider-acti9-ic60n-mcb-3p-63a-c",
  "abb-tmax-xt-mccb-3p-250a-36ka",
  "schneider-tesys-d-lc1d80-contactor-80a-3p",
  "schneider-easy9-rccb-4p-63a-30ma",
  "siemens-sirius-3rv2-motor-protection-breaker",
  "abb-ot160e3-changeover-switch-160a-3p",

  // Specialty cables (volume + project margins)
  "xlpe-armoured-power-cable-4-core-16mm2",
  "frls-fire-resistant-copper-cable-3-core-2-5",
  "welding-cable-70mm2-double-insulated",
  "lapp-olflex-classic-110-control-cable-4g1-5",
  "cat6-uutp-lszh-networking-cable-305m",
  "belden-9540-multi-conductor-shielded-cable-24awg-10c",
  "vfd-drive-cable-emc-shielded-3core-4mm2",
  "instrumentation-cable-shielded-1pair-18awg",

  // Automation sensors (repeat OEM / MRO buys)
  "omron-e3z-d82-photoelectric-sensor-diffuse",
  "autonics-pr18-8dn-inductive-proximity-sensor",
  "pt100-rtd-temperature-sensor-3-wire-class-a",

  // Mechanical consumables
  "skf-6205-2rs1-deep-groove-ball-bearing",
  "gates-hi-power-ii-b-section-v-belt",
  "martin-ansi-40-roller-chain-10ft",

  // Lifting & safety (project + compliance demand)
  "galvanized-steel-wire-rope-6x36-iwrc-16mm",
  "electric-chain-hoist-2t-380v-3phase",
  "lever-hoist-come-along-3t-1-5m",
  "crosby-g209-screw-pin-anchor-shackle-3-25t",
  "3m-dbi-sala-full-body-safety-harness",

  // Fasteners / anchors
  "grade-8-8-hex-bolt-set-zinc-m16x60",
  "hilti-hst3-expansion-anchor-m12x100",
] as const;

/** Base seed product names to keep (high volume staples). */
export const KILLER_BASE_NAMES = [
  "Industrial Copper Wiring Cable",
  "Mild Steel Plate 6mm",
  "Heavy Duty Industrial Caster Wheel 6 inch",
] as const;
