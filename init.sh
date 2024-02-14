#!/bin/bash

# Initialization de la DB
echo "====================="

ls /
cd /dataset

for directory in *; do
    if [ -d "${directory}" ] ; then
        echo "$directory"
        for data_file in $directory/*; do
            mongoimport --drop --db "$directory" --collection "$(basename $data_file .json)" --file $data_file  --username "root"  --authenticationDatabase admin --password "test123"
        done
    fi
done