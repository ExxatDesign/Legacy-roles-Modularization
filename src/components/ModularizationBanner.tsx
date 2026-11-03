import { useCallback, useState } from "react";
import {
  MODULARIZATION_PAGE_BANNER_BODY_AFTER,
  MODULARIZATION_PAGE_BANNER_BODY_BEFORE,
  MODULARIZATION_PAGE_BANNER_BODY_REASSURANCE,
  MODULARIZATION_PAGE_BANNER_EYEBROW,
  MODULARIZATION_PAGE_BANNER_TITLE,
} from "../lib/legacy-role-modularization";
import { ModularizationBannerIllustration } from "./ModularizationBannerIllustration";

function IconBullhorn() {
  return (
    <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor" aria-hidden>
      <path d="M525.2 82.9C536.7 88 544 99.4 544 112L544 528C544 540.6 536.7 552 525.2 557.1C513.7 562.2 500.4 560.3 490.9 552L444.3 511.3C400.7 473.2 345.6 451 287.9 448.3L287.9 544C287.9 561.7 273.6 576 255.9 576L223.9 576C206.2 576 191.9 561.7 191.9 544L191.9 448C121.3 448 64 390.7 64 320C64 249.3 121.3 192 192 192L276.5 192C338.3 191.8 397.9 169.3 444.4 128.7L491 88C500.4 79.7 513.9 77.8 525.3 82.9zM288 384L288 384.2C358.3 386.9 425.8 412.7 480 457.6L480 182.3C425.8 227.2 358.3 253 288 255.7L288 384z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function ModularizationBanner() {
  const [dismissed, setDismissed] = useState(false);

  const onDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <div
      className="um-modularization-banner"
      role="region"
      aria-labelledby="um-modularization-banner-title"
      aria-describedby="um-modularization-banner-body"
    >
      <div className="um-modularization-banner__card">
        <button
          type="button"
          className="um-modularization-banner__close"
          aria-label="Dismiss announcement"
          onClick={onDismiss}
        >
          <IconClose />
        </button>
        <div className="um-modularization-banner__lead">
          <div className="um-modularization-banner__icon-wrap" aria-hidden>
            <IconBullhorn />
          </div>
          <div className="um-modularization-banner__content">
            <div className="um-modularization-banner__headline">
              <p className="um-modularization-banner__eyebrow">{MODULARIZATION_PAGE_BANNER_EYEBROW}</p>
              <h2 id="um-modularization-banner-title" className="um-modularization-banner__title">
                {MODULARIZATION_PAGE_BANNER_TITLE}
              </h2>
            </div>
            <p id="um-modularization-banner-body" className="um-modularization-banner__body">
              {MODULARIZATION_PAGE_BANNER_BODY_BEFORE}{" "}
              <span className="um-role-new-tag um-modularization-banner__inline-tag">New</span>{" "}
              {MODULARIZATION_PAGE_BANNER_BODY_AFTER}{" "}
              <span className="um-modularization-banner__reassurance">{MODULARIZATION_PAGE_BANNER_BODY_REASSURANCE}</span>
            </p>
          </div>
        </div>
        <ModularizationBannerIllustration />
      </div>
    </div>
  );
}
