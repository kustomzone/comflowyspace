import { SDNode, UnknownWidget, Widget } from "@comflowy/common/types"
import { useAppStore } from "@comflowy/common/store"
import { Dimensions, NodeProps } from "reactflow";
import {NodeComponent} from "./reactflow-node";
import { memo } from "react";
import { FlowNode } from "./reactflow-flow-node";

export type  FlowNodeProps = NodeProps<{
  widget: Widget;
  value: SDNode;
  dimensions: Dimensions
}>
export const NodeContainer = memo((props: FlowNodeProps): JSX.Element => {
  const progressBar = useAppStore(st => st.nodeInProgress?.id === props.id ? st.nodeInProgress.progress : undefined);
  const imagePreviews = useAppStore(st => st.graph[props.id]?.images || []);
  const isPositive = useAppStore(st => st.graph[props.id]?.isPositive);
  const isNegative = useAppStore(st => st.graph[props.id]?.isNegative);
  const widget = useAppStore(st => st.widgets[props.data.widget.name]) || {
    ...UnknownWidget,
    name: props.data.value.widget,
    display_name: props.data.value.widget
  };
  const nodeError = useAppStore(st => st.promptError?.node_errors[props.id]);

  if (props.data.value.widget === "Flow") {
    return <FlowNode />
  }
  
  return (
    <NodeComponent
      node={props}
      isPositive={isPositive}
      isNegative={isNegative}
      widget={widget}
      nodeError={nodeError}
      progressBar={progressBar}
      imagePreviews={imagePreviews}
    />
  )
});