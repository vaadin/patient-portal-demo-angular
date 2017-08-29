#!/usr/bin/env bash

sed -i "s@https://comparison.demo.vaadin.com@$apiUrl@g" dist/main.*.js
nginx
