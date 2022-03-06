# kcmd: a simple kafka admin tool

![tests](https://github.com/cengler/k/actions/workflows/test.yml/badge.svg)
![audit](https://github.com/cengler/k/actions/workflows/audit.yml/badge.svg)

## Installation:

#### Running on-demand:

Using `npx` you can run the script without installing it first:

    npx kcmd

#### Globally via `npm`

    npm i -g kcmd

This will install `kcmd` globally so that it may be run from the command line anywhere.

## Usage:
```
  _                             _ 
 | | __   ___   _ __ ___     __| |
 | |/ /  / __| | '_ ` _ \   / _` |
 |   <  | (__  | | | | | | | (_| |
 |_|\_\  \___| |_| |_| |_|  \__,_|
                                   
Usage: kcmd [global options] command - 1.0.6

Options:
  -v, --version         output the current version
  -t, --topic <topic>   override selected topic
  -g, --group <group>   override selected group
  -c, --cluster <name>  override selected cluster by name
  -h, --help            display help for command

Commands:
  ls <type>             List clusters/brokers/topics/groups
  set <type> [value]    Set a kafka cluster/topic/group
  put <name> <brokers>  Add/Replace a kafka cluster by name
  delete <name>         Delete a kafka cluster by name
  offsets <type>        Get topic/group offsets
  lag                   Get lag of selected group
  consumer              Consume messages of selected topic
  show [section]        Show selected options clusters/config/selected
  config                Update config
  metadata <type>       Get metadata of topic/..
  help [command]        display help for command

```
