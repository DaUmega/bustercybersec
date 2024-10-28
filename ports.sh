#!/bin/bash

set -e

/usr/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT
/usr/sbin/iptables -I INPUT -p tcp --dport 443 -j ACCEPT
/usr/sbin/iptables -I INPUT -p udp --dport 53 -j ACCEPT
