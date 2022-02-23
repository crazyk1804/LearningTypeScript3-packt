import { Country, DataPoint } from '../domain';

export interface PopulationService {
    getAllCountries(): Promise<Country[]>;
    getCountry(countryCode: string): Promise<Country>;
    getTotalPopulation(country: Country, dateRange: string): Promise<DataPoint[]>;
    getMalePopulation(country: Country, dataRange: string): Promise<DataPoint[]>;
    getFemalePopulation(country: Country, dataRange: string): Promise<DataPoint[]>;
    getLifeExpectancy(country: Country, dataRange: string): Promise<DataPoint[]>;
    getAdultFemaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]>;
    getAdultMaleLiteracy(country: Country, dataRange: string): Promise<DataPoint[]>;
    getMaleSurvivalToAge65(country: Country, dataRange: string): Promise<DataPoint[]>;
    getFemaleSurvivalToAge65(country: Country, dataRange: string): Promise<DataPoint[]>;
}