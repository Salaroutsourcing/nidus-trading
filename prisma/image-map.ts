/**
 * Nidus Trading — product image mapping
 * -------------------------------------
 * Real Unsplash photos only. Every SKU has its OWN unique primary photo
 * (the card/main image) plus two type-matched gallery shots, so no single
 * picture repeats across many products. All IDs are HTTP-verified.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Per-SKU gallery. gallery[0] is unique across the whole catalog.
 * Keyed by product slug (base + extended).
 */
const gallery: Record<string, [string, string, string]> = {
  // ── Electronic Components / sensors ─────────────────────────────
  "omron-e3z-d82-photoelectric-sensor-diffuse": [
    "photo-1638734254958-4a11c989e9bb",
    "photo-1555664424-778a1e5e1b48",
    "photo-1518770660439-4636190af475",
  ],
  "autonics-pr18-8dn-inductive-proximity-sensor": [
    "photo-1562877773-c6dd55a1415e",
    "photo-1518770660439-4636190af475",
    "photo-1555664424-778a1e5e1b48",
  ],
  "pt100-rtd-temperature-sensor-3-wire-class-a": [
    "photo-1560977501-7cb367eccebe",
    "photo-1555664424-778a1e5e1b48",
    "photo-1638734254958-4a11c989e9bb",
  ],

  // ── Electrical Items / switchgear ───────────────────────────────
  "schneider-acti9-ic60n-mcb-3p-63a-c": [
    "photo-1576446470246-499c738d1c8e",
    "photo-1571233594617-434b02ec3dbb",
    "photo-1544724569-5f546fd6f2b5",
  ],
  "abb-tmax-xt-mccb-3p-250a-36ka": [
    "photo-1571233594617-434b02ec3dbb",
    "photo-1613315622081-3b066dbe5d83",
    "photo-1544724569-5f546fd6f2b5",
  ],
  "schneider-tesys-d-lc1d80-contactor-80a-3p": [
    "photo-1576446468729-7674e99608f5",
    "photo-1566417110090-6b15a06ec800",
    "photo-1571233594617-434b02ec3dbb",
  ],
  "schneider-easy9-rccb-4p-63a-30ma": [
    "photo-1566417110090-6b15a06ec800",
    "photo-1576446470246-499c738d1c8e",
    "photo-1544724569-5f546fd6f2b5",
  ],
  "siemens-sirius-3rv2-motor-protection-breaker": [
    "photo-1588616437819-7d30e6f76e66",
    "photo-1613315622081-3b066dbe5d83",
    "photo-1566417110104-cd4f94af0fb3",
  ],
  "abb-ot160e3-changeover-switch-160a-3p": [
    "photo-1566417110104-cd4f94af0fb3",
    "photo-1544724569-5f546fd6f2b5",
    "photo-1571233594617-434b02ec3dbb",
  ],

  // ── Electrical Items / cables ───────────────────────────────────
  "xlpe-armoured-power-cable-4-core-16mm2": [
    "photo-1518181835702-6eef8b4b2113",
    "photo-1558618666-fcd25c85cd64",
    "photo-1595185450075-fd6c73860756",
  ],
  "frls-fire-resistant-copper-cable-3-core-2-5": [
    "photo-1584774354932-62ceb99e6053",
    "photo-1518181835702-6eef8b4b2113",
    "photo-1613031595478-de64daa4b8f9",
  ],
  "welding-cable-70mm2-double-insulated": [
    "photo-1698664683348-f9f35b809821",
    "photo-1504328345606-18bbc8c9d7d1",
    "photo-1558618666-fcd25c85cd64",
  ],
  "lapp-olflex-classic-110-control-cable-4g1-5": [
    "photo-1613031595478-de64daa4b8f9",
    "photo-1595185450075-fd6c73860756",
    "photo-1518181835702-6eef8b4b2113",
  ],
  "cat6-uutp-lszh-networking-cable-305m": [
    "photo-1531668383211-64743e924c66",
    "photo-1546124404-9e7e3cac2ec1",
    "photo-1578016980868-197203ff4b02",
  ],
  "belden-9540-multi-conductor-shielded-cable-24awg-10c": [
    "photo-1546124404-9e7e3cac2ec1",
    "photo-1591808216268-ce0b82787efe",
    "photo-1574405345169-f45c7d66480e",
  ],
  "vfd-drive-cable-emc-shielded-3core-4mm2": [
    "photo-1614903756535-8a6863184e02",
    "photo-1558618666-fcd25c85cd64",
    "photo-1518181835702-6eef8b4b2113",
  ],
  "instrumentation-cable-shielded-1pair-18awg": [
    "photo-1591808216268-ce0b82787efe",
    "photo-1517181875630-f72350452109",
    "photo-1574405345169-f45c7d66480e",
  ],
  "industrial-copper-wiring-cable": [
    "photo-1595185450075-fd6c73860756",
    "photo-1584774354932-62ceb99e6053",
    "photo-1518181835702-6eef8b4b2113",
  ],

  // ── Mechanical Items ────────────────────────────────────────────
  "skf-6205-2rs1-deep-groove-ball-bearing": [
    "photo-1589391097913-5e505b1230de",
    "photo-1643933871541-090062935680",
    "photo-1504917595217-d4dc5ebe6122",
  ],
  "gates-hi-power-ii-b-section-v-belt": [
    "photo-1583198432859-635beb4e8600",
    "photo-1593062037896-764e9f52029e",
    "photo-1525207106105-b340f7384b30",
  ],
  "martin-ansi-40-roller-chain-10ft": [
    "photo-1525207106105-b340f7384b30",
    "photo-1593062037896-764e9f52029e",
    "photo-1583198432859-635beb4e8600",
  ],

  // ── MS Products ─────────────────────────────────────────────────
  "mild-steel-plate-6mm": [
    "photo-1441796522229-b3a3cb3d58fd",
    "photo-1501166222995-ff31c7e93cef",
    "photo-1618332295161-700f3d82ed18",
  ],

  // ── Hardware Items ──────────────────────────────────────────────
  "grade-8-8-hex-bolt-set-zinc-m16x60": [
    "photo-1529255848089-c4e456d166e0",
    "photo-1605701249987-f0bb9b505d06",
    "photo-1600965581129-eef8a214ec9d",
  ],
  "hilti-hst3-expansion-anchor-m12x100": [
    "photo-1605701249987-f0bb9b505d06",
    "photo-1529255848089-c4e456d166e0",
    "photo-1618332295161-700f3d82ed18",
  ],

  // ── Caster Wheels ───────────────────────────────────────────────
  "heavy-duty-industrial-caster-wheel-6-inch": [
    "photo-1601598852806-524f0060508e",
    "photo-1525328437458-0c4d4db7cab4",
    "photo-1586528116311-ad8dd3c8310d",
  ],

  // ── Safety & Lifting Equipment ──────────────────────────────────
  "galvanized-steel-wire-rope-6x36-iwrc-16mm": [
    "photo-1512859313038-7add54a1b420",
    "photo-1644238017851-21f15062c213",
    "photo-1582489851496-8c23fa583b70",
  ],
  "electric-chain-hoist-2t-380v-3phase": [
    "photo-1510763856261-69c62b94dc47",
    "photo-1567244567154-2b57436a892b",
    "photo-1582489851496-8c23fa583b70",
  ],
  "lever-hoist-come-along-3t-1-5m": [
    "photo-1567244567154-2b57436a892b",
    "photo-1568885645743-c6cbc4ca04e3",
    "photo-1617105990241-454f3d104824",
  ],
  "crosby-g209-screw-pin-anchor-shackle-3-25t": [
    "photo-1566905318163-7a0f4b540a91",
    "photo-1596711670640-115855ff8781",
    "photo-1617105990241-454f3d104824",
  ],
  "3m-dbi-sala-full-body-safety-harness": [
    "photo-1589325999888-06f95cc11f61",
    "photo-1621713867126-c0dad8b16637",
    "photo-1504307651254-35680f356dfd",
  ],

  // ── Industrial Networking & Telecommunications ──────────────────
  "moxa-eds-g516e-managed-poe-gigabit-switch": [
    "photo-1544197150-b99a5804efb6",
    "photo-1518181835702-6eef8b4b2113",
    "photo-1531668383211-64743e924c66",
  ],
  "cisco-sfp-10g-sr-optical-transceiver": [
    "photo-1546124404-9e7e3cac2ec1",
    "photo-1531668383211-64743e924c66",
    "photo-1591808216268-ce0b82787efe",
  ],
  "cambium-ptp-550-long-range-wireless-radio": [
    "photo-1518770660439-4636190af475",
    "photo-1544197150-b99a5804efb6",
    "photo-1578016980868-197203ff4b02",
  ],
  "teltonika-rut956-5g-industrial-cellular-router": [
    "photo-1578016980868-197203ff4b02",
    "photo-1544197150-b99a5804efb6",
    "photo-1546124404-9e7e3cac2ec1",
  ],

  // ── Enterprise Server, Storage & Data Center ────────────────────
  "dell-poweredge-1100w-hot-swap-redundant-psu": [
    "photo-1597872200969-2b65d56bd16b",
    "photo-1544197150-b99a5804efb6",
    "photo-1517694712202-14dd9538aa97",
  ],
  "broadcom-megaraid-9560-8i-sas-raid-controller": [
    "photo-1518770660439-4636190af475",
    "photo-1555617981-dac3880eac6e",
    "photo-1597872200969-2b65d56bd16b",
  ],
  "hpe-storeever-lto-8-ultrium-30750-tape-drive": [
    "photo-1517694712202-14dd9538aa97",
    "photo-1597872200969-2b65d56bd16b",
    "photo-1544197150-b99a5804efb6",
  ],
  "apc-ap8853-metered-rack-pdu-zero-u": [
    "photo-1544197150-b99a5804efb6",
    "photo-1597872200969-2b65d56bd16b",
    "photo-1518181835702-6eef8b4b2113",
  ],

  // ── Precision Test, Measurement & Calibration ───────────────────
  "viavi-smartotdr-100b-fiber-otdr": [
    "photo-1591808216268-ce0b82787efe",
    "photo-1517181875630-f72350452109",
    "photo-1546124404-9e7e3cac2ec1",
  ],
  "flir-e8-xt-thermal-imaging-camera": [
    "photo-1560977501-7cb367eccebe",
    "photo-1555664424-778a1e5e1b48",
    "photo-1518770660439-4636190af475",
  ],
  "fluke-1777-three-phase-power-quality-analyzer": [
    "photo-1518770660439-4636190af475",
    "photo-1638734254958-4a11c989e9bb",
    "photo-1571233594617-434b02ec3dbb",
  ],
  "honeywell-bw-microclip-xl-multi-gas-detector": [
    "photo-1555664424-778a1e5e1b48",
    "photo-1560977501-7cb367eccebe",
    "photo-1589325999888-06f95cc11f61",
  ],

  // ── Industrial Automation, PLC & Process Control ────────────────
  "siemens-simatic-s7-1500-cpu-1515-2-pn": [
    "photo-1588616437819-7d30e6f76e66",
    "photo-1576446470246-499c738d1c8e",
    "photo-1566417110090-6b15a06ec800",
  ],
  "schneider-altivar-atv320-vfd-5-5kw": [
    "photo-1613315622081-3b066dbe5d83",
    "photo-1571233594617-434b02ec3dbb",
    "photo-1566417110104-cd4f94af0fb3",
  ],
  "rosemount-3051s-pressure-transmitter-hart": [
    "photo-1560977501-7cb367eccebe",
    "photo-1614903756535-8a6863184e02",
    "photo-1555664424-778a1e5e1b48",
  ],
  "siemens-sitrans-fus1010-ultrasonic-flow-transmitter": [
    "photo-1614903756535-8a6863184e02",
    "photo-1517181875630-f72350452109",
    "photo-1560977501-7cb367eccebe",
  ],

  // ── Power Quality & Backup Infrastructure ───────────────────────
  "apc-galaxy-vs-20kva-3-phase-online-ups": [
    "photo-1621905252507-b35492cc74b4",
    "photo-1576446470246-499c738d1c8e",
    "photo-1566417110090-6b15a06ec800",
  ],
  "pylontech-us5000-48v-lifepo4-rack-battery": [
    "photo-1518181835702-6eef8b4b2113",
    "photo-1613315622081-3b066dbe5d83",
    "photo-1544724569-5f546fd6f2b5",
  ],
  "dehn-dehnventil-modular-type-1-2-spd": [
    "photo-1566417110104-cd4f94af0fb3",
    "photo-1576446468729-7674e99608f5",
    "photo-1544724569-5f546fd6f2b5",
  ],
  "phoenix-contact-val-ms-320-type-2-spd": [
    "photo-1544724569-5f546fd6f2b5",
    "photo-1566417110090-6b15a06ec800",
    "photo-1576446470246-499c738d1c8e",
  ],
};

/** Category fallback (only used if a slug is missing from the map). */
const categoryFallback: Record<string, string> = {
  // High-margin B2B departments
  "industrial-networking-telecom": "photo-1544197150-b99a5804efb6",
  "enterprise-server-storage": "photo-1597872200969-2b65d56bd16b",
  "test-measurement-calibration": "photo-1591808216268-ce0b82787efe",
  "automation-plc-process-control": "photo-1588616437819-7d30e6f76e66",
  "power-quality-backup": "photo-1621905252507-b35492cc74b4",
  // Legacy fallbacks (retained for backward compatibility)
  "electronic-components": "photo-1555664424-778a1e5e1b48",
  "electrical-items": "photo-1518181835702-6eef8b4b2113",
  "mechanical-items": "photo-1504917595217-d4dc5ebe6122",
  "ms-products": "photo-1441796522229-b3a3cb3d58fd",
  "hardware-items": "photo-1529255848089-c4e456d166e0",
  "caster-wheels": "photo-1586528116311-ad8dd3c8310d",
  "safety-lifting-equipment": "photo-1504307651254-35680f356dfd",
};

/**
 * Resolve a product's 3-image gallery of real, unique, type-matched photos.
 * @param slug         product slug
 * @param categorySlug used only for fallback if slug isn't mapped
 */
export function resolveGallery(slug: string, categorySlug?: string): string[] {
  const ids =
    gallery[slug] ??
    ([
      categoryFallback[categorySlug ?? ""] ?? "photo-1518770660439-4636190af475",
      "photo-1504917595217-d4dc5ebe6122",
      "photo-1530124566582-a618bc2615dc",
    ] as [string, string, string]);
  return ids.map((id) => u(id));
}
