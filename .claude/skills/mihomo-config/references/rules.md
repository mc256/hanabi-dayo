# Mihomo Rule Types Reference

Source: https://wiki.metacubex.one/en/config/rules/

## Syntax

```
RULE-TYPE,payload,proxy-group[,parameters]
```

Rules are evaluated top-to-bottom. First match wins. `MATCH` must be last.

## Domain-Based Rules

| Rule | Description | Example |
|------|-------------|---------|
| `DOMAIN` | Exact domain match | `DOMAIN,ad.com,REJECT` |
| `DOMAIN-SUFFIX` | Domain + subdomains | `DOMAIN-SUFFIX,google.com,Proxy` |
| `DOMAIN-KEYWORD` | Keyword in domain | `DOMAIN-KEYWORD,google,Proxy` |
| `DOMAIN-WILDCARD` | `*` and `?` wildcards | `DOMAIN-WILDCARD,*.google.com,Proxy` |
| `DOMAIN-REGEX` | Regex match | `DOMAIN-REGEX,^ad\.,REJECT` |
| `GEOSITE` | v2fly domain-list-community | `GEOSITE,netflix,Netflix` |

## IP-Based Rules (Destination)

All support optional `no-resolve` parameter to skip DNS resolution.

| Rule | Description | Example |
|------|-------------|---------|
| `IP-CIDR` | IPv4/IPv6 CIDR range | `IP-CIDR,127.0.0.0/8,DIRECT,no-resolve` |
| `IP-CIDR6` | Alias for IPv6 CIDR | `IP-CIDR6,::1/128,DIRECT,no-resolve` |
| `IP-SUFFIX` | IP suffix match | `IP-SUFFIX,8.8.8.8/24,Proxy,no-resolve` |
| `IP-ASN` | AS number match | `IP-ASN,13335,Proxy,no-resolve` |
| `GEOIP` | Country code match | `GEOIP,CN,DIRECT,no-resolve` |

## Source IP Rules

| Rule | Description | Example |
|------|-------------|---------|
| `SRC-IP-CIDR` | Source IP range | `SRC-IP-CIDR,192.168.1.0/24,DIRECT` |
| `SRC-IP-SUFFIX` | Source IP suffix | `SRC-IP-SUFFIX,192.168.1.1/24,DIRECT` |
| `SRC-GEOIP` | Source IP country | `SRC-GEOIP,CN,DIRECT` |
| `SRC-IP-ASN` | Source IP ASN | `SRC-IP-ASN,9808,DIRECT` |

## Port Rules

| Rule | Description | Example |
|------|-------------|---------|
| `DST-PORT` | Destination port(s) | `DST-PORT,80/443,Proxy` |
| `SRC-PORT` | Source port(s) | `SRC-PORT,7777,DIRECT` |
| `IN-PORT` | Inbound listener port | `IN-PORT,7890,Proxy` |

## Inbound Rules

| Rule | Description | Example |
|------|-------------|---------|
| `IN-TYPE` | Inbound type | `IN-TYPE,SOCKS,Proxy` |
| `IN-USER` | Inbound username | `IN-USER,user1,Proxy` |
| `IN-NAME` | Listener name | `IN-NAME,socks-in,Proxy` |

## Process Rules

| Rule | Description | Example |
|------|-------------|---------|
| `PROCESS-NAME` | Executable name | `PROCESS-NAME,firefox,Proxy` |
| `PROCESS-NAME-REGEX` | Regex on name | `PROCESS-NAME-REGEX,(?i)chrome,Proxy` |
| `PROCESS-PATH` | Full path match | `PROCESS-PATH,/usr/bin/wget,Proxy` |
| `PROCESS-PATH-REGEX` | Regex on path | `PROCESS-PATH-REGEX,.*firefox.*,Proxy` |
| `PROCESS-NAME-WILDCARD` | Wildcard name | `PROCESS-NAME-WILDCARD,chrome*,Proxy` |
| `PROCESS-PATH-WILDCARD` | Wildcard path | `PROCESS-PATH-WILDCARD,/opt/*/bin,Proxy` |

## System Rules

| Rule | Description | Example |
|------|-------------|---------|
| `UID` | Linux user ID | `UID,1000,DIRECT` |
| `NETWORK` | tcp or udp | `NETWORK,udp,DIRECT` |
| `DSCP` | DSCP tag (tproxy UDP) | `DSCP,4,DIRECT` |

## Advanced Rules

| Rule | Description | Example |
|------|-------------|---------|
| `RULE-SET` | External rule provider | `RULE-SET,netflix,Netflix` |
| `AND` | Logical AND | `AND,((NETWORK,udp),(DST-PORT,443)),REJECT` |
| `OR` | Logical OR | `OR,((NETWORK,udp),(NETWORK,tcp)),Proxy` |
| `NOT` | Logical NOT | `NOT,((DOMAIN-SUFFIX,cn)),Proxy` |
| `SUB-RULE` | Sub-rule reference | `SUB-RULE,(NETWORK,tcp),sub-rules-1` |
| `MATCH` | Match all (catch-all) | `MATCH,Proxy` |

## The `no-resolve` Parameter

- Applied to IP-based rules: IP-CIDR, IP-CIDR6, IP-SUFFIX, IP-ASN, GEOIP
- When present: rule is skipped if the connection target is a domain (no DNS lookup triggered)
- When absent: mihomo resolves the domain to IP to check the rule, which may cause DNS leaks
- Best practice: always add `no-resolve` to IP rules when domain-based rules already cover the same services
