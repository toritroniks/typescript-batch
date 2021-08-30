#!/bin/bash
set -e

case "$1" in
run)
    JOB_NAME=$2
    shift 2
    node "./jobs/${JOB_NAME}/handler.js" "$@"
    exit $?
    ;;
*)
    exec "$@"
    break
    ;;
esac
