#!/bin/bash

set -e

apt-get update
apt-get upgrade -y
apt-get install -y bind9 bind9utils bind9-doc

domain_name='bustercybersec.com'
public_ip='129.213.125.193'
private_ip='10.0.0.250'

lines_to_add=(
	'include "/etc/bind/named.conf.options";'
	'include "/etc/bind/named.conf.local";'
	'include "/etc/bind/named.conf.default-zones";'
)
for line in "${lines_to_add[@]}"; do
	if ! grep -qF "$line" /etc/bind/named.conf; then
		echo "$line" >> /etc/bind/named.conf
	fi
done

if ! grep -qF "listen-on port 53" /etc/bind/named.conf.options; then
	sed -i '/^options {/a\	listen-on port 53 { 127.0.0.1; '${private_ip}'; '${public_ip}'; };' /etc/bind/named.conf.options
fi

if ! grep -qF "zone \"${domain_name}\" {" /etc/bind/named.conf.local; then
	echo "zone \"${domain_name}\" {
		type master;
		file \"/etc/bind/${domain_name}\";
	};" >> /etc/bind/named.conf.local
fi

today=$(date '+%Y%m%d')

echo "\$TTL 86400
@   IN  SOA     ns1.${domain_name}. root.${domain_name}. (
		${today}01  ;Serial
		3600        ;Refresh
		1800        ;Retry
		604800      ;Expire
		86400       ;Minimum TTL
)
@       IN  NS          ns1.${domain_name}.
@       IN  NS          ns2.${domain_name}.
ns1     IN  A           ${public_ip}
ns2     IN  A           ${public_ip}
@       IN  A           ${public_ip}" > /etc/bind/${domain_name}

chmod -R 755 /etc/bind
chown -R bind:bind /etc/bind

#These should return nothing
named-checkconf /etc/bind/named.conf
named-checkconf /etc/bind/named.conf.local

#Another check, should say OK
named-checkzone ${domain_name} /etc/bind/${domain_name}

systemctl restart bind9

# My own tests to make sure things work:
dig @localhost www.bustercybersec.com
dig @${private_ip} www.bustercybersec.com
dig @${public_ip} www.bustercybersec.com
