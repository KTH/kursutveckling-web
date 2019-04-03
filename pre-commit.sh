#!/bin/bash
git diff --staged --diff-filter=dx --name-only HEAD | grep ".*\.js$" | xargs -I % sh -c './node_modules/.bin/prettier --print-width 80 --no-semi --single-quote  --trailing-comma none --write %; git add %'
