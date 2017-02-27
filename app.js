var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var noJokesMessage = 'I... I don\'t know any jokes. 😢'

var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value

  if (jokes[requestedJokeKey] !== undefined) {
    var requestedJokeText = '<p>' + jokes[requestedJokeKey].setup + '</p>' +
      '<p>' + jokes[requestedJokeKey].punchline + '</p>'
    jokeBox.innerHTML = requestedJokeText
  } else {
    jokeBox.innerHTML = '<p>No matching joke found.'
  }
}

var deleteJoke = function () {
  var requestedJokeDeleteKey = document.getElementById('deleteJoke').value
  if (jokes[requestedJokeDeleteKey] !== undefined) {
    delete jokes[requestedJokeDeleteKey]
    updatePage()
  }
}

var addJoke = function () {
  var requestedJokeAddKey = document.getElementById('key').value
  var requestedJokeAddSetup = document.getElementById('setup').value
  var requestedJokeAddPunch = document.getElementById('punch').value
  jokes[requestedJokeAddKey] = {'setup': requestedJokeAddSetup, 'punchline': requestedJokeAddPunch}
  updatePage()
}

var updatePage = function () {
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  stringifiedJokes = window.localStorage.getItem('jokes')
  if (stringifiedJokes !== null) {
    jokes = JSON.parse(stringifiedJokes)
  }
  updateJokesMenu()
  updateDisplayedJoke()
}

updatePage()
// console.log(jokes)
var addJokeInput = document.getElementById('add')
var deleteJokeInput = document.getElementById('delete')
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
addJokeInput.addEventListener('click', addJoke)
deleteJokeInput.addEventListener('click', deleteJoke)
