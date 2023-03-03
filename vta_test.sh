#!/bin/bash


PRODUCT_NAME='virtualtransactionapp'; export PRODUCT_NAME
PROCESS_NAME='main'; export PROCESS_NAME
MONGO_URL='mongodb+srv://UCCcapstonedev001:5PXqn04ayzsWEajD@vtaappdb.psxzsv1.mongodb.net/vtaappdb?retryWrites=true&w=majority'; export MONGO_URL
MAIL_URL='smtp://registrar@uccvta.app:othxuofwsvpuvqge@smtp.gmail.com:587'; export MAIL_URL
GOOGLE_CLIENT_ID='284176194268-opvrh2htrhdujs03597tmin74tk15h6f.apps.googleusercontent.com'; export GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET='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'; export GOOGLE_CLIENT_SECRET


meteor run --settings settings-dev.json