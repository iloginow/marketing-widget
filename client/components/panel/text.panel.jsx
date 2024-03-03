import { Panel } from 'rsuite';

export default function TextPanel({ header, children }) {
  return (
    <Panel header={header}>
      { children }
    </Panel>
  );
}
