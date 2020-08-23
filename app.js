
new Vue({
	// app id
	el: "#app",

	// properties
	data: {
		// player health
		player_health: 100,

		// monster health
		monster_health: 100,

		// game is on
		game_is_on: false,

		// logs array
		logs: [],

		// logs text values
		logs_text: {
			game_started: "Game Started! ",

			player_attacked: "Player Attacked! ",

			special_attacked: "Player Special Attacked! ",

			received_aid: "Player received first AID!  ",

			gave_up: "Player gave up! ",

			monster_attacked: "Monster Attacked!  ",

			lose_game: "",

			won_game: "",
		},
	},

	// methods
	methods: {

		/**
		 * This method starts the game
		 * 
		 */
		start_game: function() {

			this.game_is_on = true;
		},

		/**
		 * With this method, the player attacks
		 * @return 
		 */
		attack: function() {

			var point = Math.ceil(Math.random() * 10);

			this.monster_health -= point;

			this.add_to_log({turn: "p", text: this.logs_text.player_attacked + point });

			this.monster_attack();
		},

		/**
		 * With this method, the player makes a special attack.
		 * @return 
		 */
		special_attack: function() {

			var point = Math.ceil(Math.random() * 20);

			this.monster_health -= point;

			this.add_to_log({turn: "p", text: this.logs_text.special_attacked + point });

			this.monster_attack();
		},

		/**
		 * With this method, the player increases life
		 * @return 
		 */
		heal_up: function() {

			var point = Math.ceil(Math.random() * 25);

			this.player_health += point;

			this.add_to_log({turn: "info", text: this.logs_text.received_aid + point});
		},

		/**
		 * With this method the game ends and the player loses
		 * @return
		 */
		give_up: function() {
			
			this.game_is_on = false;

			this.monster_health = 100;

			this.player_health = 0;

			this.add_to_log({turn: "p", text:""});

			this.logs = [];
		},

		/**
		 * With this method, monster attacks with random value
		 * @return 
		 */
		monster_attack: function() {

			var point = Math.ceil(Math.random() * 15);

			this.player_health -= point;

			this.add_to_log({turn: "m", text: this.logs_text.monster_attacked + point });
		},

		/**
		 * This method - saves the logs
		 * @param 
		 */
		add_to_log: function(log) {

			this.logs.push(log)
		}
	},

	// watch methods
	watch: {

		/**
		 * This method - the player ends the game if the health is 0
		 * @param  class
		 * @return alert
		 */
		player_health: function(value) {

			if(value <= 0) {

				this.player_health = 0;

				if(confirm("LOSE THE GAME :( - Do you want to play it again?")) {

					this.monster_health = 100;

					this.player_health = 100;

					this.logs = [];
				}

			}else if(value >= 100) {

				this.player_health = 100;
			}
		},

		/**
		 * This method  - the player ends the game if the health is 0
		 * @param  class
		 * @return alert
		 */
		monster_health: function(value) {

			if(value <= 0) {

				this.monster_health = 0;

				if(confirm('CONGRATULATIONS YOU WON THE GAME :) - Do you want to play it again?')) {

					this.monster_health = 100;

					this.player_health = 100;

					this.logs = [];
				}
			}
		},
		
	}
})