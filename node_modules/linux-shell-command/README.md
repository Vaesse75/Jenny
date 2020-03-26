# linux-shell-command

Node.JS Spawn wrapper

## Examples

### shellCommand

The function "shellCommand" should **always** be called inside a try/catch block.

```javascript
var shellCommand = require("linux-shell-command").shellCommand;

//Simple command
var sc = shellCommand("ls");
/*
Processed command:
$ ls
*/

//Command with 1 arguments
var sc = shellCommand("ls '!?!'", ["/"]);
/*
Processed command:
$ ls '/'
*/

//Command with 2 arguments
var sc = shellCommand("cp '!?!' '!?!'", ["file1", "file2"]);
/*
Processed command:
$ cp file1 file2
*/

//Command expecting the exit status to be equals to 1
var sc = shellCommand("ls '!?!'", ["/"], 1);

//Check the processed command
console.info(sc.processedCommand);

//Get Events from the executed command
var sc = shellComand("top");
sc.events
  .on("pid", pid => {
    console.log(`The pid of the command is ${pid}`);
  })
  .on("stdout", stdout => {
    console.log(stdout.trim());
  })
  .on("stderr", stderr => {
    console.warn(stderr.trim());
  })
  .on("error", e => {
    console.error(e);
  })
  .on("exit", exitStatus => {
    console.log(`Exit status: ${exitStatus}`);
  });
```

#### Promise (shellCommand)

```javascript
var shellCommand = require("linux-shell-command").shellCommand;

//Execute the command
try {
  var sc = shellCommand("ls");
  sc.execute()
    .then(success => {
      if (success === true) {
        console.log(sc.stdout);
      } else {
        console.error(sc.error);
      }
    })
    .catch(e => {
      console.error(e);
    });
} catch (e) {
  console.error(e);
}
```

#### Callback (shellCommand)

```javascript
var shellCommand = require("linux-shell-command").shellCommand;

//Execute the command
try {
  var sc = shellCommand("ls");
  sc.execute((error, result) => {
    if (error) {
      console.error(error);
    } else {
      if (result.success === true) {
        console.log(sc.stdout);
        console.log(result.shellCommand.stdout);
      } else {
        console.error(sc.error);
        console.log(result.shellCommand.stdout);
      }
    }
  });
} catch (e) {
  console.error(e);
}
```

### Execute

#### Promise (Execute)

```javascript
var execute = require("linux-shell-command").execute;

execute("ls")
  .then(({ shellcommand: sc, success: success }) => {
    if (success === true) {
      console.log(sc.stdout);
    } else {
      console.error(sc.error);
    }
  })
  .catch(e => {
    console.error(e);
  });

//OR

execute("ls '!?!'", ["/"])
  .then(result => {
    if (result.success === true) {
      console.log(result.shellCommand.stdout);
    } else {
      console.error(rsult.shellCommand.error);
    }
  })
  .catch(e => {
    console.error(e);
  });
```

#### Callback (Execute)

```javascript
var execute = require("linux-shell-command").execute;

//The variable "sc" become an instance of ShellCommand at the end of the execution
var sc = execute(
  "cp '!?!' '!?!' -v",
  ["file1", "file2"],
  0,
  (error, { shellCommand, success }) => {
    if (error) {
      console.error(error);
    } else {
      if (success === true) {
        console.log(shellCommand.stdout);
      } else {
        console.error(shellCommand.error);
      }
    }
  }
);
```
