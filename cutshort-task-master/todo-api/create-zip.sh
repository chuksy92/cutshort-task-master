#!/bin/bash
zip -r todo-api_v1.zip . -x "*.git*" -x "*.zip*" -x "*.log*" -x "node_modules*" -x "tmp*" -x ".DS_Store" -x ".idea*" -x ".vscode*"

chmod +x create-zip.sh