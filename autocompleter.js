Vue.component('v-autocompleter', {

    data: function() {
        return {
            googleSearch: "",
            cities: window.cities,
            //googleResults: false,
            autocompleterResults: true,
            current: -1,
            currentResults: -1,
            filteredCities: [],
            autocompleterIsActive: false,
        }
    },

    watch: {

    /**
     * Funkcja, która filtruje listę miast, zawierających wpisaną frazę
     * Obserwuje przejścia strzałkami po liście w autocopleterze.
     * Przy przesuwaniu po liście,
     * wartość w impucie się zmienia, a lista pozostaje niezmieniona.
     */

        googleSearch: function() {
            if (this.autocompleterIsActive)
            {
                return;
            }

            let filtered = this.cities.filter(city => (city.name.includes(this.googleSearch) || city.name.toLowerCase().includes(this.googleSearch)));

            if (this.googleSearch === 0)
            {
                filteredCities = [];
                return;
            } else 
            {
                this.filteredCities = filtered.slice(0,10);
            }
        }
    },

    
    methods: {

    /**
    * Funkcja służąca do obsługi przejścia do strony wyników
    */

    wybierzMiasto: function() {
        this.$emit('enter', this.value);
        console.log('dziala');
        console.log(this.googleResults);
     },

    /**
    * Funkcja wypisuje wytłuszczonym stylem część nazwy, która nie została wprowadzona w inputa,
    * zaś część pokrywającą się z nazwą miasta stylem normalnym.
    */
        wytluszcz: function(word, query) {
            return result = word.replace(query, '<span class="niewytluszczone">' + query + '</span>')
        },

    /**
     * Funkcja mająca na cele zaimplementowanie obsługi strzałki w dół.
     * Wraz z kolejnymi naciśnięciami klawisza wyróżnione zostają kolejne,
     * coraz niższe elementy autocompletera
     */
        dol: function() {
            if (!this.autocompleterIsActive) {
                this.current = -1;
            }
            if (this.current < this.filteredCities.length)
            {
                this.current++;
            } else if (this.current == this.filteredCities.length)
            {
                this.current = 0;
            }
            this.autocompleterIsActive = true;
            this.googleSearch = this.filteredCities[this.current].name;

        },

    /**
     * Funkcja mająca na cele zaimplementowanie obsługi strzałki w górę.
     * Wraz z kolejnymi naciśnięciami klawisza wyróżnione zostają kolejne,
     * coraz wyższe elementy autocompletera
     */
        gora: function() {
            if (!this.autocompleterIsActive) {
                this.current = -1;
            }
            if(this.current > 0)
            {
                this.current--;
            } else if (this.current < 0)
            {
                this.current = this.filteredCities.length - 1;
            }
            this.autocompleterIsActive = true;
            this.googleSearch = this.filteredCities[this.current].name;
        },

    /**
     * Funkcja mająca na cele aktualizowanie listy autocompletera.
     * Aktualizacja następuje wraz z wprowadzaniem nowych lub usuwaniem
     * już wpisanych liter.
     */
        cofnij: function() {
            this.autocompleterIsActive = false;
            this.current = -1;
        },
    },

    props: ['options'],

    template: 

    `
        <div class="sekcja_wyszukiwania">
            <div class="wyszukiwanie">
                <div class="wyszukiwanie2">              
                    <div class="tekst1">
                        <div class="tekst2">
                            <input v-model="googleSearch" ref="inputFocus" class="text_input" maxlength="2048" name="q" type="text"
                                v-on:keyup.enter="wybierzMiasto()"
                                v-on:keyup.down="dol()"
                                v-on:keyup.up="gora()"
                                v-on:keyup.delete="cofnij()"                       
                            />
                        </div>
                    </div>                    
                </div>
            </div>
            <ul :class="{puste: googleSearch.length === 0, autocompleter: googleSearch.length > 0}">
                <li class="element"  :class="{hovered: current === i}" v-for="(city, i) in filteredCities" v-on:click="googleSearch=city.name">
                    <img src="lupa.png">
                    <span class="wytluszczone" v-html="wytluszcz(city.name, googleSearch)">{{ city.name }}</span>
                </li>
            </ul>
        </div>
    `
})

Vue.component('v-autocompleter-results', {

})