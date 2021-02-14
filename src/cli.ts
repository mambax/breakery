import * as cliProgress from 'cli-progress'
import _colors from 'colors'
import wtfnode from 'wtfnode'
import { keypress, terminateOnKeypress } from './keypress'

(async () => {
  const b1 = new cliProgress.SingleBar({
    format: 'out |' + _colors.green('{bar}') + '| in',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    barsize: 100
  })

  const state = 0
  const BAR_LENGTH = 1000

  console.clear()

  const message: string[] = [
    '=============================================================================================================================',
    'Welcome to the Breakery.'.yellow,
    'While working hard its also important to work on your position, mobility and overall health.',
    'Breakery subtly suggests you some quick (max 90s) exercises during your work.',
    'Do not worry, if you are in a rush you can skip your break anytime by hitting ' + '[Ctrl + C]'.red + ' twice.',
    'Let us begin 🧘🏽‍♂️',
    '=============================================================================================================================',
    '\n',
    'This one is a breathing exercise, on the left your lungs must be empty (out), on the right they should be filled with air 🌬',
    'Follow the rhythm with your breath.',
    '\n',
    'Sit back in your 🪑, straighten your back 🔙, empty your lungs 💨, then press any key to start!'.green,
    '\n'
  ]

  console.log(message.join('\n'))
  await keypress()
  terminateOnKeypress('Got it, you are in a hurry 😢. Maybe next time then 👋🏽')

  await new Promise(resolve => {
    b1.start(BAR_LENGTH, state)
    resolve(1)
  })
    .then(inhale(4, false))
    .then(inhale(4, true))
    .then(inhale(4, false))
    .then(inhale(4, true))
    .then(inhale(4, false))
    .then(inhale(4, true))
    .then(inhale(4, false))
    .then(inhale(4, true))
    .then(() => {
      b1.stop()
      console.log('🎊 Wonderful, you completed the mobility break, up up to where you left off.')
      wtfnode.dump()
    })

  function inhale (_durationSeconds:number, reverse:boolean) {
    return function () {
      return new Promise(resolve => {
        resolve(1)
      })
        .then(async () => {
          await sleeper(1000)
          b1.update(reverse ? 1000 - 200 : 200)
        })
        .then(async () => {
          await sleeper(1000)
        })
        .then(() => {
          return new Promise(resolve => {
            b1.update(reverse ? 1000 - 400 : 400)
            resolve(1)
          })
        })
        .then(async () => {
          await sleeper(1000)
        })
        .then(() => {
          return new Promise(resolve => {
            b1.update(reverse ? 1000 - 600 : 600)
            resolve(1)
          })
        })
        .then(async () => {
          await sleeper(1000)
        })
        .then(() => {
          return new Promise(resolve => {
            b1.update(reverse ? 1000 - 800 : 800)
            resolve(1)
          })
        })
        .then(async () => {
          await sleeper(1000)
        })
        .then(() => {
          return new Promise(resolve => {
            b1.update(reverse ? 0 : 1000)
            resolve(1)
          })
        })
        .then(async () => {
          await sleeper(1000)
        })
    }
  }

  function sleeper (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
})()
