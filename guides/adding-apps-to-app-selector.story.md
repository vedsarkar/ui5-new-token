# Adding Your Application to the App Selector

This guide walks product teams through the complete process of adding a new application to the App Selector — the grid-style navigation popover (historically known as the "chocolate bar") that appears across all Reltio UI applications.

> **Who is this for:** Developers and product managers responsible for integrating new applications into the Reltio platform navigation.

## Overview

The App Selector is powered by the `AppSelector` component from the Reltio Design Platform. It receives a list of applications from **Config Service** — a centralized configuration store that determines which apps are visible for each tenant and environment.

**Config Service** (`/service/common`) stores the list of apps per tenant/environment. The host application fetches `response.data.apps` and passes it directly to `<AppSelector apps={apps} />`, which renders the navigation grid.

Adding a new app involves three stages:

1. **Register** — add app metadata and icon to the App Catalog (`catalog.json`)
2. **Test** — configure the app in Config Service on an internal environment
3. **Roll out** — request production deployment through Release Management

## Step 1: Register Your App in the Catalog

The App Catalog at [`public/apps/catalog.json`](https://reltio.design/apps/catalog.json) in the [`reltio-design`](https://bitbucket.org/reltio-ondemand/reltio-design/src/main/) repository is the official registry of all Reltio platform applications. Each app must be registered here before being added to Config Service.

### 1.1 Prepare Your App Icon

Your app icon must be an SVG file. Place it in `public/apps/icons/` with a descriptive kebab-case name.

**Requirements:**

- Format: SVG
- Naming: `your-app-name.svg` (kebab-case)
- Location: `public/apps/icons/`

After the PR is merged to `main`, the icon becomes available at:
```
https://reltio.design/apps/icons/your-app-name.svg
```

### 1.2 Add Your App Descriptor

Add a new entry to the `apps` array in [`public/apps/catalog.json`](https://reltio.design/apps/catalog.json). The full schema is defined in [`public/apps/catalog.schema.json`](https://reltio.design/apps/catalog.schema.json).

**Required fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Human-readable display name of the application. |
| `description` | string | Brief description of the app's purpose. |
| `icon` | string (URL) | Absolute URL to the SVG icon hosted on `reltio.design`. |
| `category` | string (enum) | One of: `Agentflow`, `Applications`, `Configuration`, `Resources`, `Security`, `Tenant Management`. |
| `uri` | string (URL) | Application URL. Can use `${environment}` and `${tenant}` placeholders. |

### 1.3 Choose the Right Category

| Category | Use for |
|----------|---------|
| **Agentflow** | AI-powered conversational applications (Agents, Quality) |
| **Applications** | Core platform applications (Hub, Console, RDM, Inbox, Integration Hub) |
| **Configuration** | Tools for configuring tenants (Data Modeler, UI Modeler, Workflow Modeler, Notification Management, Data Sharing) |
| **Resources** | External portals and documentation (Developer Portal, Documentation Portal, Community, Learn) |
| **Security** | Authentication and access management (Account Settings, User Management, Client Credentials, SSO Configuration) |
| **Tenant Management** | Tenant administration tools (Tenant Management, Performance Monitoring, Data Loader, Export, External Match, Usage Reporting) |

### 1.4 Define Your App URI

The URI defines where the App Selector link points to. Use `${environment}` and `${tenant}` as placeholders — they are replaced at runtime with the current environment and tenant identifiers.

**Standard pattern** — environment as a query parameter:

```json
{
  "uri": "https://your-app.reltio.com/?env=${environment}&tenant=${tenant}"
}
```

**Examples from existing apps:**

```json
// Agents — environment as query parameter
{
  "uri": "https://reltio.ai/agent-flow?tenant=${tenant}&env=${environment}"
}

// Hub — environment as subdomain (exception)
{
  "uri": "https://${environment}.reltio.com/nui/${tenant}"
}

// Console — environment as query parameter
{
  "uri": "https://console.reltio.com/?env=${environment}&tenant=${tenant}"
}
```

> **Important:** `${environment}` maps to the `env` query parameter value, not to the application subdomain. The Hub app is a known exception where the environment identifier is part of the domain name.

### 1.5 Example App Descriptor

```json
{
  "name": "My AI App",
  "description": "AI-powered application for intelligent data management.",
  "icon": "https://reltio.design/apps/icons/my-ai-app.svg",
  "category": "Agentflow",
  "uri": "https://reltio.ai/my-ai-app?tenant=${tenant}&env=${environment}"
}
```

### 1.6 Submit Your PR

1. Add the icon SVG to `public/apps/icons/`
2. Add the app descriptor to [`public/apps/catalog.json`](https://reltio.design/apps/catalog.json)
3. Create a PR to the `reltio-design` repository
4. After merge to `main`, the icon is available on `https://reltio.design`

## Step 2: Test on an Internal Environment

Config Service stores the list of apps displayed in the App Selector. You can directly configure apps on internal environments via API calls.

### 2.1 Get an Access Token

Obtain an OAuth token from the auth service for your target environment:

```bash
curl --request POST \
  --url https://auth.reltio.com/oauth/token \
  --header 'Authorization: Basic cmVsdGlvX3VpOm1ha2l0YQ==' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data username=YOUR_USERNAME \
  --data password=YOUR_PASSWORD \
  --data grant_type=password
```

Save the `access_token` from the response for subsequent requests.

### 2.2 Config Service API Reference

**Base URLs:**

| Environment | Base URL |
|-------------|----------|
| Internal (dev/test) | `https://idev-01-config-service.reltio.com` |
| Production | `https://config-service.reltio.com` |

**Endpoint:** `GET/POST/PUT/DELETE /service/common`

**Query parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `environment` | Yes | Environment identifier (e.g., `na01-prod`, `tst-01`). Use `default` for the global default configuration. |
| `tenant` | No | Tenant identifier. Omit or use `default` for the environment-wide default. |
| `default` | No | Set to `true` to retrieve the fallback default configuration when no specific config exists for the given tenant/environment. |

**Response format:**

```json
{
  "createdAt": 1756112066029,
  "data": {
    "apps": [
      {
        "icon": "https://reltio.design/apps/icons/mdm.svg",
        "name": "Hub",
        "category": "Applications",
        "uri": "https://${environment}.reltio.com/nui/${tenant}"
      }
    ]
  }
}
```

The `data.apps` array is passed directly to the AppSelector component's `apps` prop.

### 2.3 Read the Current Configuration

Always start by reading the existing configuration. This is your backup and your starting point.

**Read config for a specific tenant and environment:**

```bash
curl --request GET \
  --url 'https://idev-01-config-service.reltio.com/service/common?environment={ENV}&tenant={TENANT}' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json'
```

**Read the default config (fallback):**

```bash
curl --request GET \
  --url 'https://idev-01-config-service.reltio.com/service/common?environment={ENV}&tenant={TENANT}&default=true' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json'
```

> **Save the response!** Config Service only supports full replacements. Always back up the current config before making changes.

### 2.4 Default Fallback Logic

When Config Service receives a request with `&default=true`, it searches for the first available configuration in this order:

1. Exact match: `tenant={TENANT}` + `environment={ENV}`
2. Tenant default: `tenant={TENANT}` + `environment=default`
3. Environment default: `tenant=default` + `environment={ENV}`
4. Global default: `tenant=default` + `environment=default`

### 2.5 Add Your App to the Configuration

Take the current `data.apps` array from the GET response, add your new app entry, and send the full updated config.

**If the config already exists** (GET returned data), use PUT:

```bash
curl --request PUT \
  --url 'https://idev-01-config-service.reltio.com/service/common?environment={ENV}&tenant={TENANT}' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "apps": [
      ... existing apps from GET response ...,
      {
        "name": "My New App",
        "icon": "https://reltio.design/apps/icons/my-new-app.svg",
        "category": "Applications",
        "uri": "https://my-new-app.reltio.com/?env=${environment}&tenant=${tenant}"
      }
    ]
  }'
```

**If no config exists** (GET returned empty or error), use POST:

```bash
curl --request POST \
  --url 'https://idev-01-config-service.reltio.com/service/common?environment={ENV}&tenant={TENANT}' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json' \
  --data '{
    "apps": [
      ... apps from the default config GET response ...,
      {
        "name": "My New App",
        "icon": "https://reltio.design/apps/icons/my-new-app.svg",
        "category": "Applications",
        "uri": "https://my-new-app.reltio.com/?env=${environment}&tenant=${tenant}"
      }
    ]
  }'
```

> **Critical:** Config Service does NOT support partial updates. You must always send the complete `apps` array. Missing apps from your request will be removed from the configuration.

### 2.6 Verify in the Browser

1. Open the target application in a browser for the configured tenant/environment
2. Click the App Selector icon (grid icon in the top navigation)
3. Verify your app appears in the correct category
4. Click the app link and confirm it opens the correct URL in a new tab

### 2.7 Delete a Configuration (Optional)

To revert a tenant/environment to the default configuration:

```bash
curl --request DELETE \
  --url 'https://idev-01-config-service.reltio.com/service/common?environment={ENV}&tenant={TENANT}' \
  --header 'Authorization: Bearer {ACCESS_TOKEN}' \
  --header 'Content-Type: application/json'
```

After deletion, the tenant will fall back to the default configuration.

## Step 3: Production Rollout

Production Config Service is managed by the Release Management (RM) team. You cannot directly modify production configurations.

### 3.1 Create a JIRA Rollout Story

Create a new Story in the **RP** (Reltio Platform) project with the following details:

**Summary:**
```
[Rollout] Add {App Name} to App Selector configuration
```

**Description — use this template:**

```markdown
## What
Add {App Name} to the App Selector ("chocolate bar") configuration
in Config Service (`/service/common` namespace).

## App Descriptor
​```json
{
  "name": "{App Name}",
  "icon": "https://reltio.design/apps/icons/{app-icon}.svg",
  "category": "{Category}",
  "uri": "https://{your-app-url}/?env=${environment}&tenant=${tenant}"
}
​```

## Scope
- [ ] Add to the **default** configuration (`tenant=default`, `environment=default`)
- [ ] Add to **all existing custom configurations** for tenants/environments
      that override the default

## Config Service Endpoint (Production)
GET/PUT: https://config-service.reltio.com/service/common

## Steps for RM
1. GET the current default config:
   `GET /service/common?environment=default&tenant=default`
2. Add the app descriptor to `data.apps` array
3. PUT the updated config
4. Repeat for each custom tenant/environment configuration

## Verification
After applying the config, verify the app appears in the App Selector
for the configured tenants.

## References
- App Catalog PR: {link to your reltio-design PR}
- Confluence: [Visibility of Console UI applications](https://reltio.jira.com/wiki/spaces/IRD/pages/2155446787)
```

### 3.2 Scope: Default vs. Custom Configurations

This is the most critical part of the rollout. Config Service has no configuration inheritance — each custom configuration is a complete standalone copy.

**If your app should be visible to ALL tenants:**

1. Update the **default** configuration (`tenant=default`, `environment=default`)
2. Update **every existing custom configuration** individually

If you only update the default, tenants with custom configurations will not see your app. The rollout ticket must explicitly state that both default and custom configs need updating.

**If your app should be visible only to specific tenants:**

Only update the configurations for those specific tenants. List them in the JIRA ticket.

### 3.3 Assign and Track

1. Assign the rollout story to the **RM team**
2. Collect required sign-offs (PM, QA, and any involved teams)
3. Link verification tickets from QA/HF environments
4. Link to the Change Control JIRA ticket

For detailed rollout procedures, see [Rollout Stories, Sign-offs, and Jira Hygiene Guidelines](https://reltio.jira.com/wiki/spaces/RDEV/pages/4622024730).

## App Entry Reference

### Field Definitions

| Field | Type | Required | In Config | In Catalog | Description |
|-------|------|----------|-----------|------------|-------------|
| `name` | string | Yes | Yes | Yes | Human-readable display name |
| `uri` | string | Yes | Yes | Yes | App URL with optional `${environment}` / `${tenant}` placeholders |
| `icon` | string | Yes | Yes | Yes | Absolute URL to SVG icon |
| `category` | string | No | No | Yes | Grouping category. Defaults to "Applications" if omitted |
| `description` | string | No | No | Yes | App description (catalog only) |

### Minimal Config Service Entry

The minimum required fields for Config Service are `name`, `uri`, and `icon`:

```json
{
  "name": "My App",
  "uri": "https://my-app.reltio.com/?env=${environment}&tenant=${tenant}",
  "icon": "https://reltio.design/apps/icons/my-app.svg"
}
```

Apps without a `name` or `uri` are silently ignored by the AppSelector component.

## Troubleshooting

### "My app doesn't appear in the App Selector"

1. Verify the Config Service has your app — GET the config and check the `data.apps` array
2. Check that `name` and `uri` fields are present (entries missing either are filtered out)
3. Check the correct environment and tenant in the URL
4. Clear browser cache and reload

### "The app icon doesn't load"

1. Verify the icon URL is accessible: open `https://reltio.design/apps/icons/{your-icon}.svg` in a browser
2. Check that the host application allows loading images from `reltio.design` in its Content Security Policy (CSP). The `img-src` directive must include `https://reltio.design`.
3. For apps still using icons from `cdn.reltio.com`, consider migrating to `reltio.design` for consistency

### "Config Service returns an error"

1. Verify your access token is valid and not expired
2. Check that your user has the `Configuration Service` permission
3. Ensure the `environment` query parameter is provided (it is required)
4. Use POST for new configs and PUT for existing ones

### "I updated the default config but some tenants don't see the app"

Tenants with custom configurations are not affected by default config changes. Each custom config must be updated individually. See [Step 3.2](#32-scope-default-vs-custom-configurations).

## Quick Reference Checklist

- [ ] App icon (SVG) added to `public/apps/icons/` in `reltio-design` repo
- [ ] App descriptor added to [`public/apps/catalog.json`](https://reltio.design/apps/catalog.json)
- [ ] PR merged to `main`
- [ ] Icon accessible at `https://reltio.design/apps/icons/{name}.svg`
- [ ] Tested on internal environment via Config Service API
- [ ] App appears correctly in App Selector with right category
- [ ] App link opens the correct URL
- [ ] JIRA rollout story created for production
- [ ] Rollout story specifies: update default AND all custom configs
- [ ] RM team assigned

## References

- [Visibility of Console UI applications](https://reltio.jira.com/wiki/spaces/IRD/pages/2155446787) — original Confluence guide for Config Service operations
- [Rollout Stories, Sign-offs, and Jira Hygiene Guidelines](https://reltio.jira.com/wiki/spaces/RDEV/pages/4622024730) — rollout process for production changes
- [Config Service](https://reltio.jira.com/wiki/spaces/IRD/pages/2415034450) — Config Service architecture overview
- [App Catalog](https://reltio.design/apps/catalog.json) — current app catalog with all registered applications
- [App Catalog Schema](https://reltio.design/apps/catalog.schema.json) — JSON Schema for validating app descriptors
- [AppSelector Component](https://www.reltio.design/?path=/docs/components-appselector--docs) — Storybook documentation for the AppSelector component
