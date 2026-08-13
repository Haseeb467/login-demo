import { Item } from './types';

export const floorplans: Item[] = [
  {
    id: 'fp-1',
    name: 'Longwood 177',
    price: 228492,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&h=800',
    details: {
      beds: 3,
      baths: 2,
      cars: 2,
      minFrontage: '10.5m',
      minDepth: '25m',
      totalArea: '17.7sq'
    }
  },
  {
    id: 'fp-2',
    name: 'Ashton 220',
    price: 254100,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300',
    details: {
      beds: 4,
      baths: 2,
      cars: 2,
      minFrontage: '12.5m',
      minDepth: '28m',
      totalArea: '22.0sq'
    }
  },
  {
    id: 'fp-3',
    name: 'Belmont 240',
    price: 279000,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400&h=300',
    details: {
      beds: 4,
      baths: 2,
      cars: 2,
      minFrontage: '14.0m',
      minDepth: '30m',
      totalArea: '24.0sq'
    }
  },
  {
    id: 'fp-4',
    name: 'Carmel 280',
    price: 310500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=300',
    details: {
      beds: 4,
      baths: 3,
      cars: 2,
      minFrontage: '16.0m',
      minDepth: '32m',
      totalArea: '28.0sq'
    }
  },
  {
    id: 'fp-5',
    name: 'Dawson 300',
    price: 345000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400&h=300',
    details: {
      beds: 5,
      baths: 3,
      cars: 2,
      minFrontage: '18.0m',
      minDepth: '32m',
      totalArea: '30.0sq'
    }
  }
];

export const facades: Item[] = [
  {
    id: 'fac-1',
    name: 'Lotus',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'fac-2',
    name: 'Contemporary',
    price: 0,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'fac-3',
    name: 'Classic',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'fac-4',
    name: 'Modern',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 'fac-5',
    name: 'Provincial',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export const externalColours: Item[] = [
  { id: 'ext-1', name: 'Driftwood', price: 0, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'ext-2', name: 'Dawn', price: 500, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'ext-3', name: 'Haze', price: 0, image: 'https://images.unsplash.com/photo-1600607687989-ce400460c8c0?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'ext-4', name: 'Twilight', price: 0, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'ext-5', name: 'Breeze', price: 0, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'ext-6', name: 'Dusk', price: 0, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300&h=200' },
];

export const internalColours: Item[] = [
  { id: 'int-1', name: 'Birch', price: 0, image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'int-2', name: 'Palm', price: 0, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'int-3', name: 'Dove', price: 395, image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'int-4', name: 'Ebony', price: 0, image: 'https://images.unsplash.com/photo-1600566753086-00f18efc204a?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'int-5', name: 'Maple', price: 0, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 'int-6', name: 'Raven', price: 395, image: 'https://images.unsplash.com/photo-1600607687989-ce400460c8c0?auto=format&fit=crop&q=80&w=300&h=200' },
];

export const upgrades: Record<string, Item[]> = {
  'Roofing': [
    { id: 'roof-1', name: 'Concrete Roof Tiles - Elabana', price: 0, image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 'roof-2', name: 'Concrete Roof Tiles - Atura', price: 1400, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 'roof-3', name: 'Colorbond Roof', price: 2990, image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 'roof-4', name: 'Sarked Roof Upgrade', price: 2250, image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 'roof-5', name: 'Roof Ventilation System', price: 890, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400&h=300' },
  ],
  'Driveway': ['Exposed Aggregate Driveway', 'Coloured Concrete Driveway', 'Plain Concrete Driveway', 'Driveway Crossover', 'Sealed Driveway Finish'].map((name, index) => ({ id: `drive-${index}`, name, price: [1850, 1420, 0, 680, 990][index], image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Front Entry Door': ['Standard Entry Door', 'Premium Timber Entry Door', 'Glazed Entry Door', 'Pivot Entry Door', 'Designer Door Handle'].map((name, index) => ({ id: `entry-${index}`, name, price: [0, 850, 1290, 2450, 390][index], image: 'https://images.unsplash.com/photo-1600566753086-00f18efc204a?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Garage Door': ['Painted Infill Above Garage', 'Panel Lift Garage Door', 'Timber Look Garage Door', 'Garage Door Motor', 'Remote Control Package'].map((name, index) => ({ id: `garage-${index}`, name, price: [0, 1060, 2025, 650, 280][index], image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Heating & Cooling': ['Ducted Heating', 'Split System Cooling', 'Evaporative Cooling', 'Ceiling Fans', 'Double Glazing Upgrade'].map((name, index) => ({ id: `climate-${index}`, name, price: [0, 1750, 3890, 690, 5200][index], image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Kitchen': ['Stone Benchtop', 'Waterfall Edge', '900mm Appliance Package', 'Soft Close Drawers', 'Walk-in Pantry Fitout'].map((name, index) => ({ id: `kitchen-${index}`, name, price: [1850, 980, 3390, 740, 2100][index], image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Bathroom': ['Freestanding Bath', 'Frameless Shower Screen', 'Tiled Shower Niche', 'Designer Tapware', 'Wall Hung Vanity'].map((name, index) => ({ id: `bath-${index}`, name, price: [1650, 890, 420, 760, 1150][index], image: 'https://images.unsplash.com/photo-1600566753086-00f18efc204a?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Ensuite': ['Double Vanity', 'Large Format Tiles', 'Rainfall Shower', 'Heated Towel Rail', 'Premium Ensuite Package'].map((name, index) => ({ id: `ensuite-${index}`, name, price: [1280, 940, 560, 480, 2790][index], image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Laundry': ['Overhead Cabinetry', 'Laundry Sink Mixer', 'Washing Machine Stops', 'Tall Broom Cabinet', 'Laundry Benchtop'].map((name, index) => ({ id: `laundry-${index}`, name, price: [790, 190, 260, 520, 680][index], image: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?auto=format&fit=crop&q=80&w=400&h=300' })),
  'Home Security': ['Front Door Camera', 'Home Alarm System', 'Video Doorbell', 'Smart Lock', 'Security Sensor Package'].map((name, index) => ({ id: `security-${index}`, name, price: [1100, 1890, 420, 690, 980][index], image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400&h=300' })),
};
