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
  _        _                     _ 
 | | __   | |_    ___     ___   | |
 | |/ /   | __|  / _ \   / _ \  | |
 |   <    | |_  | (_) | | (_) | | |
 |_|\_\    \__|  \___/   \___/  |_|
                                   
Usage: kcmd [options] [command]

Options:
  -h, --help            display help for command

Commands:
  clusters              List all kafka clusters
  topics                List all topics of selected kafka
  groups                List all groups of selected kafka
  show                  Show all selected options
  add <name> <brokers>  Add a kafka server
  select                Select a kafka server/topic/group
  consumer              Consume messages of selected topic
  topic                 Get metadata of topic
  offsets <type>        Get topic/group offsets
  config                Show current config
  update-config         Update config
  help [command]        display help for command
```