const fs = require("fs");

//write out data
function done(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

function except() {
  process.stdout.write('Wrong file path or name');
  process.stdout.write("\nprompt > ");
}

//where we will store our commands
function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      done(`Command not found: ${command}`)
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {
  echo: function(userInput) {
    done(userInput);
  },
  cat: function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) {
        if (err.errno) {
          except()
        } else throw err;
      } else {
        done(data);
      }
    });
  },
  head: function(fullPath) {
    const fileName = fullPath[0];
    const lines = 10;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        if (err.errno) {
          except()
        } else throw err;
      } else {
        let headData = data.toString().split('\n').slice(0, lines).join('\r\n');
        done(headData);
      }
    });
  },
  tail: function (fullPath) {
    const fileName = fullPath[0];
    const lines = -10;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        if (err.errno) {
          except()
        } else throw err;
      } else {
        let tailData = data.toString().split('\n').slice(lines).join('\r\n');
        done(tailData);
      }
    });
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
