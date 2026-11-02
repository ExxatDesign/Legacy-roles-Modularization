import { useCallback, useState } from "react";
import {
  MODULARIZATION_PAGE_BANNER_BODY_AFTER,
  MODULARIZATION_PAGE_BANNER_BODY_BEFORE,
  MODULARIZATION_PAGE_BANNER_BODY_REASSURANCE,
  MODULARIZATION_PAGE_BANNER_EYEBROW,
  MODULARIZATION_PAGE_BANNER_TITLE,
} from "../lib/legacy-role-modularization";
import { ModularizationBannerIllustration } from "./ModularizationBannerIllustration";

const DISMISS_STORAGE_KEY = "um-modularization-banner-dismissed";

function IconInfo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 10.5V16M12 8v.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
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

function readDismissedFromStorage(): boolean {
  try {
    return localStorage.getItem(DISMISS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function ModularizationBanner() {
  const [dismissed, setDismissed] = useState(() => readDismissedFromStorage());

  const onDismiss = useCallback(() => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
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
            <IconInfo />
          </div>
          <div className="um-modularization-banner__content">
            <p className="um-modularization-banner__eyebrow">{MODULARIZATION_PAGE_BANNER_EYEBROW}</p>
            <h2 id="um-modularization-banner-title" className="um-modularization-banner__title">
              {MODULARIZATION_PAGE_BANNER_TITLE}
            </h2>
            <p id="um-modularization-banner-body" className="um-modularization-banner__body">
              {MODULARIZATION_PAGE_BANNER_BODY_BEFORE}{" "}
              <span className="um-role-new-tag um-modularization-banner__inline-tag">New</span>{" "}
              {MODULARIZATION_PAGE_BANNER_BODY_AFTER}{" "}
              <span className="um-modularization-banner__body-strong">
                {MODULARIZATION_PAGE_BANNER_BODY_REASSURANCE}
              </span>
            </p>
          </div>
        </div>
        <ModularizationBannerIllustration />
      </div>
    </div>
  );
}
