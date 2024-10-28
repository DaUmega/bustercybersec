#!/bin/bash

set -e

iptables_path=$(command -v iptables)

$iptables_path -I INPUT -p tcp --dport 80 -j ACCEPT
$iptables_path -I INPUT -p tcp --dport 443 -j ACCEPT
$iptables_path -I INPUT -p udp --dport 53 -j ACCEPT
