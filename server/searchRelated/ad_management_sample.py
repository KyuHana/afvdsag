# -*- coding: utf-8 -*-
import time
import random
import requests

import signaturehelper


def get_header(method, uri, API_KEY, SECRET_KEY, CUSTOMER_ID):
    timestamp = int(time.time() * 1000)
    timestamp = str(timestamp)
    signature = signaturehelper.Signature.generate(
        timestamp, method, uri, SECRET_KEY)

    return {'Content-Type': 'application/json; charset=UTF-8', 'X-Timestamp': timestamp, 'X-API-KEY': API_KEY, 'X-Customer': str(CUSTOMER_ID), 'X-Signature': signature}


BASE_URL = "https://api.naver.com"
API_KEY = "0100000000b3e87007f090b783fa6fb4c06e6f23d769c245f02241a5480317db0ab39ac736"
SECRET_KEY = "AQAAAACz6HAH8JC3g/pvtMBubyPXOPvYQXp37wL87wTgibbxSQ=="
CUSTOMER_ID = "2197355"

# Adgroup Usage Sample

# 1. GET adgroup Usage Sample

uri = '/keywordstool'
method = 'GET'
r = requests.get(
    BASE_URL + uri +
    '?hintKeywords={}&showDetail=1'.format(input('연관키워드를 조회할 키워드를 입력하세요\n')),
    headers=get_header(method, uri, API_KEY, SECRET_KEY, CUSTOMER_ID))

print("response status_code = {}".format(r.status_code))
print("response body = {}".format(r.json()['keywordList'][0]))
