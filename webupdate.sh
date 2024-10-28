#!/bin/bash
source_folder="./frontend"
destination_folder="/var/www/html"
cp -rf "$source_folder"/* "$destination_folder"
service apache2 restart