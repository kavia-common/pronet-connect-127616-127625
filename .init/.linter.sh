#!/bin/bash
cd /home/kavia/workspace/code-generation/pronet-connect-127616-127625/members_connect_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

