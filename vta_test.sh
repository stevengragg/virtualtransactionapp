#!/bin/bash


PRODUCT_NAME='virtualtransactionapp'; export PRODUCT_NAME
PROCESS_NAME='main'; export PROCESS_NAME
MONGO_URL='mongodb+srv://UCCcapstonedev001:5PXqn04ayzsWEajD@vtaappdb.psxzsv1.mongodb.net/vtaappdb?retryWrites=true&w=majority'; export MONGO_URL
GOOGLE_CLIENT_ID='904830233844-tj8hkbncqmq90int8c65i9brjbdmf1gh.apps.googleusercontent.com'; export GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET='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'; export GOOGLE_CLIENT_SECRET


meteor run --settings settings-dev.json