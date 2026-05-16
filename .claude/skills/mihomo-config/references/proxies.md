# Mihomo Proxy Protocol Reference

Source: https://wiki.metacubex.one/en/config/proxies/

## Common Fields (All Proxy Types)

```yaml
- name: "proxy-name"       # required, must be unique
  type: ss                  # required: ss, vmess, trojan, vless, hysteria2, tuic, wireguard, socks5, http, etc.
  server: x.x.x.x          # required: server address (IP or domain)
  port: 443                 # required: server port
  udp: true                 # optional: enable UDP (default: false for most types)
  ip-version: ipv4          # optional: ipv4, ipv6, dual (default: dual)
  dialer-proxy: "group"     # optional: proxy chaining (see dialer-proxy.md)
  interface-name: "eth0"    # optional: bind to specific interface
  routing-mark: 1234        # optional: Linux routing mark
```

## Shadowsocks (ss)

```yaml
- name: "ss-example"
  type: ss
  server: server.example.com
  port: 8388
  cipher: aes-256-gcm       # see cipher list below
  password: "password"
  udp: true
  udp-over-tcp: false        # encapsulate UDP in TCP
  udp-over-tcp-version: 2    # version 1 or 2
  plugin: obfs               # optional: obfs, v2ray-plugin, shadow-tls, restls
  plugin-opts:
    mode: tls
    host: example.com
```

**Supported ciphers:**
- AEAD: `aes-128-gcm`, `aes-256-gcm`, `chacha20-ietf-poly1305`
- 2022-Blake3: `2022-blake3-aes-128-gcm`, `2022-blake3-aes-256-gcm`, `2022-blake3-chacha20-poly1305`
- Legacy (not recommended): `aes-128-cfb`, `rc4-md5`, `chacha20-ietf`, etc.

### SS Plugins

**obfs:**
```yaml
plugin: obfs
plugin-opts:
  mode: tls          # tls or http
  host: example.com
```

**v2ray-plugin:**
```yaml
plugin: v2ray-plugin
plugin-opts:
  mode: websocket
  tls: true
  host: example.com
  path: "/"
  fingerprint: chrome
```

**shadow-tls:**
```yaml
plugin: shadow-tls
plugin-opts:
  host: example.com
  password: "stls-password"
  version: 3            # 1, 2, or 3
  client-fingerprint: chrome
```

## VMess

```yaml
- name: "vmess-example"
  type: vmess
  server: server.example.com
  port: 443
  uuid: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  alterId: 0             # 0 for AEAD (recommended)
  cipher: auto           # auto, aes-128-gcm, chacha20-poly1305, none
  udp: true
  tls: true
  servername: example.com
  fingerprint: chrome
  network: ws            # ws, grpc, h2, http
  ws-opts:
    path: "/path"
    headers:
      Host: example.com
```

## Trojan

```yaml
- name: "trojan-example"
  type: trojan
  server: server.example.com
  port: 443
  password: "password"
  udp: true
  sni: example.com
  fingerprint: chrome
  alpn:
    - h2
    - http/1.1
  network: ws             # optional: ws, grpc
  ws-opts:
    path: "/path"
```

## VLESS

```yaml
- name: "vless-example"
  type: vless
  server: server.example.com
  port: 443
  uuid: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  flow: xtls-rprx-vision  # optional
  udp: true
  tls: true
  servername: example.com
  fingerprint: chrome
  network: ws
  reality-opts:            # for REALITY
    public-key: "..."
    short-id: "..."
```

## Hysteria2

```yaml
- name: "hy2-example"
  type: hysteria2
  server: server.example.com
  port: 443
  password: "password"
  obfs: salamander
  obfs-password: "obfs-pass"
  sni: example.com
  fingerprint: chrome
  alpn:
    - h3
  up: "100 Mbps"
  down: "200 Mbps"
```

## SOCKS5

```yaml
- name: "socks-example"
  type: socks5
  server: 127.0.0.1
  port: 1080
  username: "user"        # optional
  password: "pass"        # optional
  udp: true
  tls: false
```

## HTTP

```yaml
- name: "http-example"
  type: http
  server: 127.0.0.1
  port: 8080
  username: "user"        # optional
  password: "pass"        # optional
  tls: false
```

## WireGuard

```yaml
- name: "wg-example"
  type: wireguard
  server: server.example.com
  port: 51820
  private-key: "base64-private-key"
  public-key: "base64-public-key"
  ip: 10.0.0.2
  ipv6: "fd00::2"
  dns:
    - 1.1.1.1
  mtu: 1420
  udp: true
```
