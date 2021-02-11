#!/usr/bin/env bash

# Update line-of-code markdown in docs directory

filepath="$PWD/docs/line-of-code.md"
curr_date="$(date +"%d %h %Y %H:%M:%S")"

pjson="$PWD/package.json"
version="v$(jq -r ".version" "$pjson")"

printf "" >"$filepath"
{
  echo "# Line of code (${version})"
  cloc --md --fullpath --match-d "/(src)/" --not-match-d "node_modules|.webpack|out" .
  echo
  echo "Generated ($curr_date)"
} >>"$filepath"
