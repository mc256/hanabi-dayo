# Mihomo Proxy Groups Reference

Source: https://wiki.metacubex.one/en/config/proxy-groups/

## Common Fields

```yaml
proxy-groups:
  - name: "group-name"      # required, must be unique
    type: select             # required: select, url-test, fallback, load-balance, relay
    proxies:                 # list of proxy names or built-in: DIRECT, REJECT, PASS
      - proxy1
      - proxy2
      - DIRECT
    use:                     # reference proxy-providers by name
      - provider1
    filter: "(?i)us|united"  # optional: regex filter for provider proxies
    exclude-filter: "expire" # optional: exclude proxies matching regex
```

## Group Types

### select — Manual Selection

User manually picks which proxy to use.

```yaml
- name: "Manual"
  type: select
  proxies:
    - auto-group
    - proxy1
    - proxy2
    - DIRECT
```

### url-test — Auto Best Latency

Automatically selects the proxy with lowest latency.

```yaml
- name: "Auto"
  type: url-test
  proxies:
    - proxy1
    - proxy2
  url: https://www.gstatic.com/generate_204
  interval: 300              # test interval in seconds
  tolerance: 50              # switch only if new best is >50ms faster
  lazy: true                 # don't test until first use
```

### fallback — Auto Failover

Uses first available proxy; falls back to next if current fails.

```yaml
- name: "Failover"
  type: fallback
  proxies:
    - proxy1
    - proxy2
    - DIRECT
  url: https://www.gstatic.com/generate_204
  interval: 300
```

### load-balance — Distribute Traffic

Distributes connections across proxies.

```yaml
- name: "Balance"
  type: load-balance
  proxies:
    - proxy1
    - proxy2
  url: https://www.gstatic.com/generate_204
  interval: 300
  strategy: consistent-hashing   # or round-robin, sticky-sessions
```

### relay — Proxy Chain (DEPRECATED)

Creates a chain of proxies. **Deprecated in favor of `dialer-proxy`.**

```yaml
- name: "Chain"
  type: relay
  proxies:
    - entry-group      # first hop
    - exit-group       # last hop (exit to internet)
```

Traffic flow: `Client -> entry-group -> exit-group -> Internet`

**Migration:** Use `dialer-proxy` on individual proxies instead. See `dialer-proxy.md`.

## Built-in Proxy Names

These can be used in any `proxies:` list:
- `DIRECT` — direct connection, no proxy
- `REJECT` — block the connection
- `REJECT-DROP` — silently drop (no RST)
- `PASS` — skip to next rule

## Using Providers in Groups

```yaml
proxy-groups:
  - name: "All Nodes"
    type: select
    use:
      - provider1        # includes all proxies from provider1
      - provider2
    proxies:
      - DIRECT           # can mix manual entries with providers
```

## Health Check

Groups with `url-test`, `fallback`, and `load-balance` support health checking:

```yaml
url: https://www.gstatic.com/generate_204   # health check URL
interval: 300                                 # check interval (seconds)
lazy: true                                    # defer checks until first use
timeout: 5000                                 # health check timeout (ms)
expected-status: 204                          # expected HTTP status
```
