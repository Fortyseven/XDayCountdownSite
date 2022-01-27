#!/usr/bin/env python3

import os
import json
import tweepy
from datetime import date
from math import floor, ceil

CONFIG_FILE = "config.json"

config = {}


def load_configs():
    # load our config vars and creds
    if not os.path.exists(CONFIG_FILE):
        raise FileExistsError(f"Missing config file '{CONFIG_FILE}'")

    with open(CONFIG_FILE) as cf:
        return json.load(cf)


def getPercentageBar(value, max_value, length=16, fill_char='▓', empty_char='░'):
    pc_val = value/max_value
    fill_len = ceil(length * pc_val)
    return (fill_char * fill_len) + (empty_char * (length - fill_len))


def getTodaysUpdate():
    now = date.today()

    xday = date(now.year, 7, 5)

    # if we're past this year's xday, then our target
    # shifts to the next one (if there's a next one)

    if (xday-now).days < 0:
        xday = date(now.year+1, 7, 5)

    days_left = (xday - now).days

    xday_num = xday.year - 1997

    if days_left == 0:
        return f'💸💀🚀💊👽🔥🔥🔥 PRAISE "BOB", IT\'S {xday_num} X-DAY! Say goodbye! Rip up those bills! Tell your boss to screw off! Let that hampster go free! It\'s time for the pinks to BURRRRN! YEEE HAW!! 🔥🔥🔥👽💊🚀💀💸'
    elif days_left == 1:
        return f'🚨 🚨🚨 🚨🚨🚨 TOMORROW IS {xday_num} X-DAY?!! 🚨🚨🚨 🚨🚨 🚨'

    return f'{getPercentageBar(days_left, 365)}\n{days_left} days until {xday_num} X-Day! 👽🚀🔥'


def main():
    global config, meta_json

    config = load_configs()

    client = tweepy.Client(
        consumer_key=config['creds']['consumer_key'],
        consumer_secret=config['creds']['consumer_secret'],
        access_token=config['creds']['access_token'],
        access_token_secret=config['creds']['access_secret']
    )

    # print(getTodaysUpdate())

    client.create_tweet(text=getTodaysUpdate())


if __name__ == "__main__":
    main()
