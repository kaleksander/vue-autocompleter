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
        wybierzMiasto: function() {
            console.log('dziala');
            console.log(this.googleResults);
        },

        wytluszcz: function(word, query) {
            return result = word.replace(query, '<span class="niewytluszczone">' + query + '</span>')
        },

        miastaRezultat: function() {
            this.autocompleterResults = false;
        },

        miastaRezultat2: function() {
            this.autocompleterResults = true;
        },

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

        cofnij: function() {
            this.autocompleterIsActive = false;
            this.current = -1;
        },

        dolRezultaty: function() {
            if (!this.autocompleterIsActive) {
                this.currentResults = -1;
            }
            if (this.currentResults < this.filteredCities.length)
            {
                this.currentResults++;
            } else if (this.currentResults == this.filteredCities.length)
            {
                this.currentResults = 0;
            }
            this.autocompleterIsActive = true;
            this.googleSearch = this.filteredCities[this.currentResults].name;
        },

        goraRezultaty: function() {
            if (!this.autocompleterIsActive) {
                this.currentResults = -1;
            }
            if(this.currentResults > 0)
            {
                this.currentResults--;
            } else if (this.currentResults < 0)
            {
                this.currentResults = this.filteredCities.length - 1;
            }
            this.autocompleterIsActive = true;
            this.googleSearch = this.filteredCities[this.currentResults].name;
        },

        cofnijRezultaty: function() {
            this.autocompleterResults = false;
            this.autocompleterIsActive = false;
            this.currentResults = -1;
        },
    },

    props: ['options'],

    template: 

    `
        <div class="sekcja_wyszukiwania">
            <div class="wyszukiwanie">
                <div class="wyszukiwanie2">
                    <div class="ikona_wyszukiwania">
                        <img class="ikona_wyszukiwania2" src="lupa.png">
                    </div>                  
                    <div class="tekst1">
                        <div class="tekst2">
                            <input v-model="googleSearch" ref="inputFocus" class="text_input" maxlength="2048" name="q" type="text"
                                v-on:keyup.enter="googleSearch=filteredCities[current].name"
                                v-on:keyup.down="dol()"
                                v-on:keyup.up="gora()"
                                v-on:keyup.delete="cofnij()"                       
                            />
                        </div>
                    </div>                    
                    <div class="klawiatura">
                        <img src="klawiatura.png">
                    </div>
                    <div class="mikrofon">
                        <img src="mikrofon.png">
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