#!/usr/bin/env bash

is_exist() {
  git tag | grep -q "$1"
}

cmd_exist() {
  command -v "$1" >/dev/null
}

pjson="$PWD/package.json"

version="v$(jq -r ".version" "$pjson")"

is_exist "$version" && echo "Update new version in $pjson" >&2 && exit 2
! cmd_exist "gitgo" && echo "gitgo cli is required" >&2 && exit 2

echo "Deploying version '$version' [enter]..."
read -r

gitgo changelog --tag "$version" &&
  git commit -am "chore: release $version" &&
  git tag "$version" &&
  git push &&
  git push --tags
