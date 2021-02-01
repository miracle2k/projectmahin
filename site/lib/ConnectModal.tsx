import {useMemo, useState} from "react";
import {getConnectors} from "./connectors";
import {Modal} from "./web3wallet/ui/emotion-model";
import {Grid, themesList} from "./web3wallet/ui/grid";
import {useWeb3React} from "./web3wallet/core";

export function ConnectModal(props: {
  onRequestClose: (success?: boolean) => void,
  isVisible: boolean
}) {
  const { activate } = useWeb3React();

  const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_NETWORK);
  const connectors = useMemo(() => {
    return getConnectors(CHAIN_ID);
  },[])

  const handleProviderClick = async (providerId) => {
    try {
      await activate(connectors[providerId]);
    } catch (e) {
      console.log(e);
      alert("Failed to connect to this provider.")
      return;
    }
    props.onRequestClose(true);
  }

  return <Modal show={props.isVisible} lightboxOpacity={0.4} onRequestClose={props.onRequestClose}>
    <Grid
        themeColors={themesList.dark.colors}
        providers={Object.keys(connectors)}
        onClick={handleProviderClick}
    />
  </Modal>
}


/**
 * Returns an async show() function and props for the modal. The show function will return with true/false
 * depending on the outcome of the modal, when it closes.
 */
export function getImperativeModal() {
  const [promise, setPromise] = useState<{resolve: (v: boolean) => void, reject: () => void}|null>(null);

  const resolve = (v: boolean) => {
    if (promise?.resolve) {
      promise.resolve(v);
      setPromise(null);
    }
  }

  const show = async () => {
    // Resolve any existing promise from a previous `show` call.
    resolve(false);

    setIsVisible(true);
    return await new Promise((resolve, reject) => {
      setPromise({resolve, reject});
    });
  }

  const [isVisible, setIsVisible] = useState(false);

  const props = {
    isVisible,
    onRequestClose: (success?: boolean) => {
      setIsVisible(false);
      resolve(success);
    }
  }

  return [show, props];
}