Vue.config.devtools = true;
const GOALS_COUNT = 5;
new Vue({
	el: '#game',
	data: {
		isGameStarted: false,
		currentTeam: null,
		winnerTeam: null,
		goalsCount: GOALS_COUNT,
		roundsCount: 0,
		teames: [
			{
				name: 'cat',
				score: 0,
				isCurrent: false,
				goalsBalance: GOALS_COUNT
			},
			{
				name: 'dog',
				score: 0,
				isCurrent: false,
				goalsBalance: GOALS_COUNT
			}
		]
	},
	methods: {
		/**
		 * ЗАПУСК ИГРЫ
		 * игра не будет запущена до тех пора,
		 * пока обе команды не введут название команд
		 */
		gameStart() {
			if (this.teames[0].name && this.teames[1].name) {
				this.isGameStarted = true;
				let randomTeam = this.getRandom();
				this.defineFirstTeam(randomTeam);
			}
		},
		/**
		 * Получает параметр с номером команды,
		 * которая будет делать первый ход.
		 * И меняется состояние у команды
		 * с соответсвующим номером
		 */
		defineFirstTeam(number) {
			this.teames.forEach((team, index) => {
				team.isCurrent = index == number ? true : false
			});
			this.currentTeam = number;
		},
		getRandom() {
			return +(Math.random() < 0.5);
		},
		/**
		 * Имитация удара
		 */
		goal(event) {
			let randomGoal = this.getRandom();
			this.teames[this.currentTeam].score += randomGoal;
			this.teames[this.currentTeam].goalsBalance--;
			
			if (this.isFastWin() || this.isGameStopped())
				this.defineWinner(event);
			else
			{
				this.roundsCount++;
				this.nextMove();
			}

		},
		/**
		 * Проверка завершения игры
		 * если все команды выполнили свои удары,
		 * игра прекращается
		 */
		isGameStopped() {
			return !this.teames[0].goalsBalance && !this.teames[1].goalsBalance ? true : false;
		},
		/**
		 * 
		 */
		isFastWin()
		{
			const isFinishedCurrentRound = !Math.abs(this.teames[0].goalsBalance - this.teames[1].goalsBalance);
			const isMiddleOfGame = Math.ceil(this.roundsCount / 2) > Math.ceil(this.goalsCount / 2);
			// console.log(isMiddleOfGame);
			// if (Math.floor(this.goalsCount / 2) < Math.floor(this.roundsCount / 2))
			if (isMiddleOfGame && isFinishedCurrentRound)
			{
				console.log(Math.floor(this.roundsCount / 2));
				console.log(Math.ceil(this.goalsCount / 2));
				
				let goalsDec = !Math.abs(this.teames[0].goalsBalance - this.teames[1].goalsBalance);
				let scoreDec = Math.abs(this.teames[0].score - this.teames[1].score);
				
				if ( (scoreDec >= Math.floor(this.goalsCount / 2) ) && goalsDec)
				{
					//call defineWinenr();
					return true;
				}
				else
					return false;
			}
		},
		nextMove()
		{
			this.teames.forEach((team, index) => {
				team.isCurrent = index == this.currentTeam ? false : true;
			});
			this.currentTeam = this.currentTeam === 0 ? 1 : 0;
		},
		/**
		 * Определение победителя игры
		 */
		defineWinner(eventElement)
		{
			/**
			 * случай, когда все игроки выполнили свои ходы,
			 * и выигрывает команда, забившая большее 
			 * количество голов ( teams[i].score )
			 */
			if ( (this.teames[0].score > this.teames[1].score) )
			{
				this.winnerTeam = this.teames[0].name;
				eventElement.target.disabled = true;
			}
			/**
			 * случай, когда серия заверишилась ничьей, и, 
			 * каждой команде добавляется по одному ходу,
			 * пока кто-то не забьет первым
			 */
			else if (this.teames[0].score === this.teames[1].score)
			{
				this.teames.forEach((team) => {
					team.goalsBalance++;
				})
			}
			else
			{
				this.winnerTeam = this.teames[1].name;
				eventElement.target.disabled = true;
			}
		},
		startNewGame()
		{
			this.isGameStarted = false;
			this.roundsCount = 0;
			this.winnerTeam = null;
			this.currentTeam = null;
			document.querySelector('.game__goal').disabled = false;

			this.teames.forEach(team => {
				team.name = 'ss';
				team.score = 0;
				team.isCurrent = false;
				team.goalsBalance = GOALS_COUNT;
			})
			
		}
	}
});