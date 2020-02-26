Vue.config.devtools = true;
new Vue({
	el: '#game',
	data: {
		isGameStarted: false,
		currentTeam: null,
		winnerTeam: null,
		goalsCount: 5,
		roundsCount: 0,
		teames: [
			{
				name: 'dave',
				score: 0,
				isCurrent: false,
				goalsBalance: 5
			},
			{
				name: 'jor',
				score: 0,
				isCurrent: false,
				goalsBalance: 5
			}
		]
	},
	methods: {
		gameStart()
		{
			if (this.teames[0].name && this.teames[1].name) {
				this.isGameStarted = true;
			}
			let randomTeam = this.getRandom();
			this.defineFirstTeam(randomTeam);
		},
		getRandom()
		{
			return +(Math.random() < 0.5);
		},
		defineFirstTeam(number)
		{
			this.teames.forEach((team, index) => {
				team.isCurrent = index == number ? true : false
			});
			this.currentTeam = number;
		},
		goal(event)
		{
			console.log('goal');
			
			let randomGoal = this.getRandom();
			this.teames[this.currentTeam].score += randomGoal;
			this.teames[this.currentTeam].goalsBalance--;

			if (this.isGameStopped() || this.isFastWin())
				this.defineWinner(event);
			else
			{
				this.nextMove();
				this.roundsCount++;
			}
		},
		isGameStopped()
		{
			return !this.teames[0].goalsBalance && !this.teames[1].goalsBalance ? true : false;
		},
		isFastWin()
		{
			if (Math.floor(this.roundsCount / 2) > 3)
			{
				let goalsDec = Math.abs(this.teames[0].goalsBalance - this.teames[1].goalsBalance);
				let scoreDec = Math.abs(this.teames[0].score - this.teames[1].score);
				
				if (scoreDec >= Math.floor(this.goalsCount / 2) && !goalsDec)
					return true;
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
		defineWinner(eventElement)
		{
			eventElement.target.disabled = true;
			if ( (this.teames[0].score > this.teames[1].score) )
			{
				this.winnerTeam = this.teames[0].name;
			}
			else if (this.teames[0].score === this.teames[1].score)
			{
				this.teames.forEach((team) => {
					team.goalsBalance++;
				})
			}
			else
			{
				this.winnerTeam = this.teames[1].name;
			}
		}
	}
});