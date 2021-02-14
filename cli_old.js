const cliProgress = require('cli-progress');
const _colors = require('colors');

const b1 = new cliProgress.SingleBar({
    format: 'out |' + _colors.green('{bar}') + '| in',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
    barsize: 100
});

let state = 0;
const BAR_LENGTH = 1000;



new Promise(resolve => {
    console.log(`🧘🏽‍♂️ Lets begin.`)
    b1.start(BAR_LENGTH, state);
    resolve();
})
    .then(inhale(4))
    .then(inhale(4, true))
    .then(inhale(4))
    .then(inhale(4, true))
    .then(inhale(4))
    .then(inhale(4, true))
    .then(inhale(4))
    .then(inhale(4, true))
    .then(() => {
        b1.stop();
        console.log(`🎊 Wonderful, you completed the mobility break, up up to where you left off.`)
    })

function inhale(durationSeconds, reverse) {
    return function () {
        return new Promise(resolve => {
            b1.update(reverse?1000-200:200);
            resolve();
        })
            .then(sleeper(1000))
            .then(() => {
                return new Promise(resolve => {
                    b1.update(reverse?1000-400:400);
                    resolve();
                })
            })
            .then(sleeper(1000))
            .then(() => {
                return new Promise(resolve => {
                    b1.update(reverse?1000-600:600);
                    resolve();
                })
            })
            .then(sleeper(1000))
            .then(() => {
                return new Promise(resolve => {
                    b1.update(reverse?1000-800:800);
                    resolve();
                })
            })
            .then(sleeper(1000))
            .then(() => {
                return new Promise(resolve => {
                    b1.update(reverse?0:1000);
                    resolve();
                })
            })
            .then(sleeper(1000));
    };
}



function sleeper(ms) {
    return function (x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}