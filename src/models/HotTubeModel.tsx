export interface CabinetColor {
  color: string;
  selectorColorIMG: string;
  cabinetIMG: string;
}

export interface ShellColor {
  name: string;
  selectorColorIMG: string;
  shellIMG: string;
}

export interface Colors {
  cabinetColors: CabinetColor[];
  shellColors: ShellColor[];
}

export interface Extra {
  name: string;
  description: string;
  value: string;
}

export interface AdditionalOption {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isDefault: boolean;
}

export interface AdditionalOptions {
  waterCare: AdditionalOption[];
  entertainment: AdditionalOption[];
  control: AdditionalOption[];
  [key: string]: AdditionalOption[];
}

export interface HotTube {
  id: string;
  collection: string;
  model: string;
  price: string;
  colors: Colors;
  additionalOptions?: AdditionalOptions;
  seating: string;
  dimensions: string;
  jets: string;
  watercare: string;
  usermanualURL: string;
  extras: Extra[];
}
