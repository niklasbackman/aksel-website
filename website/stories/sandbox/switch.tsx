import { Switch } from "@navikt/ds-react";
import { SandboxComponentv2 } from "./types";

Switch.displayName = "Switch";
const SwitchSandbox: SandboxComponentv2 = (props: any) => {
  const newProps = {
    size: props?.size,
    position: props?.position,
    ...(props?.disabled ? { disabled: true } : {}),
    ...(props?.loading ? { loading: true } : {}),
    ...(props?.description
      ? {
          description: "Beskrivelse",
        }
      : {}),
    ...(props?.hideLabel ? { hideLabel: true } : {}),
  };

  return <Switch {...newProps}>Slå på notifikasjoner</Switch>;
};

SwitchSandbox.args = {
  props: {
    size: ["medium", "small"],
    position: ["left", "right"],
    hideLabel: false,
    description: false,
    loading: false,
    disabled: false,
  },
};

export default SwitchSandbox;
