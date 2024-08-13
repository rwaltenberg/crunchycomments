import waitForElement from '@/utils/wait-for-element'
import { localStorage } from '@/utils/typed-storage'

const IFRAME_ID = 'crunchycomments'

export default defineContentScript({
  matches: ['*://*.crunchyroll.com/*'],
  main() {
    async function setup () {
      const [, lang = 'en-us', code] = matchWatchUrl(location.href) ?? []
      const { isEnabled } = await localStorage.get({ isEnabled: true })

      if (!code || !isEnabled) {
        return
      }

      const identifier = `${code}:${lang}`

      const container = await waitForElement('.erc-current-media-info')
      const title = container.querySelector('h1.title')?.textContent ?? ''

      let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null
      const iframeSrc = `https://crunchycomments.onrender.com/?title=${encodeURIComponent(title)}&identifier=${identifier}`

      if (iframe) {
        if (iframe.src === iframeSrc) {
          return
        }

        container.removeChild(iframe)
      }

      iframe = document.createElement('iframe')
      iframe.id = IFRAME_ID
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
      if (action === 'ccomm::onEnabled') {
        console.log('ccomm::onEnabled')
        setup()
      } else if (action === 'ccomm::onDisabled') {
        console.log('ccomm::onDisabled')
        const iframe = document.getElementById(IFRAME_ID)
        iframe?.parentElement?.removeChild(iframe)
      }
    })

    setup()
  }
});