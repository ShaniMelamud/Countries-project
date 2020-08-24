import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { CountryModel } from 'src/app/models/country.model';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
    public countries: CountryModel[];
    private allCountries: CountryModel[];
    public searchText: string;

    constructor(private myCountriesService: CountriesService) { }

    async ngOnInit() {
        try {
            this.allCountries = await this.myCountriesService.getAllCountriesAsync();
            this.resetCountries();
        }
        catch (err) { alert(err.message) };
    }

    public search() {
        if (this.searchText == "") {
            this.resetCountries();
        } else {
            this.countries = this.allCountries.filter(country => {
                return country.name.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) ||
                    country.capital.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
            });
        }
    }

    private resetCountries() {
        this.countries = this.allCountries;
    }
}
