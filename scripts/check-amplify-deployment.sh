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

echo "AWS_REGION=$AWS_REGION"
echo "AMPLIFY_APP_ID=$AMPLIFY_APP_ID"
echo "BRANCH_NAME=$BRANCH_NAME"
echo "COMMIT_ID=$COMMIT_ID"

for i in {1..60}; do
  DEPLOYMENT_STATUS=$(aws amplify list-jobs \
    --region "$AWS_REGION" \
    --app-id "$AMPLIFY_APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --query "jobSummaries[?commitId=='${COMMIT_ID}'] | [0].status" \
    --output text | xargs)

  echo "Raw deployment status: '$DEPLOYMENT_STATUS'"
  echo "Attempt $i/60  →  status: ${DEPLOYMENT_STATUS:-<none>}"

  if [[ "$DEPLOYMENT_STATUS" == "SUCCEED" ]]; then
    echo "Deployment succeeded."
    echo "DEPLOYMENT_STATUS=$DEPLOYMENT_STATUS" >> "$GITHUB_ENV"
    exit 0
  fi

  if [[ "$DEPLOYMENT_STATUS" == "FAILED" || "$DEPLOYMENT_STATUS" == "CANCELLED" ]]; then
    echo "Deployment failed or was cancelled."
    exit 1
  fi

  if [[ $i -lt 60 ]]; then
    echo "Not finished yet, waiting 10 s ..."
    sleep 10
  else
    echo "Timeout after 10 min, exiting."
    exit 1
  fi
done
