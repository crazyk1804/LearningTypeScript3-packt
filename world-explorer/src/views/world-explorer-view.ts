import Chart = require('chart.js');
import { Country } from "../domain";
import { ChartDetails } from "./chart-details.intf";
import { checkElementById } from "./utils";
import { WorldExplorerView } from "./world-explorer-view.intf";

export class WorldExplorerHTMLView implements WorldExplorerView {
    private readonly _countrySelect: HTMLSelectElement;
    private readonly _indicatorSelect: HTMLSelectElement;
    private readonly _fromYearSelect: HTMLSelectElement;
    private readonly _toYearSelect: HTMLSelectElement;
    private readonly _chartTypeSelect: HTMLSelectElement;
    private readonly _chartConfigurationForm: HTMLFormElement;
    private readonly _canvas: HTMLCanvasElement;
    private _chart?: Chart;

    constructor() {
        this._countrySelect = checkElementById('countrySelect');
        this._indicatorSelect = checkElementById('indicatorSelect');
        this._fromYearSelect = checkElementById('fromYearSelect');
        this._toYearSelect = checkElementById('toYearSelect');
        this._chartTypeSelect = checkElementById('chartTypeSelect');
        this._chartConfigurationForm = checkElementById('chartConfigurationForm');
        this._canvas = checkElementById('worldExplorerChart');
    }

    displayErrorMessage(message: string): void {
        if(!message) {
            throw new Error('An error message must be provided');
        }
        alert(message);
    }

    displayCountries(countries: Country[]): void {
        if(!countries) {
            throw new Error('The list of countries to display must be provided!');
        } else if (countries.length === 0) {
            throw new Error('The list of countries cannot be empty!');
        }

        console.log('Displaying the countries');
        let countriesOptions = '';
        countries.forEach(country => {
            countriesOptions += `<option value="${ country.id }">${ country.name }</option>`;
        });
        this._countrySelect.innerHTML = countriesOptions;
    }

    displayYears(years: number[]): void {
        if(!years) {
            throw new Error('The list of years must be provided!');
        } else if (years.length === 0) {
            throw new Error('The list of years cannot be empty!');
        }

        console.log('Displaying the years');
        let fromYearOptions = '';
        let toYearOptions = '';

        years.forEach(year => {
            fromYearOptions += `<option value="${ year }">${ year }</option>`;
        });
        years.reverse().forEach(year => {
            toYearOptions += `<option value=${ year }">${ year }</option>`;
        });
        this._fromYearSelect.innerHTML = fromYearOptions;
        this._toYearSelect.innerHTML = toYearOptions;
    }

    getChartFormDetails(): {
        error?: string,
        countryId?: string,
        indicator?: string,
        fromYear?: number,
        toYear?: number,
        chartType?: string,
    } {
        if(this._chartConfigurationForm.checkValidity() === false) {
            this._chartConfigurationForm.reportValidity();
            return {
                error: 'The chart configuration form is invalid!'
            };
        }
        if(this._countrySelect.checkValidity() === false) {
            this._countrySelect.reportValidity();
            return {
                error: 'A country must be selected!'
            };
        }
        if(this._indicatorSelect.checkValidity() === false) {
            this._indicatorSelect.reportValidity();
            return {
                error: 'An indicator must be selected!'
            };
        }
        if(this._fromYearSelect.checkValidity() === false) {
            this._fromYearSelect.reportValidity();
            return {
                error: 'A start year must be selected!'
            };
        }
        if(this._toYearSelect.checkValidity() === false) {
            this._toYearSelect.reportValidity();
            return {
                error: 'An end year must be selected!'
            };
        }
        if(this._chartTypeSelect.checkValidity() === false) {
            this._chartTypeSelect.reportValidity();
            return {
                error: 'A chart type must be selected!'
            };
        }

        const countryId: string = this._countrySelect.value;
        const indicator: string = this._indicatorSelect.value;
        const fromYear = Number.parseInt(this._fromYearSelect.value);
        const toYear = Number.parseInt(this._toYearSelect.value);
        const chartType: string = this._chartTypeSelect.value;
        return {
            countryId: countryId,
            indicator: indicator,
            fromYear: fromYear,
            toYear: toYear,
            chartType: chartType
        };
    }

    displayChart(chartDetails: ChartDetails): void {
        if(!chartDetails) {
            throw new Error('The chart details must be provided!');
        }

        const dataLabels: string[] = [];
        const dataValues: number[] = [];

        chartDetails.data.forEach(dataPoint => {
            dataLabels.push(dataPoint.date);
            dataValues.push(dataPoint.value);
        });

        if(this._chart) {
            this._chart.clear();
            this._chart.destroy();
        }

        this._chart = new Chart(this._canvas, {
            type: chartDetails.chartType,
            data: {
                labels: dataLabels,
                datasets: [{
                    data: dataValues,
                    label: chartDetails.dataLabel,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75, 192, 192, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                }],
            },
            options: {
                animation: {
                    animateRotate: true,
                    easing: 'easeOutQuart'
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: chartDetails.yAxisLabel
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: chartDetails.yAxisLabel
                        }
                    }]
                },
                title: {
                    display: true,
                    text: chartDetails.title
                }
            }
        });
    }
}