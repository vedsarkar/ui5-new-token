---
"@reltio/auth": patch
---

`decodeAccessToken`: raise `MAX_DECOMPRESSED_SIZE` from 8 KiB to 128 KiB and `MAX_COMPRESSED_SIZE` from 8 KiB to 16 KiB so real Reltio access tokens for permission-rich users (multi-tenant admins, federated accounts) can be decoded. Previously these tokens decompressed to 20–30 KB of claims JSON, tripped the decoded-size gate, made the decoder return `null`, and caused `callbackHandler` and `refreshTokenHandler` to clear `reltio_aurl` — silently disabling per-session brand routing. Also reroutes `MAX_ENCODED_PAYLOAD_SIZE` derivation to `MAX_COMPRESSED_SIZE` (the on-wire form is compressed, not decompressed) so the segment-length gate stays correctly sized as the two ceilings drift.
