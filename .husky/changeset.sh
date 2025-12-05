#!/bin/bash

# staged 상태의 .changeset/*.md 파일
FILES=$(git diff --cached --name-only --diff-filter=d | grep ".changeset/.*.md$")

if [ "$FILES" == "" ]
    then
        exit 0
    else
        for FILE in $FILES
        do
            # --- 로 시작하는 changeset 문서일 경우에만 진행
            if [ "$(head -n 1 "$FILE")" == "---" ]; then

                TICKET=$(git rev-parse --abbrev-ref HEAD | grep -Eo '^(\w+/)?(WOOTELIER[-_])?[0-9]+' | grep -Eo '(WOOTELIER[-])?[0-9]+' | tr "[:lower:]" "[:upper:]")

                # 브랜치 이름에 티켓번호가 없는 경우 건너뜀
                if [[ $TICKET == "" ]]; then
                    continue
                fi

                LINE_NUMBER=$(awk '/---/{i++} i==2{print NR+2; exit}' $FILE)
                LINE_TEXT=$(awk -v LINE_NUMBER=$LINE_NUMBER 'NR==LINE_NUMBER{print $0; exit}' $FILE)

                # 작성된 변경사항이 없는 경우 건너뜀
                if [[ $LINE_TEXT == "" ]]; then
                    continue
                fi
                # 티켓번호가 이미 추가되어 있는 경우 건너뜀
                if [[ $LINE_TEXT == *"]" ]]; then
                    continue
                fi

                TEMP=$(mktemp)

                awk -v LINE_NUMBER=$LINE_NUMBER -v TICKET=$TICKET 'NR==LINE_NUMBER{$0=$0 " [" TICKET "]"}1' $FILE > $TEMP && mv $TEMP $FILE
                echo "$FILE 에 지라 티켓 번호를 추가했어요."
                git add $FILE
            fi
        done
fi


