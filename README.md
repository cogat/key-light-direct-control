# key-light-direct-control

An Elgato Stream Deck plugin that controls Key Light directly, bypassing Elgato Control Center.

## Features

- Toggle the light on/off
  - Manually set brightness and colour temperature
- The IP of the Key Light is manually entered

## Install and setup

You should set up your router's DHCP to assign a static IP to your Key Light, and enter this IP in the settings.

## Developing

The project uses mise to set up the dev environment.

```shell
mise run install
mise run build
streamdeck link com.gregturner.key-light-direct-control.sdPlugin/
mise run watch
```

## Background

For whatever reason, my Elgato Control Center (on Mac OS Sequoia) fails to find my Key Light (it shows up on iOS fine).

I'm pretty sure it's something to do with my network config, but I've already tried:

- enabled IPv6
- enabled RIP v1
- disabled AX
- tried a 2.4GHz-only network

This means I can't operate the light from Stream Deck. This plugin uses the direct Key Light API (thanks to [Adam Esch](https://github.com/adamesch/elgato-key-light-api)) to control the light instead.

This is my first Stream Deck plugin; I'm grateful for any feedback / suggestions / pull requests.
