import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public start: boolean
  public cells: string[]
  public playerSelected: number[]
  public botSelected: number[]
  public allSelected: number[]
  public players: any[]
  public playerSymbol: string
  public botSymbol: string
  public message: any
  public winningCombinations: any[]
  public endGame: boolean
  public timer: any
  public runningTimer: boolean
  public ms: any
  public sec: any
  public min: any
  public hr: any
  public localStorageData: any

  constructor() {
    this.start = false
    this.endGame = false
    this.cells = Array(25).fill(0)
    this.playerSelected = []
    this.botSelected = []
    this.allSelected = []
    this.players = ['X','O']
    this.playerSymbol = ''
    this.botSymbol = ''
    this.message = {}
    this.timer = null
    this.ms = '0' + 0
    this.sec = '0' + 0
    this.min = '0' + 0
    this.hr = '0' + 0
    this.runningTimer = false
    this.winningCombinations = [
        [0,1,2,3,4],
        [1,6,11,16,21],
        [2,7,12,17,22],
        [3,8,13,18,23],
        [4,9,14,19,24],
        [5,6,7,8,9],
        [10,11,12,13,14],
        [15,16,17,18,19],
        [0,5,10,15,20],
        [20,21,22,23,24],
        [4,8,12,16,20],
        [0,6,12,18,24]
      ];
    this.getLocalStorage('dataTableResult')
  }

  firstPlayer(){
    let  randomPlayer = Math.floor(Math.random() * this.players.length)
    this.playerSymbol = this.players[randomPlayer]
    this.botSymbol = this.players[randomPlayer] == 'X' ? 'O' : 'X'
    if (this.botSymbol == this.players[0]){
      this.botClick()
    }
  }

  handlerPlayerClick(index: number){
    this.cells[index] = this.playerSymbol
    this.playerSelected.push(index)
    this.allSelected.push(index)

    this.checkWinner()
    if (!this.endGame){
      setTimeout(() => {
        this.botClick()
      }, 200);

    }
  }

  botClick(){
    let allDiffBotCombination: number[] = []
    let allDiffPlayerCombination: number[] = []
    let playerEntry: number[] = []
    let botEntry: number[] = []
    let random: number
    let playerDiffCombination: number[] = []
    let botDiffCombination: number[] = []
    let allDiffCombination: number[] = []
    let minPlayerComb: number[] = Array(10).fill(0) // тут будет лучшая комбинация для юзера
    let minBotComb: number[] = Array(10).fill(0)// тут будет лучшая комбинация для бота

    for (let i = 0; i <  this.winningCombinations.length; i++) {
      playerEntry = this.playerSelected.filter(el => this.winningCombinations[i].includes(el)) // вхождение выбора юзера в комбинацию
      botEntry = this.botSelected.filter(el => this.winningCombinations[i].includes(el)) // вхождение выбора бота в комбинацию

      playerDiffCombination = this.winningCombinations[i].filter((el: number) => !this.playerSelected.includes(el)) //остаток в комбинации который нужно тыкнуть юзеру
      botDiffCombination = this.winningCombinations[i].filter((el: number) => !this.botSelected.includes(el))//остаток в комбинации который нужно тыкнуть боту

      if(playerDiffCombination.length < minPlayerComb.length){
        minPlayerComb = playerDiffCombination
      }

      if(botDiffCombination.length < minBotComb.length){
        minBotComb = botDiffCombination
      }
    }

    allDiffPlayerCombination = minPlayerComb.filter((el: number) => !this.allSelected.includes(el))
    allDiffBotCombination = minBotComb.filter((el: number) => !this.allSelected.includes(el))
    allDiffCombination = [...allDiffPlayerCombination, ...allDiffBotCombination]
    random = Math.floor(Math.random() * allDiffCombination.length);
    this.cells[allDiffCombination[random]] = this.botSymbol
    this.botSelected.push(allDiffCombination[random])
    this.allSelected.push(allDiffCombination[random])

    if (!allDiffCombination.length){
      this.sendMessage({text: 'Нет выйгрышных комбинаций. Ничья', type: 1})
      this.endGame = true
      this.stopTimer()
      this.appendToLocalStorage({ date: new Date(), winner: 'НИЧЬЯ', time: this.hr + 'час. ' + this.min + 'мин. ' + this.sec + 'сек. '})
    }
    this.checkWinner()
  }

   checkWinner(){

    for (let i = 0; i <  this.winningCombinations.length; i++){

      let playerEntry = this.playerSelected.filter(el => this.winningCombinations[i].includes(el))
      let botEntry = this.botSelected.filter(el => this.winningCombinations[i].includes(el))

      if (playerEntry.length == 5){
        this.sendMessage({text: 'Игрок (' + this.playerSymbol + ') победил', type: 1})
        this.endGame = true
        this.stopTimer()
        this.appendToLocalStorage({ date: new Date(), winner: this.playerSymbol, time: this.hr + 'час. ' + this.min + 'мин. ' + this.sec + 'сек. '})
        break
      }

      if (botEntry.length == 5){
        this.sendMessage({text: 'Бот (' + this.botSymbol + ') победил', type: 0})
        this.endGame = true
        this.stopTimer()
        this.appendToLocalStorage({ date: new Date(), winner: this.botSymbol, time: this.hr + 'час. ' + this.min + 'мин. ' + this.sec + 'сек. '})
        break
      }

      if (this.botSelected.length >= 12 && this.playerSelected.length >= 12){
        this.sendMessage({text: 'Победила дружба', type: 1})
        this.endGame = true
        this.stopTimer()
        this.appendToLocalStorage({ date: new Date(), winner: 'НИЧЬЯ', time: this.hr + 'час. ' + this.min + 'мин. ' + this.sec + 'сек. '})
        break
      }
    }
  }

  startGame(){
    this.start = true
    this.resetGame()
  }

  resetGame(){
    this.playerSelected = []
    this.botSelected = []
    this.allSelected = []
    this.endGame = false
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i] = '';
    }
    this.resetTimer()
    this.startTimer()
    this.firstPlayer()
    this.messageClose()
  }

  stopGame(){
    this.start = false
    this.endGame = true
    this.stopTimer()
  }

  sendMessage(obj ={}){
    this.message = obj
  }

  messageClose(){
    this.message = {}
  }

  startTimer() {
    if(!this.runningTimer){
      this.runningTimer = true
      this.timer = setInterval(() => {
        this.ms++
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms

        if (this.ms == 100){
          this.sec++
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec
          this.ms = '0' + 0
        }

        if (this.sec == 60){
          this.min++
          this.min = this.min < 10 ? '0' + this.min : this.min
          this.sec = '0' + 0
        }

        if (this.min == 60){
          this.hr++
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr
          this.min = '0' + 0
        }
      },10)
    } else {
      this.stopTimer()
    }
  }

  stopTimer(){
    clearInterval(this.timer)
    this.runningTimer = false
  }

  resetTimer() {
    this.stopTimer()
    this.hr = this.min = this.sec = this.ms = '0' + 0
  }

  appendToLocalStorage(data:any){
    let oldData = this.getLocalStorage('dataTableResult')
    oldData.push(data)
    localStorage.setItem('dataTableResult', JSON.stringify(oldData))
  }

  getLocalStorage(key: string){
    return this.localStorageData = JSON.parse(localStorage.getItem('dataTableResult') || '[]')
  }
}
