/**
 * ==========================================
 * ZORY GLOBAL
 * Environment Detector
 * ==========================================
 */

export function detectEnvironment() {

  const ua = navigator.userAgent;

  return {

    isAndroid: /Android/i.test(ua),

    isIOS: /iPhone|iPad|iPod/i.test(ua),

    isMobile:
      /Android|iPhone|iPad|iPod/i.test(ua),

    isDesktop:
      !/Android|iPhone|iPad|iPod/i.test(ua)

  };

}