import waitForElement from '@/utils/wait-for-element'

export default defineContentScript({
  matches: ['*://*.crunchyroll.com/*'],
  main() {
    async function setup () {
      const [, lang = 'en-us', code] = matchWatchUrl(location.href) ?? []

      if (!code) {
        return
      }

      const identifier = `${code}:${lang}`

      const container = await waitForElement('.erc-current-media-info')
      const title = container.querySelector('h1.title')?.textContent ?? ''

      let iframe = container.querySelector('#crunchycomments') as HTMLIFrameElement | undefined
      const iframeSrc = `https://crunchycomments.onrender.com/?title=${encodeURIComponent(title)}&identifier=${identifier}`

      if (iframe) {
        container.removeChild(iframe)
      } 

      iframe = document.createElement('iframe')
      iframe.id = 'crunchycomments'
      iframe.src = iframeSrc
      iframe.style.width = '100%'
      iframe.style.border = 'none'
      iframe.style.height = '0'
      
      window.addEventListener('message', (event) => {
        const { type, height } = event.data;
        if (type === 'iframe-resize') {
          iframe!.style.height = `${height + 30}px`;
        }
      });

      container.appendChild(iframe)
    }

    browser.runtime.onMessage.addListener(({ action }) => {
      if (action === 'onTabUpdated') {
        setup()
      }
    })

    setup()
  }
});