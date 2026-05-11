# FileUploader

`FileUploader` is the SAP Fiori file-input control, re-exported from `@ui5/webcomponents-react/FileUploader` as the canonical Reltio entry point. Use it for one-off file pickers — CSV import for entity bulk-load, profile-photo upload, source-document attachment to a match — that fit inline in a form or toolbar.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/FileUploader`. The Reltio layer adds curation (this is the endorsed file-input surface), pinned versioning, and Reltio-specific guidance.

### Anatomy — input + optional Button trigger

By default the uploader renders a read-only text input (showing the picked filename) plus a Browse button. To replace the text input with a custom trigger, set `hideInput` and pass a `Button` (or any clickable element) as the slot child:

```tsx
<FileUploader hideInput onChange={onChange}>
  <Button design="Emphasized">Upload entity records…</Button>
</FileUploader>
```

The slot child handles both click-to-open and drag-and-drop visual styling.

### `accept` — MIME types and extensions

Restrict what the OS file picker shows. Accepts a comma-separated list of:

- File extensions including the dot (`".csv,.tsv"`)
- MIME types (`"image/png,image/jpeg"`)
- Wildcards (`"image/*"`, `"text/*"`)

```tsx
<FileUploader accept=".csv,text/csv,application/vnd.ms-excel" />
```

`accept` is a **filter, not a guarantee** — the user can still drop a non-matching file via drag-and-drop, or change the picker filter to "All files". Always re-validate on the client and server after upload.

### `multiple` — bulk selection

Set `multiple` to let the user pick more than one file at a time. The `FileList` from `onChange` contains all selected files; the input text shows `<N> files selected`.

### Reading the files — `event.detail.files`

The `onChange` event exposes the selected files via the event detail:

```tsx
<FileUploader
  onChange={(event) => {
    const files = event.detail.files;
    if (files && files.length > 0) {
      uploadToReltioApi(files[0]);
    }
  }}
/>
```

For server-side uploads, attach files to a `FormData` object and POST with `fetch`. The component does **not** perform the upload itself — it only collects the selection.

### Form integration

Set `name` so the file participates in a native `<form>` submission. The component's hidden `<input type="file">` is what the form serializer picks up. Pair with `required` for mandatory uploads.

### Validation — `valueState`

Use `valueState` to surface validation feedback inline: file-size limit exceeded, unsupported format, upload server error. Pair with `valueStateMessage` slot for the explanation.

### Accessibility

- Set `accessibleName` so the field's purpose is announced to screen readers (the placeholder is not a substitute).
- When using a custom trigger (`hideInput`), the trigger label IS the accessible name — keep it explicit (`"Upload entity records"`, not just `"Browse"`).

### See also

- [SAP Fiori File Uploader design guideline](https://experience.sap.com/fiori-design-web/upload-collection/) — semantic guidance and visual patterns
- [UI5 FileUploader web component reference](https://ui5.github.io/webcomponents/components/FileUploader/) — full underlying API
