# dialer-proxy — Proxy Chaining in Mihomo

Source: https://wiki.metacubex.one/en/config/proxies/dialer-proxy/

## Overview

`dialer-proxy` specifies that a proxy should establish its connection through another proxy or proxy-group. This creates proxy chains (also called relay or cascade).

**Important:** `dialer-proxy` is a field on individual **proxies** (or via `override` in proxy-providers), NOT on proxy-groups directly.

## How dialer-proxy Works

`dialer-proxy` means "use this proxy/group to **dial** (reach) my server". The proxy with `dialer-proxy` set is the **exit** (last hop, internet-facing). The dialer is the **transit** (first hop, entry).

Key mental model:
- The proxy you select in rules = the **exit** (its server connects to the target)
- Its `dialer-proxy` = the **transit** (used to reach the exit server)
- Traffic: `Client -> dialer (transit) -> proxy server (exit) -> Internet`
- Websites see the **exit** proxy's IP

## Basic Example

```yaml
proxies:
  - name: "ss1"
    type: ss
    server: server1.example.com
    port: 443
    cipher: aes-128-gcm
    password: "password1"
    dialer-proxy: dialer    # reach ss1's server THROUGH the "dialer" group

  - name: "ss2"
    type: ss
    server: server2.example.com
    port: 443
    cipher: aes-128-gcm
    password: "password2"

proxy-groups:
  - name: dialer
    type: select
    proxies:
      - ss2

rules:
  - MATCH,ss1
```

**Traffic flow:** `Client -> ss2 (transit/dialer) -> ss1 server (exit) -> Internet`

The target website sees ss1's server IP. ss2 is only the transit layer.

## Use Case: Transit via 3rd-Party, Exit from Own SS Server

3rd-party purchased nodes act as **transit** (entry). Your own SS server is the **exit** (internet-facing).
Websites see your SS server's IP.

```yaml
proxies:
  - name: "my-shadowsocks"
    type: ss
    server: my-vps.example.com
    port: 8388
    cipher: aes-256-gcm
    password: "my-password"
    udp: true
    dialer-proxy: transit-nodes   # reach my SS server THROUGH 3rd-party transit

proxy-providers:
  third-party-sub:
    type: http
    url: "https://my-subscription-url/clash"
    path: ./providers/third-party.yaml
    interval: 3600
    health-check:
      enable: true
      url: https://www.gstatic.com/generate_204
      interval: 300

proxy-groups:
  - name: transit-nodes
    type: url-test            # auto-select fastest 3rd-party transit node
    use:
      - third-party-sub
    tolerance: 50

  - name: main
    type: select
    proxies:
      - my-shadowsocks        # select this to use the chain
      - DIRECT

rules:
  - MATCH,main
```

**Traffic flow:** `Client -> transit-nodes (3rd party) -> my-shadowsocks server (your VPS, exit) -> Internet`

## Use Case: Transit via Own Proxy, Exit from Subscription Nodes

Your own proxy is the **transit** (entry). Subscription nodes are the **exit** (internet-facing).
Use `override.dialer-proxy` in the provider config:

```yaml
proxies:
  - name: "my-transit"
    type: ss
    server: my-vps.example.com
    port: 8388
    cipher: aes-256-gcm
    password: "pass"

proxy-providers:
  subscription:
    type: http
    url: "https://subscription-url/clash"
    path: ./providers/sub.yaml
    interval: 3600
    override:
      dialer-proxy: my-transit   # ALL subscription nodes reached through my-transit

proxy-groups:
  - name: proxy-select
    type: select
    use:
      - subscription

rules:
  - MATCH,proxy-select
```

**Traffic flow:** `Client -> my-transit (your VPS, transit) -> subscription-node (exit) -> Internet`

Websites see the subscription node's IP. Your VPS is only the transit.

## Use Case: Isolated Network (SOCKS Breakout)

When your machine can only reach the internet through a SOCKS proxy:

```yaml
proxies:
  - name: "socks-breakout"
    type: socks5
    server: 10.0.0.1
    port: 1080

proxy-providers:
  external:
    type: http
    url: "https://external-sub/clash"
    path: ./providers/external.yaml
    override:
      dialer-proxy: socks-breakout

proxy-groups:
  - name: select
    type: select
    use:
      - external

rules:
  - MATCH,select
```

**Traffic flow:** `Client -> socks-breakout (transit) -> external node (exit) -> Internet`

## Migrating from Relay to dialer-proxy

Old relay style (deprecated):
```yaml
proxy-groups:
  - name: relay-chain
    type: relay
    proxies:
      - select-entry
      - select-exit
```

New dialer-proxy style:
```yaml
proxy-providers:
  exit-provider:
    type: inline
    override:
      dialer-proxy: select-entry
    payload:
      - { name: "exit1", type: socks5, server: ..., port: ... }

proxy-groups:
  - name: select-entry
    type: select
    proxies: [entry1, entry2]
  - name: select-exit
    type: select
    use: [exit-provider]
```

## Protocol Recommendations for Chaining

For the transit node (first hop), prefer simple, lightweight protocols:
- **Recommended:** SS (AEAD ciphers like aes-256-gcm, chacha20-ietf-poly1305), VMess
- **Avoid:** Hysteria2, TUIC, WireGuard (UDP-heavy), REALITY, ShadowTLS (TLS-wrapping adds complexity)

## Important Notes

- `dialer-proxy` does NOT support circular references (A -> B -> A will fail)
- Proxy-groups themselves cannot have `dialer-proxy`; use `override.dialer-proxy` in proxy-providers instead
- For UDP support through chains, both head and tail proxies must support UDP-over-TCP
- The `dialer-proxy` value must match an existing proxy name or proxy-group name exactly
