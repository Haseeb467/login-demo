export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  details?: Record<string, any>;
}

export interface AppState {
  step: number;
  showWelcomeModal: boolean;
  region: string;
  hasLand: boolean;
  landDetails: {
    lotNumber: string;
    estateName: string;
    suburb: string;
    landWidth: string;
    landDepth: string;
    storeys: string;
    preferredLocation: string;
  };
  authMode: 'register' | 'login';
  user: {
    firstName: string;
    surname: string;
    phone: string;
    email: string;
  };
  selections: {
    floorplan: Item | null;
    facade: Item | null;
    externalColour: Item | null;
    internalColour: Item | null;
    upgrades: Record<string, Item>;
  };
}
