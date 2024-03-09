#!/bin/sh

{ git ls-files --others --exclude-standard ; git diff-index --name-only --diff-filter=d HEAD ; } | grep --regexp='[.]js$' | tr '\n' '\0' | xargs -0 npx eslint --no-eslintrc --config .ext-eslintrc.json --no-inline-config