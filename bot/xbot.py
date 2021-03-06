#!/usr/bin/env python3

from operator import ge
import os
import json
import tweepy
from datetime import date
from math import ceil
from random import sample

CONFIG_FILE = "config.json"

config = {}

CONSOLE_ONLY = False


def load_configs():
    # load our config vars and creds
    if not os.path.exists(CONFIG_FILE):
        raise FileExistsError(f"Missing config file '{CONFIG_FILE}'")

    with open(CONFIG_FILE) as cf:
        return json.load(cf)


def getPercentageBar(value, max_value, length=16, fill_char='โ', empty_char='โ'):
    pc_val = value/max_value
    fill_len = ceil(length * pc_val)
    return (fill_char * fill_len) + (empty_char * (length - fill_len))


def generateEmoji():
    ''' returns a string of three randomly chosen Emoji of Fate'''
    emojiCandidates = '๐ฝ๐๐ฅ๐ค๐คจ๐คซ๐ท๐ฅต๐ฅถ๐คฏ๐ค ๐ต๐คฎ๐คข๐ฅณ๐๐ค๐ง๐ฅบ๐ณ๐ฒ๐ค๐พ๐ฉ๐คก๐น๐บ๐ป๐๐๐ค๐ฅฑ๐๐ฅ๐ข๐ฆ๐ฃ๐๐ค๐๐โ๏ธ๐ค๐ค๐ค๐๐๐ง ๐๐๐๏ธ๐คท๐ต๏ธ๐ง๐ง๐ง๐ง๐ง๐ง๐๐ต๐ฆ๐ฆ๐ฆฅ๐ธ๐ฆ ๐ท๏ธ๐๐๐๐๐ฆ๐ญ๐ฅ๐ฅ๐บ๐ป๐๐๐๐จ๐๐ซ๐๐ธโโฐ๐๐๐๐๐๐ฅ๐ฏ๐ฑ๐๐๐ข๐ธ๐ธ๐ก๏ธ๐ซ๐๐งฌ๐งช๐ก๐งฒ๐ซโข๐โ'

    return "".join(sample(emojiCandidates, 3))


def getTodaysUpdate():
    now = date.today()

    xday = date(now.year, 7, 5)

    # if we're past this year's xday, then our target
    # shifts to the next one (if there's a next one)

    if (xday-now).days < 0:
        xday = date(now.year+1, 7, 5)

    days_left = (xday - now).days

    xday_num = xday.year - 1997

    emoji = generateEmoji()

    if days_left == 0:
        return f'๐ธ๐๐๐๐ฝ๐ฅ๐ฅ๐ฅ PRAISE "BOB", IT\'S {xday_num} X-DAY! Say goodbye! Rip up those bills! Tell your boss to screw off! Let that hampster go free! It\'s time for the pinks to BURRRRN! YEEE HAW!! ๐ฅ๐ฅ๐ฅ๐ฝ๐๐๐๐ธ'
    elif days_left == 1:
        return f'๐จ ๐จ๐จ ๐จ๐จ๐จ TOMORROW IS {xday_num} X-DAY?!! ๐จ๐จ๐จ ๐จ๐จ ๐จ'

    return f'{getPercentageBar(days_left, 365)}\n{days_left} days until {xday_num} X-Day! {emoji}'


def main():
    global config, meta_json

    if CONSOLE_ONLY:
        print(getTodaysUpdate())
        exit()

    config = load_configs()

    client = tweepy.Client(
        consumer_key=config['creds']['consumer_key'],
        consumer_secret=config['creds']['consumer_secret'],
        access_token=config['creds']['access_token'],
        access_token_secret=config['creds']['access_secret']
    )

    client.create_tweet(text=getTodaysUpdate())


if __name__ == "__main__":
    main()
