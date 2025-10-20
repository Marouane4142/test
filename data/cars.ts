export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: "Essence" | "Diesel" | "Hybride" | "Électrique";
  transmission: "Manuelle" | "Automatique";
  price: number;
  image?: string;
};

const cars: Car[] = [
  { id: "1", brand: "Peugeot", model: "308", year: 2019, mileage: 45000, fuel: "Essence", transmission: "Manuelle", price: 14990 },
  { id: "2", brand: "Renault", model: "Clio", year: 2021, mileage: 22000, fuel: "Essence", transmission: "Automatique", price: 16990 },
  { id: "3", brand: "Volkswagen", model: "Golf", year: 2018, mileage: 60000, fuel: "Diesel", transmission: "Manuelle", price: 15990 },
  { id: "4", brand: "Tesla", model: "Model 3", year: 2022, mileage: 15000, fuel: "Électrique", transmission: "Automatique", price: 29990 },
  { id: "5", brand: "BMW", model: "Serie 1", year: 2017, mileage: 78000, fuel: "Diesel", transmission: "Automatique", price: 17990 },
  { id: "6", brand: "Toyota", model: "Yaris", year: 2020, mileage: 30000, fuel: "Hybride", transmission: "Automatique", price: 18490 }
];

export default cars;