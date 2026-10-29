import { Product, Testimonial } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'overdrive',
    name: 'Vibe District Overdrive',
    tagline: 'Precision engineered. Unmatched silence.',
    category: 'headphones',
    price: 7999,
    originalPrice: 9999,
    rating: 4.9,
    reviewCount: 342,
    description: 'Flagship wireless over-ear headphones with custom 40mm acoustic drivers, military-grade hybrid ANC, and an uncompromising 40-hour battery architecture.',
    longDescription: 'The Overdrive represents our purest acoustic statement. Sculpted from anodized aluminum, memory foam, and structural carbon-fiber accents, it wraps your senses in reference-grade sound while eliminating exterior commotion with active phase cancellation.',
    editorialHighlight: 'Engineered for the listener who refuses to compromise between uncompromising silence and acoustic truth.',
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Stealth Silver', hex: '#C4C8CC' },
      { name: 'Midnight Charcoal', hex: '#24272C' }
    ],
    specs: {
      type: 'Over-Ear Wireless Headphones',
      driver: '40mm Custom Beryllium Diaphragm',
      batteryLife: '40 Hours (ANC On) / 55 Hours (ANC Off)',
      anc: 'Adaptive Hybrid Active Noise Cancellation (-42dB)',
      charging: 'USB-C Quick Charge (10 min = 5 hours play)',
      connectivity: 'Bluetooth 5.4, AAC, LDAC & 3.5mm Lossless',
      weight: '254 grams',
      waterResistance: 'IPX4 Splash Resistant',
      frequencyResponse: '10Hz – 42,000Hz (Hi-Res Audio Certified)',
      latency: '< 38ms Ultra-Low Latency Mode',
      intendedUsage: 'Daily commuting, studio monitoring, long-haul travel'
    },
    features: [
      {
        title: 'Hybrid Active Noise Cancellation',
        description: 'Four external feedforward and two internal feedback microphones continuously sample ambient acoustics at 32,000 times per second.'
      },
      {
        title: 'Precision Acoustic Chamber',
        description: 'Tuned micro-perforated acoustic cavity isolates lower frequencies to eliminate phase distortion and provide visceral, tight sub-bass.'
      },
      {
        title: 'Ergonomic Memory Mesh',
        description: 'Soft-touch protein leather wrapped around high-density memory foam distributes clamping pressure evenly over temple points.'
      },
      {
        title: '40-Hour Sustained Endurance',
        description: 'High-density lithium polymer cell provides up to 40 hours of continuous high-fidelity playback on a single charge.'
      }
    ],
    inTheBox: [
      'Vibe District Overdrive Headphones',
      'Hard-shell Magnetic Travel Case',
      'Braided 3.5mm to 3.5mm Lossless Audio Cable (1.2m)',
      'USB-C to USB-C Fast-Charging Cable',
      'Airline Flight Adapter',
      'Quick Start Guide & Warranty Documentation'
    ],
    images: [
      './images/products/hero-overdrive.jpg',
      './images/products/overdrive-main.jpg',
      './images/products/overdrive-angle.jpg'
    ],
    badge: 'Flagship Edition',
    highlighted: true
  },
  {
    id: 'pulse',
    name: 'Vibe District Pulse',
    tagline: 'Compact architecture. Infinite depth.',
    category: 'earbuds',
    price: 3999,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 289,
    description: 'Compact true wireless earbuds featuring dual dynamic neodymium drivers, intelligent ambient awareness, and a pebble-smooth matte charging case.',
    longDescription: 'Pulse condenses studio-grade acoustic performance into an organic, pebble-contoured earbud that sits flush with your ear concha. Seamless gesture controls and transparent ambient passthrough let you effortlessly toggle between total immersion and street awareness.',
    editorialHighlight: 'Pocketable dimensions that carry an expansive acoustic stage wherever the district leads you.',
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Frosted White', hex: '#F0F0F0' },
      { name: 'Gunmetal Gray', hex: '#4A4E53' }
    ],
    specs: {
      type: 'True Wireless In-Ear Earbuds',
      driver: '11mm Graphene Dual Dynamic Drivers',
      batteryLife: '32 Hours Total (8h buds + 24h case)',
      anc: 'Smart Adaptive Noise Cancellation (-35dB)',
      charging: 'USB-C & Qi Wireless Charging Supported',
      connectivity: 'Bluetooth 5.3, AAC, SBC, aptX Adaptive',
      weight: '4.2g per earbud (44g total with case)',
      waterResistance: 'IPX5 Sweat & Water Resistance',
      frequencyResponse: '20Hz – 24,000Hz',
      latency: '< 45ms Gaming & Video Mode',
      intendedUsage: 'Workouts, daily commute, voice calls & urban mobility'
    },
    features: [
      {
        title: 'Dynamic Acoustic Isolation',
        description: 'Tightly calibrated silicone ear tips paired with active noise filtering suppress drone frequencies up to -35dB.'
      },
      {
        title: 'Crystal Clear Beamforming Calls',
        description: 'Three beamforming microphones on each earbud leverage wind-shielding mesh and AI noise reduction for clean voice clarity.'
      },
      {
        title: 'Qi Wireless & Fast Power',
        description: 'Drop the pocket-sized charging case on any Qi-compatible pad. 10 minutes plugged in yields 2 full hours of playtime.'
      },
      {
        title: 'IPX5 Sweat & Weather Shield',
        description: 'Engineered with nano-coating protection to withstand intense workouts, unexpected rain, and active gym sessions.'
      }
    ],
    inTheBox: [
      'Vibe District Pulse Earbuds (Left & Right)',
      'Matte Black Wireless Charging Case',
      '3 Pairs of Ergonomic Silicone Ear Tips (S, M, L)',
      'USB-C Charging Cable',
      'Safety Guide & Documentation'
    ],
    images: [
      './images/products/pulse-main.jpg',
      './images/products/air-main.jpg'
    ],
    badge: 'Bestseller'
  },
  {
    id: 'studio',
    name: 'Vibe District Studio',
    tagline: 'Uncolored accuracy. Reference precision.',
    category: 'headphones',
    price: 5999,
    originalPrice: 7499,
    rating: 4.9,
    reviewCount: 176,
    description: 'Audiophile over-ear headphones built with 50mm titanium-plated drivers for a neutral, uncompromising frequency curve and all-day fatigue-free listening.',
    longDescription: 'Created for audio creators, sound designers, and discerning music lovers. Studio delivers surgical transient response, deep linear extension, and an open soundstage that reveals micro-textures in your favorite recordings.',
    editorialHighlight: 'Honest, pristine, uncolored playback designed around the philosophy that master tracks should be heard as intended.',
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Machined Silver', hex: '#B8BFC6' }
    ],
    specs: {
      type: 'Reference Over-Ear Headphones',
      driver: '50mm Titanium-Coated Neodymium Drivers',
      batteryLife: '50 Hours Wireless Playback',
      anc: 'Passive Acoustic Isolation Chamber (-28dB)',
      charging: 'USB-C Fast Charging',
      connectivity: 'Bluetooth 5.3 + Detachable 3.5mm/6.35mm Coiled Cable',
      weight: '272 grams',
      waterResistance: 'IPX4 Dust & Moisture Resilient',
      frequencyResponse: '8Hz – 45,000Hz Studio High-Res',
      latency: '< 30ms Wired / 42ms Wireless',
      intendedUsage: 'Audio mixing, home audiophile listening, precision gaming'
    },
    features: [
      {
        title: '50mm Titanium Drivers',
        description: 'Ultra-stiff titanium-coated diaphragms produce razor-sharp transients without harmonic breakup even at peak volumes.'
      },
      {
        title: 'Dual Mode Freedom',
        description: 'Switch freely between 50-hour wireless convenience and zero-latency wired monitoring with the included gold-plated cable.'
      },
      {
        title: 'Floating Headband Suspension',
        description: 'Self-adjusting steel headband eliminates hot spots on the crown of your head during marathon studio sessions.'
      },
      {
        title: 'Interchangeable Velour & Leather Cups',
        description: 'Comes with both cooling breathable velour pads for studio work and plush leatherette for maximum passive isolation.'
      }
    ],
    inTheBox: [
      'Vibe District Studio Headphones',
      'Dual Cushion Sets (Velour & Protein Leather)',
      '1.5m Detachable Coiled Cable + 6.35mm Gold Adapter',
      'USB-C High-Speed Cable',
      'Reinforced Canvas Pouch',
      'Acoustic Calibration Certificate'
    ],
    images: [
      './images/products/studio-main.jpg',
      './images/products/studio-angle.jpg'
    ],
    badge: 'Pro Audio'
  },
  {
    id: 'air',
    name: 'Vibe District Air',
    tagline: 'Featherlight freedom. Pure everyday sound.',
    category: 'earbuds',
    price: 2499,
    originalPrice: 3299,
    rating: 4.7,
    reviewCount: 412,
    description: 'Ultra-lightweight wireless earbuds weighing just 3.8g per bud, tuned for effortless casual listening, crisp speech clarity, and seamless all-day comfort.',
    longDescription: 'You will forget you are wearing them. Vibe District Air combines an open semi-in-ear acoustic geometry with our balanced 13mm composite drivers, giving you natural spatial balance without ear canal fatigue.',
    editorialHighlight: 'Effortless minimalism distilled into 3.8 grams of pure acoustic comfort.',
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Pure White', hex: '#FAFAFA' }
    ],
    specs: {
      type: 'Semi-In-Ear Wireless Earbuds',
      driver: '13mm Bio-Cellulose Composite Drivers',
      batteryLife: '28 Hours Total (6h buds + 22h case)',
      anc: 'Environmental Noise Cancellation (ENC for calls)',
      charging: 'USB-C Fast Charging',
      connectivity: 'Bluetooth 5.3, Instant Auto-Pairing',
      weight: '3.8g per earbud (36g total with slim case)',
      waterResistance: 'IPX4 Water & Sweat Proof',
      frequencyResponse: '20Hz – 20,000Hz',
      latency: '< 50ms Low Latency',
      intendedUsage: 'Everyday walking, work meetings, audiobooks & podcasts'
    },
    features: [
      {
        title: '3.8g Featherlight Fit',
        description: 'Ergonomically contoured to rest naturally in the outer ear without creating canal pressure or fatigue.'
      },
      {
        title: '13mm Bio-Cellulose Driver',
        description: 'Delivers warm, open vocal clarity and natural musical separation across acoustic, indie, and electronic genres.'
      },
      {
        title: 'Instant Flip-to-Connect',
        description: 'Pivoting Hall-effect sensor pairs to your mobile device the millisecond you flick open the case lid.'
      },
      {
        title: 'Dual ENC Voice Microphones',
        description: 'Specialized environmental noise filtering clarifies your voice so phone and Zoom calls remain intelligible in windy streets.'
      }
    ],
    inTheBox: [
      'Vibe District Air Earbuds',
      'Ultra-Slim Pocket Charging Case',
      'USB-C Charging Cable',
      'Quick User Guide & Warranty Card'
    ],
    images: [
      './images/products/air-main.jpg',
      './images/products/pulse-main.jpg'
    ],
    badge: 'Lightweight'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Aarav Mehta',
    location: 'Mumbai, India',
    product: 'Vibe District Overdrive',
    rating: 5,
    headline: 'Redefined my morning commute completely.',
    review: 'The active noise cancellation blocks the Mumbai local and metro rumble effortlessly. The matte black finish looks like a high-end luxury architectural object. Worth every rupee.',
    date: '2 weeks ago'
  },
  {
    id: 'rev-2',
    name: 'Kavya S.',
    location: 'Bengaluru, India',
    product: 'Vibe District Studio',
    rating: 5,
    headline: 'Surgical accuracy for audio editing.',
    review: 'As an audio producer, I need flat, truthful low-end response. The Studio delivers neutral highs without that harsh metallic fatigue. The dual velour pads are an absolute blessing.',
    date: '1 month ago'
  },
  {
    id: 'rev-3',
    name: 'Rohan Deshmukh',
    location: 'Pune, India',
    product: 'Vibe District Pulse',
    rating: 5,
    headline: 'Remarkably compact with huge bass depth.',
    review: 'The charging case slips into my coin pocket without bulging. Sound separation on jazz and synthwave tracks is astonishing for true wireless earbuds under ₹4,000.',
    date: '3 weeks ago'
  },
  {
    id: 'rev-4',
    name: 'Ananya Sharma',
    location: 'New Delhi, India',
    product: 'Vibe District Air',
    rating: 5,
    headline: 'Barely feels like anything in the ear.',
    review: 'I wear them through 6 hours of work calls daily without ear fatigue. The microphone cuts through ambient AC hum cleanly, and battery life easily gets me through two full days.',
    date: '2 weeks ago'
  }
];

export const BRAND_VALUES = [
  {
    number: '01',
    title: 'Precision Acoustic Architecture',
    description: 'Every transducer, acoustic chamber, and dampening mesh is engineered with sub-millimeter tolerances to eliminate unwanted harmonic resonances.'
  },
  {
    number: '02',
    title: 'Monochromatic Restraint',
    description: 'We believe audio hardware should enrich your personal atmosphere, not distract with gaudy logos, loud colors, or aggressive angles.'
  },
  {
    number: '03',
    title: 'Uncompromised Ergonomics',
    description: 'High-density memory foam, counterbalanced weight distribution, and tactile mechanical controls guarantee effortless wear for hours on end.'
  },
  {
    number: '04',
    title: 'Transparent Truth',
    description: 'Sound reproduced honestly. Balanced midrange, subterranean sub-bass, and airy high-frequency extension exactly as the artists mastered it.'
  }
];

export const COMPARISON_FEATURES = [
  { key: 'type', label: 'Form Factor' },
  { key: 'driver', label: 'Transducer / Driver' },
  { key: 'anc', label: 'Noise Cancellation' },
  { key: 'batteryLife', label: 'Battery Architecture' },
  { key: 'connectivity', label: 'Connectivity & Codecs' },
  { key: 'waterResistance', label: 'Water & Sweat Rating' },
  { key: 'weight', label: 'Weight' },
  { key: 'intendedUsage', label: 'Ideal Environment' },
  { key: 'price', label: 'Price (INR)' }
];
