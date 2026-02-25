import { test, expect, type Page } from '@playwright/test';

test.use({ baseURL: 'https://ocedc-web.vercel.app' });

test.describe('Home Page Visual & Functional Audit', () => {
  // -------------------------------------------------------------------------
  // 1. Full page screenshot capture
  // -------------------------------------------------------------------------
  test('Full page screenshot capture', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: 'test-results/home-page-full.png',
      fullPage: true,
    });
  });

  // -------------------------------------------------------------------------
  // 2. No 404 errors for site assets
  // -------------------------------------------------------------------------
  test('No 404 errors for site assets', async ({ page }) => {
    const notFoundRequests: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      // Only check same-origin resources (ignore third-party)
      if (url.startsWith('https://ocedc-web.vercel.app') && response.status() === 404) {
        notFoundRequests.push(url);
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Allow a brief extra moment for lazy-loaded assets
    await page.waitForTimeout(2000);

    expect(
      notFoundRequests,
      `The following same-origin URLs returned 404:\n${notFoundRequests.join('\n')}`,
    ).toHaveLength(0);
  });

  // -------------------------------------------------------------------------
  // 3. No critical console errors
  // -------------------------------------------------------------------------
  test('No critical console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out known third-party / benign noise
        const isThirdParty =
          text.includes('google') ||
          text.includes('gstatic') ||
          text.includes('facebook') ||
          text.includes('analytics') ||
          text.includes('gtag') ||
          text.includes('clarity');
        if (!isThirdParty) {
          consoleErrors.push(text);
        }
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Allow at most a handful of non-critical errors (e.g. hydration warnings)
    // but flag if there are many
    expect(
      consoleErrors.length,
      `Console errors found:\n${consoleErrors.join('\n')}`,
    ).toBeLessThanOrEqual(3);
  });

  // -------------------------------------------------------------------------
  // 4. Header renders with logo and navigation
  // -------------------------------------------------------------------------
  test('Header renders with logo and navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Header element exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo image inside header
    const logo = header.locator('img[alt*="OCEDC"]');
    await expect(logo).toBeVisible();

    // Main nav element
    const nav = header.locator('nav');
    await expect(nav).toBeVisible();

    // At least 5 navigation links/buttons visible on desktop (6 nav items + Contact)
    const navItems = nav.locator('ul > li');
    await expect(navItems).toHaveCount(await navItems.count()); // sanity
    expect(await navItems.count()).toBeGreaterThanOrEqual(5);

    // Contact button
    const contactBtn = nav.locator('a[href="/contact"]');
    await expect(contactBtn.first()).toBeVisible();

    // Utility bar links
    const utilityBar = header.locator('div').first();
    await expect(utilityBar).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 5. Hero section renders headline and CTAs
  // -------------------------------------------------------------------------
  test('Hero section renders headline and CTAs', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // H1 headline should be present
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    // It should have some text content (not empty)
    await expect(h1).not.toBeEmpty();

    // CTA buttons in the hero area (rendered via Button + Link)
    const heroCtas = page.locator('h1').locator('..').locator('..').locator('a[href]');
    // There should be at least 2 CTAs (Explore Sites & Buildings, Contact Us)
    expect(await heroCtas.count()).toBeGreaterThanOrEqual(2);
  });

  // -------------------------------------------------------------------------
  // 6. Stats section renders all statistics
  // -------------------------------------------------------------------------
  test('Stats section renders all statistics', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Stats are rendered as <dd> elements with large numbers
    const statValues = page.locator('dd');
    expect(await statValues.count()).toBeGreaterThanOrEqual(3);

    // Stat labels are <dt> elements
    const statLabels = page.locator('dt');
    expect(await statLabels.count()).toBeGreaterThanOrEqual(3);

    // Verify at least one stat value is visible
    await expect(statValues.first()).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 7. Features section renders cards with icons
  // -------------------------------------------------------------------------
  test('Features section renders cards with icons', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Feature cards are Card components with h3 headings inside
    // They live inside a grid with md:grid-cols-3
    const featureCards = page.locator('[class*="card"], [class*="Card"]').filter({
      has: page.locator('h3'),
    });
    expect(await featureCards.count()).toBeGreaterThanOrEqual(3);

    // Each card should have a heading
    for (let i = 0; i < 3; i++) {
      const card = featureCards.nth(i);
      await expect(card.locator('h3')).toBeVisible();
    }
  });

  // -------------------------------------------------------------------------
  // 8. Industries grid renders all industry cards
  // -------------------------------------------------------------------------
  test('Industries grid renders all industry cards', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Industry cards are dark cards with h3 titles for each industry
    // They are within a grid with lg:grid-cols-4
    // Each card has class containing "rounded-xl" and "bg-[#1b1f24]"
    const industryCards = page.locator('.grid > div').filter({
      has: page.locator('h3'),
    });

    // Filter to only the ones that look like industry cards (dark bg, rounded)
    // We look for the section that has exactly 4 industry cards in a grid
    const industrySection = page.locator('.grid.sm\\:grid-cols-2.lg\\:grid-cols-4');
    await expect(industrySection).toBeVisible();

    const cards = industrySection.locator('> div');
    await expect(cards).toHaveCount(4);

    // Each card should have a heading
    for (let i = 0; i < 4; i++) {
      await expect(cards.nth(i).locator('h3')).toBeVisible();
    }
  });

  // -------------------------------------------------------------------------
  // 9. News feed section renders posts
  // -------------------------------------------------------------------------
  test('News feed section renders posts', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Wait for the news feed API call to complete (client-side fetch)
    await page.waitForResponse(
      (resp) => resp.url().includes('/api/posts') && resp.status() === 200,
      { timeout: 15000 },
    ).catch(() => {
      // API might already have responded before we start listening
    });

    // Give the component a moment to render fetched data
    await page.waitForTimeout(2000);

    // "View All News" link should be visible
    const viewAllLink = page.locator('a[href="/news"]');
    await expect(viewAllLink.first()).toBeVisible();

    // Post titles should be present (h3 elements inside the news section)
    // The news section has a "View All News" link as a sibling of the title
    const newsHeadings = page.locator('a[href="/news"]')
      .first()
      .locator('..')
      .locator('..')
      .locator('h3');
    // There should be at least 1 post rendered
    expect(await newsHeadings.count()).toBeGreaterThanOrEqual(1);

    // Note: images may show "No Image" placeholder - that is a known CMS data issue.
    // We just verify the section renders without crashing.
  });

  // -------------------------------------------------------------------------
  // 10. CTA banner renders with actions
  // -------------------------------------------------------------------------
  test('CTA banner renders with actions', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // The CTA banner has a rounded container with a gradient background
    // It contains an h2 and action buttons
    const ctaBanner = page.locator('[class*="rounded-[2.5rem]"]');
    await expect(ctaBanner).toBeVisible();

    // The CTA banner should have a heading
    const ctaHeading = ctaBanner.locator('h2');
    await expect(ctaHeading).toBeVisible();
    await expect(ctaHeading).not.toBeEmpty();

    // Action buttons inside the CTA
    const ctaButtons = ctaBanner.locator('a');
    expect(await ctaButtons.count()).toBeGreaterThanOrEqual(1);
  });

  // -------------------------------------------------------------------------
  // 11. Map embed is present
  // -------------------------------------------------------------------------
  test('Map embed is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // The page should have at least one iframe (LOIS widget and/or Google Maps)
    const iframes = page.locator('iframe');
    expect(await iframes.count()).toBeGreaterThanOrEqual(1);

    // At least one iframe should be visible (Google Maps or LocationOne)
    await expect(iframes.first()).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 12. Footer renders all sections
  // -------------------------------------------------------------------------
  test('Footer renders all sections', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer logo
    const footerLogo = footer.locator('img[alt*="OCEDC"]');
    await expect(footerLogo).toBeVisible();

    // Contact information — email link
    const emailLink = footer.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();

    // Contact information — phone link
    const phoneLink = footer.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();

    // Quick Links section heading
    const quickLinksHeading = footer.locator('h3', { hasText: /quick links/i });
    await expect(quickLinksHeading).toBeVisible();

    // Quick links list should have multiple items
    const quickLinks = footer.locator('ul > li > a');
    expect(await quickLinks.count()).toBeGreaterThanOrEqual(3);

    // Connect / Social section heading
    const connectHeading = footer.locator('h3', { hasText: /connect/i });
    await expect(connectHeading).toBeVisible();

    // Social icons (links that open in new tabs)
    const socialLinks = footer.locator('a[target="_blank"]');
    expect(await socialLinks.count()).toBeGreaterThanOrEqual(1);

    // Newsletter section
    const newsletterHeading = footer.locator('h3', { hasText: /stay updated|newsletter/i });
    await expect(newsletterHeading).toBeVisible();

    // Newsletter email input
    const emailInput = footer.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();

    // Newsletter submit button
    const subscribeButton = footer.locator('button[type="submit"]');
    await expect(subscribeButton).toBeVisible();

    // Copyright text
    const copyright = footer.locator('text=/\\u00a9|copyright|All rights reserved/i');
    await expect(copyright).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // 13. Mobile responsiveness
  // -------------------------------------------------------------------------
  test('Mobile responsiveness', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Hamburger menu button should be visible on mobile
    const menuButton = page.locator('button[aria-label="Open Menu"], button[aria-label="Close Menu"]');
    await expect(menuButton).toBeVisible();

    // Desktop nav should be hidden
    const desktopNav = page.locator('header nav .hidden.lg\\:flex');
    await expect(desktopNav).not.toBeVisible();

    // Verify no horizontal overflow — page width should not exceed viewport
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    expect(
      bodyScrollWidth,
      `Body scroll width (${bodyScrollWidth}px) exceeds viewport (${viewportWidth}px) — horizontal overflow detected`,
    ).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance

    // Key sections should still be visible on mobile
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
