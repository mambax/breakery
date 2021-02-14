export const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve(1)
  }))
}

export function terminateOnKeypress (message: string) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.on('data', (message) => {
    console.log('\n\n' + message)
    process.exit.bind(process, 0)
  })
}
