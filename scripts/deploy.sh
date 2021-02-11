#!/usr/bin/env bash

line="-------------------------------------------------------"
dryrun="${1:-$DRYRUN}"

is_dryrun() {
  test -n "$dryrun"
}

is_exist() {
  git tag | grep -q "$1"
}

cmd_exist() {
  command -v "$1" >/dev/null
}

cmd() {
  base="$1"
  shift
  args=("$@")

  if cmd_exist "$base"; then
    if is_dryrun; then
      echo "$ ${base} ${args[*]}"
      return 0
    fi

    ${base} "${args[@]}"
  else
    echo "command $base is not exist (exit 3)" &&
      return 3
  fi
}

step_count=1
step() {
  local step_name="$1" exitcode=0
  shift
  local args=("$@")

  printf "Step #%03d: %s\n\n" "${step_count}" "${step_name}"

  cmd "${args[@]}"
  exitcode=$?

  if ! is_dryrun; then
    if ((exitcode > 0)); then
      echo "[ERROR] execute '${args[*]}' return code='$exitcode'"
      exit "$exitcode"
    else
      echo
      echo "$line"
      echo
    fi
  else
    echo
    echo "$line"
    echo
  fi

  ((step_count += 1))
}

pjson="$PWD/package.json"
version="v$(jq -r ".version" "$pjson")"

is_exist "$version" && echo "Please update new version in $pjson file (exit 2)" >&2 && exit 2
! cmd_exist "gitgo" && echo "gitgo cli is required (exit 3)" >&2 && exit 3

printf "Deploying version '%s' [enter]..." "$version"
read -r
echo
echo

step "update changelog" gitgo changelog --tag "$version"
step "update line-of-code file" bash "$PWD/scripts/loc.sh"
step "git commit" git commit -am "chore(release): $version"
step "git tag" git tag "$version"
step "git push" git push
step "git push tag" git push --tags
