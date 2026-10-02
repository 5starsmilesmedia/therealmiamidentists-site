/* @ds-bundle: {"format":4,"namespace":"Ds5StarSmilesDesignSystem_9c05a5","components":[{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/display/Badge.jsx":"56ba74ea2ff1","components/display/Card.jsx":"31864accd842","components/display/Tag.jsx":"fd4d96a7bb5a","components/feedback/Dialog.jsx":"b2612457a6be","components/feedback/Toast.jsx":"bc256a4b466f","components/feedback/Tooltip.jsx":"bf3ef1d203f7","components/forms/Button.jsx":"bbde59440716","components/forms/Checkbox.jsx":"97e674e2b836","components/forms/IconButton.jsx":"5ad3c6ac4ad8","components/forms/Input.jsx":"e64805cdf68e","components/forms/Radio.jsx":"b84737382486","components/forms/Select.jsx":"6d605e5b1311","components/forms/Switch.jsx":"9c8b2259d250","components/navigation/Tabs.jsx":"ae1a3d5a7eb1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.Ds5StarSmilesDesignSystem_9c05a5 = window.Ds5StarSmilesDesignSystem_9c05a5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/display/Badge.jsx
try { (() => {
const css = `
.fss-badge{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-wide);text-transform:uppercase;padding:5px 12px;border:1px solid var(--line);color:var(--text-body);border-radius:var(--radius-0);}
.fss-badge--accent{border-color:var(--accent);color:var(--accent);}
.fss-badge--solid{background:var(--text-display);border-color:var(--text-display);color:var(--surface-page);}
.fss-badge__dot{width:5px;height:5px;background:currentColor;flex:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-badge-css')) {
  const s = document.createElement('style');
  s.id = 'fss-badge-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Badge({
  variant = 'outline',
  dot = false,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: style,
    className: `fss-badge ${variant !== 'outline' ? `fss-badge--${variant}` : ''} ${className}`
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: "fss-badge__dot",
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
const css = `
.fss-card{background:var(--surface-card);border:1px solid var(--line);border-radius:var(--radius-0);display:flex;flex-direction:column;font-family:var(--font-sans);transition:border-color var(--dur-base) var(--ease-lux);overflow:hidden;}
.fss-card--hover:hover{border-color:var(--text-muted);cursor:pointer;}
.fss-card__media{position:relative;aspect-ratio:4/5;background:var(--surface-raised);overflow:hidden;}
.fss-card--wide .fss-card__media{aspect-ratio:16/9;}
.fss-card__media img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.08);display:block;}
.fss-card__media::after{content:'';position:absolute;inset:0;background:var(--protect-bottom);pointer-events:none;}
.fss-card__body{padding:var(--space-5);display:flex;flex-direction:column;gap:var(--space-3);}
.fss-card__kicker{font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-caps);text-transform:uppercase;color:var(--text-muted);}
.fss-card__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-xl);line-height:var(--leading-tight);color:var(--text-display);margin:0;}
.fss-card__text{font-size:var(--text-sm);line-height:var(--leading-body);color:var(--text-body);margin:0;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-card-css')) {
  const s = document.createElement('style');
  s.id = 'fss-card-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Card({
  kicker,
  title,
  children,
  image,
  imageAlt = '',
  wide = false,
  hoverable = false,
  footer,
  onClick,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: style,
    className: `fss-card ${wide ? 'fss-card--wide' : ''} ${hoverable ? 'fss-card--hover' : ''} ${className}`
  }, image ? /*#__PURE__*/React.createElement("div", {
    className: "fss-card__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "fss-card__body"
  }, kicker ? /*#__PURE__*/React.createElement("span", {
    className: "fss-card__kicker"
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("h3", {
    className: "fss-card__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "fss-card__text"
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-2)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
const css = `
.fss-tag{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--track-wide);text-transform:uppercase;padding:6px 16px;border:1px solid var(--line);color:var(--text-muted);border-radius:var(--radius-pill);cursor:default;transition:color var(--dur-fast) var(--ease-lux),border-color var(--dur-fast) var(--ease-lux);}
.fss-tag--interactive{cursor:pointer;}
.fss-tag--interactive:hover{color:var(--text-display);border-color:var(--text-display);}
.fss-tag--selected{background:var(--text-display);border-color:var(--text-display);color:var(--surface-page);}
.fss-tag__x{border:none;background:none;color:inherit;cursor:pointer;font-size:14px;line-height:1;padding:0;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-tag-css')) {
  const s = document.createElement('style');
  s.id = 'fss-tag-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Tag({
  selected = false,
  onClick,
  onRemove,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: style,
    className: `fss-tag ${onClick ? 'fss-tag--interactive' : ''} ${selected ? 'fss-tag--selected' : ''} ${className}`
  }, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fss-tag__x",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    }
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const css = `
.fss-dialog-overlay{position:fixed;inset:0;background:rgba(5,5,5,.75);display:flex;align-items:center;justify-content:center;z-index:100;animation:fss-fade var(--dur-base) var(--ease-lux);}
.fss-dialog{background:var(--surface-card);border:1px solid var(--line);box-shadow:var(--shadow-dialog);max-width:480px;width:calc(100% - 48px);padding:var(--space-7);position:relative;font-family:var(--font-sans);animation:fss-rise var(--dur-slow) var(--ease-lux);}
.fss-dialog__kicker{font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-caps);text-transform:uppercase;color:var(--text-muted);margin:0 0 var(--space-3);}
.fss-dialog__title{font-family:var(--font-display);font-weight:var(--weight-display);font-size:var(--text-2xl);line-height:var(--leading-tight);color:var(--text-display);margin:0 0 var(--space-4);}
.fss-dialog__body{font-size:var(--text-sm);line-height:var(--leading-body);color:var(--text-body);}
.fss-dialog__actions{display:flex;gap:var(--space-3);margin-top:var(--space-6);}
.fss-dialog__x{position:absolute;top:16px;right:16px;background:none;border:none;color:var(--text-muted);font-size:20px;line-height:1;cursor:pointer;padding:8px;}
.fss-dialog__x:hover{color:var(--text-display);}
@keyframes fss-fade{from{opacity:0}to{opacity:1}}
@keyframes fss-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-dialog-css')) {
  const s = document.createElement('style');
  s.id = 'fss-dialog-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Dialog({
  open,
  onClose,
  kicker,
  title,
  children,
  actions,
  style,
  className = ''
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fss-dialog-overlay",
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    className: `fss-dialog ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fss-dialog__x",
    "aria-label": "Close",
    onClick: onClose
  }, "\xD7"), kicker ? /*#__PURE__*/React.createElement("p", {
    className: "fss-dialog__kicker"
  }, kicker) : null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "fss-dialog__title"
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    className: "fss-dialog__body"
  }, children), actions ? /*#__PURE__*/React.createElement("div", {
    className: "fss-dialog__actions"
  }, actions) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const css = `
.fss-toast{display:inline-flex;align-items:center;gap:16px;background:var(--surface-card);border:1px solid var(--line);padding:14px 20px;font-family:var(--font-sans);font-size:var(--text-xs);letter-spacing:var(--track-wide);text-transform:uppercase;color:var(--text-body);animation:fss-toast-in var(--dur-slow) var(--ease-lux);}
.fss-toast--fixed{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:110;}
.fss-toast__bar{width:3px;align-self:stretch;background:var(--text-display);flex:none;margin:-14px 0 -14px -20px;}
.fss-toast--accent .fss-toast__bar{background:var(--accent);}
.fss-toast__x{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;padding:0;line-height:1;}
.fss-toast__x:hover{color:var(--text-display);}
@keyframes fss-toast-in{from{opacity:0;transform:translate(var(--fss-toast-x,0),8px)}to{opacity:1;transform:translate(var(--fss-toast-x,0),0)}}
.fss-toast--fixed{--fss-toast-x:-50%;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-toast-css')) {
  const s = document.createElement('style');
  s.id = 'fss-toast-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Toast({
  accent = false,
  fixed = false,
  onDismiss,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: style,
    className: `fss-toast ${accent ? 'fss-toast--accent' : ''} ${fixed ? 'fss-toast--fixed' : ''} ${className}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "fss-toast__bar",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, children), onDismiss ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fss-toast__x",
    "aria-label": "Dismiss",
    onClick: onDismiss
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const css = `
.fss-tip-wrap{position:relative;display:inline-flex;}
.fss-tip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%,4px);background:var(--text-display);color:var(--surface-page);font-family:var(--font-sans);font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-wide);text-transform:uppercase;padding:6px 12px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity var(--dur-base) var(--ease-lux),transform var(--dur-base) var(--ease-lux);z-index:50;}
.fss-tip-wrap:hover .fss-tip,.fss-tip-wrap:focus-within .fss-tip{opacity:1;transform:translate(-50%,0);}
.fss-tip--below{bottom:auto;top:calc(100% + 8px);}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-tip-css')) {
  const s = document.createElement('style');
  s.id = 'fss-tip-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Tooltip({
  label,
  below = false,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `fss-tip-wrap ${className}`,
    style: style
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: `fss-tip ${below ? 'fss-tip--below' : ''}`
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
const css = `
.fss-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:var(--font-sans);font-weight:var(--weight-caps);letter-spacing:var(--track-caps);text-transform:uppercase;border-radius:var(--radius-0);cursor:pointer;transition:background var(--dur-fast) var(--ease-lux),color var(--dur-fast) var(--ease-lux),border-color var(--dur-fast) var(--ease-lux),opacity var(--dur-fast) var(--ease-lux);border:1px solid transparent;text-indent:var(--track-caps);}
.fss-btn:focus-visible{outline:none;box-shadow:var(--focus-ring);}
.fss-btn[disabled]{opacity:.35;pointer-events:none;}
.fss-btn--sm{font-size:var(--text-2xs);padding:10px 20px;}
.fss-btn--md{font-size:var(--text-xs);padding:14px 32px;}
.fss-btn--lg{font-size:var(--text-xs);padding:19px 44px;}
.fss-btn--primary{background:var(--text-display);color:var(--surface-page);border-color:var(--text-display);}
.fss-btn--primary:hover{background:transparent;color:var(--text-display);}
.fss-btn--primary:active{opacity:.8;}
.fss-btn--secondary{background:transparent;color:var(--text-display);border-color:var(--line);}
.fss-btn--secondary:hover{border-color:var(--text-display);}
.fss-btn--ghost{background:transparent;color:var(--text-muted);padding-left:0;padding-right:0;}
.fss-btn--ghost:hover{color:var(--accent);}
.fss-btn--accent{background:var(--accent);color:var(--ink-0);border-color:var(--accent);}
.fss-btn--accent:hover{background:var(--accent-strong);border-color:var(--accent-strong);}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-btn-css')) {
  const s = document.createElement('style');
  s.id = 'fss-btn-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  arrow = false,
  type = 'button',
  onClick,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: style,
    className: `fss-btn fss-btn--${variant} fss-btn--${size} ${className}`
  }, children, arrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      textIndent: 0
    }
  }, "\u2192") : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const css = `
.fss-check{display:inline-flex;align-items:center;gap:14px;cursor:pointer;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-body);}
.fss-check input{position:absolute;opacity:0;width:0;height:0;}
.fss-check__box{width:16px;height:16px;border:1px solid var(--line);background:transparent;position:relative;flex:none;transition:border-color var(--dur-fast) var(--ease-lux),background var(--dur-fast) var(--ease-lux);}
.fss-check:hover .fss-check__box{border-color:var(--text-display);}
.fss-check input:checked+.fss-check__box{background:var(--text-display);border-color:var(--text-display);}
.fss-check input:checked+.fss-check__box::after{content:'';position:absolute;left:5px;top:2px;width:4px;height:8px;border-right:1.5px solid var(--surface-page);border-bottom:1.5px solid var(--surface-page);transform:rotate(45deg);}
.fss-check input:focus-visible+.fss-check__box{box-shadow:var(--focus-ring);}
.fss-check--disabled{opacity:.35;pointer-events:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-check-css')) {
  const s = document.createElement('style');
  s.id = 'fss-check-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  name,
  disabled = false,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `fss-check ${disabled ? 'fss-check--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    name: name,
    disabled: disabled
  }), /*#__PURE__*/React.createElement("span", {
    className: "fss-check__box",
    "aria-hidden": "true"
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
const css = `
.fss-iconbtn{display:inline-flex;align-items:center;justify-content:center;background:transparent;color:var(--text-display);border:1px solid var(--line);border-radius:var(--radius-0);cursor:pointer;transition:border-color var(--dur-fast) var(--ease-lux),color var(--dur-fast) var(--ease-lux),background var(--dur-fast) var(--ease-lux);}
.fss-iconbtn:hover{border-color:var(--text-display);}
.fss-iconbtn:active{background:var(--surface-raised);}
.fss-iconbtn:focus-visible{outline:none;box-shadow:var(--focus-ring);}
.fss-iconbtn[disabled]{opacity:.35;pointer-events:none;}
.fss-iconbtn--sm{width:32px;height:32px;}
.fss-iconbtn--md{width:44px;height:44px;}
.fss-iconbtn--lg{width:56px;height:56px;}
.fss-iconbtn--bare{border-color:transparent;}
.fss-iconbtn--bare:hover{border-color:transparent;color:var(--accent);}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-iconbtn-css')) {
  const s = document.createElement('style');
  s.id = 'fss-iconbtn-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function IconButton({
  size = 'md',
  bare = false,
  label,
  disabled = false,
  onClick,
  children,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    style: style,
    className: `fss-iconbtn fss-iconbtn--${size} ${bare ? 'fss-iconbtn--bare' : ''} ${className}`
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const css = `
.fss-field{display:flex;flex-direction:column;gap:10px;font-family:var(--font-sans);}
.fss-field__label{font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-caps);text-transform:uppercase;color:var(--text-muted);}
.fss-input{background:transparent;border:none;border-bottom:1px solid var(--line);border-radius:0;color:var(--text-display);font-family:var(--font-sans);font-size:var(--text-base);padding:10px 0;transition:border-color var(--dur-base) var(--ease-lux);width:100%;}
.fss-input::placeholder{color:var(--text-muted);opacity:.7;}
.fss-input:focus{outline:none;border-bottom-color:var(--text-display);}
.fss-field--error .fss-input{border-bottom-color:var(--accent);}
.fss-field__msg{font-size:var(--text-xs);color:var(--accent);letter-spacing:var(--track-wide);text-transform:uppercase;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-input-css')) {
  const s = document.createElement('style');
  s.id = 'fss-input-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Input({
  label,
  error,
  type = 'text',
  value,
  defaultValue,
  onChange,
  placeholder,
  name,
  disabled = false,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `fss-field ${error ? 'fss-field--error' : ''} ${className}`,
    style: style
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "fss-field__label"
  }, label) : null, /*#__PURE__*/React.createElement("input", {
    className: "fss-input",
    type: type,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    name: name,
    disabled: disabled
  }), error ? /*#__PURE__*/React.createElement("span", {
    className: "fss-field__msg"
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
const css = `
.fss-radio{display:inline-flex;align-items:center;gap:14px;cursor:pointer;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-body);}
.fss-radio input{position:absolute;opacity:0;width:0;height:0;}
.fss-radio__dot{width:16px;height:16px;border:1px solid var(--line);border-radius:50%;position:relative;flex:none;transition:border-color var(--dur-fast) var(--ease-lux);}
.fss-radio:hover .fss-radio__dot{border-color:var(--text-display);}
.fss-radio input:checked+.fss-radio__dot{border-color:var(--text-display);}
.fss-radio input:checked+.fss-radio__dot::after{content:'';position:absolute;inset:4px;border-radius:50%;background:var(--text-display);}
.fss-radio input:focus-visible+.fss-radio__dot{box-shadow:var(--focus-ring);}
.fss-radio--disabled{opacity:.35;pointer-events:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-radio-css')) {
  const s = document.createElement('style');
  s.id = 'fss-radio-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Radio({
  label,
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  disabled = false,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `fss-radio ${disabled ? 'fss-radio--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    name: name,
    value: value,
    disabled: disabled
  }), /*#__PURE__*/React.createElement("span", {
    className: "fss-radio__dot",
    "aria-hidden": "true"
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const css = `
.fss-select-wrap{position:relative;display:flex;flex-direction:column;gap:10px;font-family:var(--font-sans);}
.fss-select{appearance:none;-webkit-appearance:none;background:transparent;border:none;border-bottom:1px solid var(--line);border-radius:0;color:var(--text-display);font-family:var(--font-sans);font-size:var(--text-base);padding:10px 24px 10px 0;transition:border-color var(--dur-base) var(--ease-lux);width:100%;cursor:pointer;}
.fss-select:focus{outline:none;border-bottom-color:var(--text-display);}
.fss-select option{background:var(--surface-card);color:var(--text-display);}
.fss-select-wrap__chev{position:absolute;right:2px;bottom:16px;width:8px;height:8px;border-right:1px solid var(--text-muted);border-bottom:1px solid var(--text-muted);transform:rotate(45deg);pointer-events:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-select-css')) {
  const s = document.createElement('style');
  s.id = 'fss-select-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  placeholder,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `fss-select-wrap ${className}`,
    style: style
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "fss-field__label",
    style: {
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--weight-caps)',
      letterSpacing: 'var(--track-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("select", {
    className: "fss-select",
    value: value,
    defaultValue: defaultValue ?? (placeholder ? '' : undefined),
    onChange: onChange,
    name: name,
    disabled: disabled
  }, placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const v = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v.value,
      value: v.value
    }, v.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "fss-select-wrap__chev",
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
const css = `
.fss-switch{display:inline-flex;align-items:center;gap:14px;cursor:pointer;font-family:var(--font-sans);font-size:var(--text-sm);color:var(--text-body);}
.fss-switch input{position:absolute;opacity:0;width:0;height:0;}
.fss-switch__track{width:40px;height:20px;border:1px solid var(--line);position:relative;flex:none;transition:border-color var(--dur-fast) var(--ease-lux),background var(--dur-base) var(--ease-lux);}
.fss-switch__track::after{content:'';position:absolute;top:3px;left:3px;width:12px;height:12px;background:var(--text-muted);transition:transform var(--dur-base) var(--ease-lux),background var(--dur-fast) var(--ease-lux);}
.fss-switch:hover .fss-switch__track{border-color:var(--text-display);}
.fss-switch input:checked+.fss-switch__track{background:var(--text-display);border-color:var(--text-display);}
.fss-switch input:checked+.fss-switch__track::after{transform:translateX(20px);background:var(--surface-page);}
.fss-switch input:focus-visible+.fss-switch__track{box-shadow:var(--focus-ring);}
.fss-switch--disabled{opacity:.35;pointer-events:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-switch-css')) {
  const s = document.createElement('style');
  s.id = 'fss-switch-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  name,
  disabled = false,
  style,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `fss-switch ${disabled ? 'fss-switch--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    name: name,
    disabled: disabled
  }), /*#__PURE__*/React.createElement("span", {
    className: "fss-switch__track",
    "aria-hidden": "true"
  }), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const css = `
.fss-tabs{display:flex;gap:var(--space-6);border-bottom:1px solid var(--line);font-family:var(--font-sans);}
.fss-tab{background:none;border:none;border-bottom:1px solid transparent;margin-bottom:-1px;padding:14px 0;font-family:var(--font-sans);font-size:var(--text-2xs);font-weight:var(--weight-caps);letter-spacing:var(--track-caps);text-transform:uppercase;color:var(--text-muted);cursor:pointer;transition:color var(--dur-fast) var(--ease-lux),border-color var(--dur-base) var(--ease-lux);}
.fss-tab:hover{color:var(--text-display);}
.fss-tab--active{color:var(--text-display);border-bottom-color:var(--text-display);}
.fss-tab:focus-visible{outline:none;box-shadow:var(--focus-ring);}
`;
if (typeof document !== 'undefined' && !document.getElementById('fss-tabs-css')) {
  const s = document.createElement('style');
  s.id = 'fss-tabs-css';
  s.textContent = css;
  document.head.appendChild(s);
}
function Tabs({
  tabs = [],
  active,
  defaultActive,
  onChange,
  style,
  className = ''
}) {
  const [internal, setInternal] = React.useState(defaultActive ?? tabs[0]);
  const current = active ?? internal;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: `fss-tabs ${className}`,
    style: style
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    role: "tab",
    "aria-selected": current === t,
    className: `fss-tab ${current === t ? 'fss-tab--active' : ''}`,
    onClick: () => {
      setInternal(t);
      onChange && onChange(t);
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
