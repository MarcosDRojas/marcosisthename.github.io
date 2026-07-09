const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('requestfailed', (req) => errors.push('FAILED: ' + req.url()));

  await page.goto('http://localhost:5183/marcosisthename.github.io/photography', { waitUntil: 'networkidle' });

  // click the dubrovnik marker specifically
  const markers = await page.$$('g.marker');
  let found = false;
  for (const m of markers) {
    const label = await m.getAttribute('aria-label');
    if (label && label.includes('Dubrovnik')) {
      await m.click({ force: true });
      found = true;
      break;
    }
  }
  console.log('found dubrovnik marker:', found);
  await page.waitForTimeout(300);

  const img = await page.$('.photo img');
  const naturalWidth = img ? await img.evaluate((el) => el.naturalWidth) : null;
  console.log('thumbnail naturalWidth:', naturalWidth);

  await page.screenshot({ path: 'C:/Users/marco/AppData/Local/Temp/claude/c--Users-marco-dev-marcosisthename-github-io/1fdeaf5a-ebd6-488a-91ee-dec98a34e283/scratchpad/dubrovnik-filtered.png' });

  await page.click('.photo');
  await page.waitForTimeout(300);
  const lightboxImg = await page.$('.lightbox-img');
  const lbWidth = lightboxImg ? await lightboxImg.evaluate((el) => el.naturalWidth) : null;
  console.log('lightbox naturalWidth:', lbWidth);
  await page.screenshot({ path: 'C:/Users/marco/AppData/Local/Temp/claude/c--Users-marco-dev-marcosisthename-github-io/1fdeaf5a-ebd6-488a-91ee-dec98a34e283/scratchpad/dubrovnik-lightbox.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
