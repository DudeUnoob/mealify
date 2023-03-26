

import axios from "axios"
import { useEffect, useState } from "react"
import { productionAPIURL } from "../../config/config.json"

    const key = "BERUJMe1npcebsZ41if7t38zwRlFOvVI-aMjTmaqALo6oTeyTxibVGosy1W40hhi9WOJZ3TYfTuS4-gmElYCPuI"
    export const subscribeUser = async () => {
        const serviceWorker = await navigator.serviceWorker.ready;
        const subscription = await serviceWorker.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key),
        });
        await fetch(`${productionAPIURL}/subscribe`, {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json',
          },
        });
      };



      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, "+")
          .replace(/_/g, "/");
      
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
      
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }

     
