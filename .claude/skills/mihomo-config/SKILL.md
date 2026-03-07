---
name: mihomo-config
description: Edit and manage Mihomo (Clash Meta) proxy configuration files. Use when the user needs to modify proxy rules, add/remove proxies, configure proxy groups, set up dialer-proxy chains, manage rule-providers, or troubleshoot Mihomo YAML configs. Triggers include requests to "edit clash config", "add a proxy rule", "set up dialer-proxy", "configure proxy chaining", "add proxy group", "modify mihomo yaml", "setup relay", or any Mihomo/Clash configuration task.
allowed-tools: Read,Edit,Write,Grep,Glob,Bash(cat:*),Bash(yq:*),WebFetch,WebSearch
---

# Mihomo (Clash Meta) Configuration Agent

You are an expert at editing Mihomo proxy core configuration files (YAML).
Always read the target config file first before making changes.

## Key References

Before editing, review relevant reference docs in this skill's `references/` directory:
- `references/rules.md` — All rule types and syntax
- `references/dialer-proxy.md` — Proxy chaining with dialer-proxy
- `references/proxies.md` — Proxy protocol configs (SS, VMess, Trojan, etc.)
- `references/proxy-groups.md` — Proxy group types (select, url-test, fallback, load-balance, relay)

For the latest docs, consult: https://wiki.metacubex.one/en/config/

## Mihomo Config Structure

A Mihomo YAML config has these top-level sections (order matters):

```yaml
# 1. General settings
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
unified-delay: true

# 2. DNS
dns:
  enable: true
  enhanced-mode: fake-ip
  nameserver: [...]

# 3. Proxy definitions
proxies:
  - name: "my-ss"
    type: ss
    server: x.x.x.x
    port: 8388
    cipher: aes-256-gcm
    password: "pass"

# 4. Proxy providers (remote subscription)
proxy-providers:
  provider1:
    type: http
    url: "https://..."
    path: ./providers/p1.yaml
    interval: 3600

# 5. Proxy groups
proxy-groups:
  - name: "Proxy"
    type: select
    proxies: [...]
    use: [provider1]

# 6. Rule providers
rule-providers:
  geosite-netflix:
    type: http
    behavior: domain
    url: "https://..."
    path: ./rules/netflix.yaml
    interval: 86400

# 7. Rules (evaluated top-to-bottom, first match wins)
rules:
  - DOMAIN-SUFFIX,google.com,Proxy
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
```

## Critical Rules When Editing

1. **Always read the file first** — understand the existing structure before modifying
2. **Preserve YAML formatting** — use consistent 2-space indentation
3. **Rule order matters** — rules are evaluated top-to-bottom, first match wins
4. **MATCH must be last** — it's the catch-all rule
5. **no-resolve on IP rules** — add `no-resolve` to IP-CIDR/GEOIP rules to avoid DNS leaks when domain rules already cover the same traffic
6. **Proxy names must be unique** — across proxies, proxy-providers, and proxy-groups
7. **Validate references** — any proxy/group name used in rules or dialer-proxy must exist

## dialer-proxy (Proxy Chaining)

Use `dialer-proxy` to route one proxy's connection through another proxy.
This is the modern replacement for the deprecated `relay` group type.

### User's Scenario: Traffic transits via 3rd-party, exits from own SS server

The user's own SS server is the **exit** (internet-facing). 3rd-party purchased nodes are the **transit** (entry).
`dialer-proxy` means "use this to dial/reach my server", so it goes on `my-ss` pointing to the transit group.

```yaml
proxies:
  - name: "my-ss"
    type: ss
    server: my-server.example.com
    port: 8388
    cipher: aes-256-gcm
    password: "mypass"
    dialer-proxy: transit-select  # reach my-ss server THROUGH 3rd-party transit nodes

proxy-providers:
  third-party:
    type: http
    url: "https://subscription-url..."
    path: ./providers/third-party.yaml
    interval: 3600

proxy-groups:
  - name: transit-select
    type: select          # or url-test for auto-selection
    use:
      - third-party       # 3rd party nodes as transit/entry

  - name: main-proxy
    type: select
    proxies:
      - my-ss             # select this to use the chain
      - DIRECT

rules:
  - MATCH,main-proxy
```

Traffic flow: `Client -> transit-select (3rd party) -> my-ss server (your VPS, exit) -> Internet`
Websites see your SS server's IP.

### Key dialer-proxy Notes
- `dialer-proxy` is set on individual proxies, NOT on proxy-groups
- The value must be a proxy name or proxy-group name
- For provider-based proxies, use `override.dialer-proxy` in the provider config
- Recommended: use simple protocols (SS AEAD, VMess) for relay nodes; avoid UDP-heavy protocols (Hysteria2, TUIC) and TLS-wrapping protocols (REALITY, ShadowTLS) on the first hop
- Relay supports UDP only if both head and tail support UDP-over-TCP

## Common Editing Patterns

### Adding a rule before MATCH
Find the MATCH rule and insert above it.

### Adding a proxy to an existing group
Find the proxy-group by name and append to its `proxies:` list.

### Adding a rule-provider + rules
1. Add the provider under `rule-providers:`
2. Add `RULE-SET,provider-name,group-name` in the rules section

## Config File Locations

Common Mihomo config paths:
- Sparkle (this project): `~/.config/sparkle/profiles/*.yaml`
- Clash Verge: `~/.config/clash-verge-rev/profiles/*.yaml`
- Manual: wherever the user specifies

## Validation Checklist

Before finishing an edit:
- [ ] All referenced proxy/group names exist
- [ ] MATCH rule is still last
- [ ] No duplicate proxy names
- [ ] YAML is valid (proper indentation, quoting)
- [ ] IP-CIDR rules have `no-resolve` where appropriate
- [ ] dialer-proxy targets exist and don't create circular chains
