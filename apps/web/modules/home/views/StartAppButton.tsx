import { ReactElement } from 'react';
import { Button, Modal, useModal } from '@geist-ui/core';
import { VscDebugStart } from 'react-icons/vsc';
import { useSnipManState } from '../../snip-man-state/context/SnipManContext';
import { useRouter } from 'next/router';
import { Path } from '../../routes/types/route.type';

function StartAppButton(): ReactElement {
  const { setVisible, bindings } = useModal();
  const router = useRouter();
  const {
    state: { user },
  } = useSnipManState();
  async function handleProceed() {
    if (user === null) {
      setVisible(true);
    } else {
      await router.push(Path.App);
    }
  }
  return (
    <>
      <Button
        onClick={handleProceed}
        type="success"
        width={1}
        height={1.5}
        iconRight={<VscDebugStart />}
      >
        <span className="text-lg">Proceed</span>
      </Button>
      <Modal {...bindings}>
        <Modal.Title>You are almost there</Modal.Title>
        <Modal.Subtitle>A few things are still needed</Modal.Subtitle>
        <Modal.Content>
          <p>
            In order to start the app, you need to populate the database and
            select a user to impersonate.
          </p>
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Ok
        </Modal.Action>
      </Modal>
    </>
  );
}

export default StartAppButton;
