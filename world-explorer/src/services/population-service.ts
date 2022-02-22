import { PopulationService } from "./population-service.intf";
import { Country, DataPoint } from "../domain";
import { WorldBankApiV2, WorldBankApiV2CountryResponse, worldBankApiV2CountryResponseValidator, WorldBankApiV2Formats, WorldBankApiV2Params } from "./world-bank-api";
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';

export class PopulationServiceImpl implements PopulationService {
    private readonly countriesApiBaseUrl: string;

    constructor(baseUrl: string) {
        if(!baseUrl || baseUrl.trim().length === 0) {
            throw new Error('The base URL must be provided!');
        } else if(
            !baseUrl.toLocaleLowerCase().startsWith('https://') && 
            !baseUrl.toLocaleLowerCase().startsWith('http://')
        ) {
            throw new Error('The URL looks invalid. It sould start with "http://" or "https://"');
        }

        let cleanBaseUrl = baseUrl.trim();
        if(cleanBaseUrl.endsWith('/')) {
            cleanBaseUrl = cleanBaseUrl.substr(0, cleanBaseUrl.lastIndexOf('/'));
        }

        this.countriesApiBaseUrl = `${ cleanBaseUrl }/${ WorldBankApiV2.VERSION }/${ WorldBankApiV2.COUNTRIES_API_PREFIX }`;
        console.log(`Population service initialized. \nCountries API URL: [${ this.countriesApiBaseUrl }]`);
    }

    async getAllCountries(): Promise<Country[]> {
        let fetchUrl: string = [
            this.countriesApiBaseUrl, '?',
            WorldBankApiV2Params.FORMAT, '=',
            WorldBankApiV2Formats.JSON, '&',
            WorldBankApiV2Params.PER_PAGE, '=320'
        ].join('');

        const response: Response = await fetch(fetchUrl);
        const checkedResponse: Response = await this.checkResponseStatus(response);
        let jsonContent: unknown = await this.getJsonContent(checkedResponse);
        const validationResult = worldBankApiV2CountryResponseValidator.decode(jsonContent);

        // throw an error if validation failes
        ThrowReporter.report(validationResult);

        console.log('Response received and validated');
        // from here on, we know that the validation has passed
        const countries = (validationResult.value as WorldBankApiV2CountryResponse)[1];
    }

    async getCountry(countryCode: string): Promise<Country> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getTotalPopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getFemalePopulation(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getMalePopulation(country: Country, dataRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getAdultFemaleLiteracy(country: Country, dateRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getAdultMaleLteracy(country: Country, dataRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getLifeExpectancy(country: Country, dataRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getMaleSurvivalToAge65(country: Country, dataRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async getFemaleSurvivalToAge65(country: Country, dataRange: string): Promise<DataPoint[]> {
        // TODO
        throw new Error('not implemented yet');
    }

    async checkResponseStatus(response: Response): Promise<Response> {
        if(!response) {
            throw new Error('A response must be provided');
        }

        if(response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    async getJsonContent(response: Response): Promise<unknown> {
        if(!response) {
            throw new Error('A response must be provided!');
        }

        let jsonContent: unknown = undefined;
        try {
            jsonContent = await response.json();
        } catch(error: any) {
            console.error('Failed to parse the response as JSON: ', error);
            throw new Error(`Could not parse the response body as JSON. Error: ${ error.message }`);
        }

        return jsonContent;
    }


}