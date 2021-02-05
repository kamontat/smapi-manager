#!/usr/bin/env bash

secret_template="$PWD/src/secrets-template.ts"
secret_file="$PWD/src/common/constants/secrets.ts"
bit=32

apikey="$(base64 </dev/urandom | head -c $bit | tr -d '/')"
secret_content="$(sed "s/{APIKEY}/$apikey/" <"$secret_template")"

echo "$secret_content" >"$secret_file"
