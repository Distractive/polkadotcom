#!/usr/bin/env bash
set -e

if [[ $# -lt 4 ]]; then
  echo "Error: Missing parameters"
  echo "Usage: $0 <aws_region> <amplify_app_id> <branch_name> <commit_id>"
  exit 1
fi

AWS_REGION="$1"
AMPLIFY_APP_ID="$2"
BRANCH_NAME="$3"
COMMIT_ID="$4"

echo "All required parameters provided:"
echo "- AWS region   : $AWS_REGION"
echo "- Amplify app ID : $AMPLIFY_APP_ID"
echo "- Branch name    : $BRANCH_NAME"
echo "- Commit ID      : $COMMIT_ID"
