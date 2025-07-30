// ==MiruExtension==
// @name Nyaa
// @version 1.0.0
// @author You
// @lang en
// @license MIT
// @url https://nyaa.si
// ==/MiruExtension==

export default class Nyaa extends Extension {
  async search(query) {
    const url = `https://nyaa.si/?f=0&c=0_0&q=${encodeURIComponent(query)}`;
    const html = await this.request(url);
    const dom = this.parseHTML(html);

    return dom.querySelectorAll('tr').map(row => {
      const titleElem = row.querySelector('.torrent-name a');
      const linkElem = row.querySelector('a[href^="magnet:"]');
      if (!titleElem || !linkElem) return null;

      return {
        title: titleElem.textContent.trim(),
        url: linkElem.getAttribute('href'),
        thumbnail: 'https://nyaa.si/static/favicon.png'
      };
    }).filter(Boolean);
  }
}
