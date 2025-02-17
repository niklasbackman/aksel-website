import kebabCase from "lodash/kebabCase";

import * as ErrorSummary from "./error-summary";
import * as ConfirmationPanel from "./confirmation-panel";
import * as Select from "./select";
import * as Textarea from "./textarea";
import * as TextField from "./textfield";
import * as GuidePanel from "./guide-panel";
import * as HelpText from "./help-text";
import * as Link from "./link";
import * as LinkPanel from "./link-panel";
import * as Loader from "./loader";
import * as Modal from "./modal";
import * as Popover from "./popover";
import * as SpeechBubble from "./speech-bubble";
import * as Table from "./table";
import * as Typography from "./typography";
import * as StepIndicator from "./step-indicator";

const allExamples = {
  ...ErrorSummary,
  ...ConfirmationPanel,
  ...Select,
  ...Textarea,
  ...TextField,
  ...GuidePanel,
  ...HelpText,
  ...Link,
  ...LinkPanel,
  ...Loader,
  ...Modal,
  ...Popover,
  ...StepIndicator,
  ...SpeechBubble,
  ...Table,
  ...Typography,
};

// TODO: implement such that one can infer the code in preview with dynamic imports
// TODO: is dynamic imports needed?
export const Examples = Object.keys(allExamples).reduce((prev, y) => {
  return { ...prev, [kebabCase(y)]: allExamples[y] };
}, {});

export const ExampleKeys = Object.keys(Examples);
