//const publicVapidKey = "BC0yKrpzC_cAu9THj0R3K-MWhMouMdsTCmXzZUiA6uf2rKtBtt_vIXjPF5w66NC2Idh"

const key = "BERUJMe1npcebsZ41if7t38zwRlFOvVI-aMjTmaqALo6oTeyTxibVGosy1W40hhi9WOJZ3TYfTuS4-gmElYCPuI"

export default function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/src/service-worker.js')
          .then(registration => {
            console.log('Service worker registered:', registration);
          })
          .catch(error => {
            console.error('Error registering service worker:', error);
          });
      }
}


