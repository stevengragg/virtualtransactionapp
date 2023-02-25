#!/bin/bash


PRODUCT_NAME='virtualtransactionapp'; export PRODUCT_NAME
PROCESS_NAME='main'; export PROCESS_NAME
MONGO_URL='mongodb+srv://UCCcapstonedev001:5PXqn04ayzsWEajD@vtaappdb.psxzsv1.mongodb.net/vtaappdb?retryWrites=true&w=majority'; export MONGO_URL


meteor run --settings settings-dev.json