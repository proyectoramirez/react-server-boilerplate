const shell = require('shelljs');
const { exec } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const compareVersions = require('compare-versions');
const animateProgress = require('./helpers/progress');
const addCheckMark = require('./helpers/checkmark');

const ORIGIN_REGEX = /proyectoramirez\/server-boilerplate\.git/;

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
let interval;
let clearRepo = true;

cleanRepo(() => {
    process.stdout.write(
        '\nInstalling dependencies... (This might take a while)',
    );
    setTimeout(() => {
        readline.cursorTo(process.stdout, 0);
        interval = animateProgress('Installing dependencies');
    }, 500);

    installDeps();
});

//----------------------------------------------------------------------------------------------//

/**
 * Deletes the .git folder in dir only if cloned from our repo
 */
function cleanRepo(callback) {
    fs.access(".git/", fs.constants.F_OK, (err) => {
        if (!err) {
            process.stdout.write('\nDo you want to clear old repository? [Y/n] ');
            process.stdin.resume();
            process.stdin.on('data', pData => {
                const val = pData.toString().trim();
                if (val === 'y' || val === 'Y' || val === '') {
                    process.stdout.write('Removing old repository');
                    shell.rm('-rf', '.git/');
                    addCheckMark(callback);
                } else {
                    dontClearRepo('', callback);
                }
            });
        } else {
            callback();
        }
    });
}

/**
 * Function which indicates that we are not cleaning git repo
 */
function dontClearRepo(nl, callback) {
    clearRepo = false;
    process.stdout.write(`${nl} Leaving your repository untouched`);
    addCheckMark(callback);
}

/**
 * Initializes git again
 */
function initGit(callback) {
    exec(
        'git init && git add . && git commit -m "Initial commit"',
        addCheckMark.bind(null, callback),
    );
}

/**
 * Deletes the current directory
 */
function deleteCurrentDir(callback) {
    shell.rm('-rf', __dirname);
    callback();
}

/**
 * Installs dependencies
 *
 * NOTE: Could be refactored with aync/await and:
 * const exec = util.promisify(require('child_process').exec);
 *
 */
function installDeps() {
    exec('node --version', (err, stdout) => {
        const nodeVersion = stdout.trim();
        if (err || compareVersions(nodeVersion, '8.10.0') === -1) {
            installDepsCallback(
                err ||
                `[ERROR] You need Node.js v8.10 or above but you have ${nodeVersion}`,
            );
        } else {
            exec('npm --version', (err2, stdout2) => {
                const npmVersion = stdout2.trim();
                if (err2 || compareVersions(npmVersion, '5.0.0') === -1) {
                    installDepsCallback(
                        err2 ||
                        `[ERROR] You need npm v5 or above but you have v${npmVersion}`,
                    );
                } else {
                    exec('npm install', addCheckMark.bind(null, installDepsCallback));
                }
            });
        }
    });
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
    clearInterval(interval);
    process.stdout.write('\n\n');
    if (error) {
        process.stderr.write(error);
        process.stdout.write('\n');
        process.exit(1);
    }

    deleteCurrentDir(() => {
        if (!clearRepo) {
            endProcess();
        } else {
            interval = animateProgress('Initialising new repository');
            process.stdout.write('Initialising new repository');
            initGit(() => {
                clearInterval(interval);
                endProcess();
            });
        }
    });
}

/**
 * Function which ends setup process
 */
function endProcess() {
    process.stdout.write('\nDone!');
    process.exit(0);
}